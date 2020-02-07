"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nano_errors_1 = require("nano-errors");
/**
 * The main Finite State Machine manager, that holds all available actions and performs the state transitions.
 */
class FSM {
    constructor(instance, options = {}) {
        this.instance = instance;
        this.options = options;
        this.name = options.name || this.name || this.constructor.name;
        this.logger = options.logger || nano_errors_1.Logger.getInstance();
    }
    /**
     * Ensures the state desired is valid and registered in the machine.
     *
     * @param state The state to be checked
     */
    isValidState(state) {
        return this.states.indexOf(state) >= 0;
    }
    /**
     * Get current machine state.
     */
    get state() {
        // Ensure state is valid
        if (!this._state && this.options.state && !this.isValidState(this.options.state)) {
            throw new Error(`Invalid initial state: "${this.options.state}"`);
        }
        else if (!this._state && this.initialState && !this.isValidState(this.initialState)) {
            throw new Error(`Invalid initial state: "${this.initialState}"`);
        }
        else if (!this._state && this.options.state) {
            // Set the initial state locally
            this._state = this.options.state;
        }
        else if (!this._state) {
            // Set the initial state locally
            this._state = this.initialState;
        }
        return this._state;
    }
    /**
     * Handles a state transition preparation
     */
    beforeTransition(from, to, data) {
        this.logger.silly(`${this.name}: leaving state(s) "${Array.isArray(from) ? from.join(`", "`) : from}"`, { data });
    }
    /**
     * Handles a state transition
     *
     * @param data The transition payload passed to the fsm.goTo() method.
     */
    onTransition(from, to, data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.silly(`${this.name}: transitioning states "${Array.isArray(from) ? from.join(`", "`) : from}" => "${to}"`, { data });
            return true;
        });
    }
    /**
     * Handles post transition results.
     */
    afterTransition(from, to, data) {
        this.logger.silly(`${this.name}: entering "${to}"`, { data });
    }
    /**
     * Gets all available actions to go to a determined state.
     *
     * @param to The desired state
     */
    pathsTo(to) {
        if (to === this.state && !this.options.allowSameState) {
            return false;
        }
        if (to === this.state) {
            return [];
        }
        // Get all available actions from the current machine
        const actions = this.actions.filter(action => action.matches(this.state, to));
        if (actions && actions.length) {
            return actions;
        }
        return false;
    }
    /**
     * Checks if can go to desired state.
     *
     * @param to The desired state
     */
    canGoTo(to) {
        return !!this.pathsTo(to);
    }
    /**
     * Performs the internal state change in the machine. Should not be called directl, use "goTo".
     *
     * @param to The destination state
     */
    setState(to) {
        return __awaiter(this, void 0, void 0, function* () {
            // Set the next state locally
            this._state = to;
        });
    }
    /**
     * Performs a new transition in the machine.
     *
     * @param to The desired state
     * @param data An optional payload to be passed to the machine actions
     */
    goTo(to, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const state = this.state;
            if (to === state && !this.options.allowSameState) {
                throw new Error(`Machine is already in "${state}" state`);
            }
            // Ensure state is valid
            if (!this.isValidState(to)) {
                throw new Error(`Invalid state: "${to}"`);
            }
            // Get all available actions from the current machine
            const actions = this.pathsTo(to);
            if (actions) {
                const froms = actions.length
                    ? actions.reduce((states, action) => {
                        if (Array.isArray(action.from)) {
                            action.from.forEach(state => states.push(state));
                        }
                        else {
                            states.push(action.from);
                        }
                        return states;
                    }, [])
                    : this.state;
                // Notify we're leaving the current state
                yield Promise.all(actions.map(action => action.beforeTransition(this.instance)));
                // Run own beforeTranstion
                yield this.beforeTransition(froms, to, data);
                // TODO: Run this is series
                // Check if we can transition to the next state
                const computedData = Object.assign({}, (data || {}), { to, from: state });
                const results = yield Promise.all(actions.map(action => action.onTransition(this.instance, computedData)));
                // Run own onTranstion
                results.push(yield this.onTransition(froms, to, data));
                const ok = results.reduce((aggr, next) => aggr && next, true);
                if (ok) {
                    yield this.setState(to);
                    // Notify we're entered the next state
                    yield Promise.all(actions.map(action => action.afterTransition(this.instance)));
                    yield this.afterTransition(froms, to, data);
                    return true;
                }
                this.logger.info(`Transition interrupted: "${state}" => "${to}"`);
            }
            else {
                throw new Error(`No action available to transition from "${state}" to "${to}" state.`);
            }
            return false;
        });
    }
    toDot(options = { name: "graphname" }) {
        const start = `digraph ${options.name} {\n`;
        const body = this.states
            .flatMap(state => {
            const previousStates = this.pathsTo(state);
            if (!previousStates)
                return [""];
            return previousStates.map(previousState => {
                let normalizedPreviousState = "";
                if ((previousState.from = "*")) {
                    normalizedPreviousState = this.states.join(",");
                }
                else {
                    normalizedPreviousState = previousState.from;
                }
                return `  ${normalizedPreviousState} -> ${state} [label=${previousState.name}];\n`;
            });
        })
            .filter(s => !!s)
            .join("");
        const end = `}`;
        return start + body + end;
    }
}
exports.default = FSM;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmluaXRlU3RhdGVNYWNoaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0Zpbml0ZVN0YXRlTWFjaGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkNBQXFEO0FBVXJEOztHQUVHO0FBQ0gsTUFBOEIsR0FBRztJQVEvQixZQUFtQixRQUFrQixFQUFZLFVBQTZCLEVBQUU7UUFBN0QsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFZLFlBQU8sR0FBUCxPQUFPLENBQXdCO1FBQzlFLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQy9ELElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxvQkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsWUFBWSxDQUFDLEtBQVk7UUFDdkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxLQUFLO1FBQ2Qsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hGLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUNuRTthQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZ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S0FBSyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBbE5ELHNCQWtOQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlciwgTG9nZ2VySW5zdGFuY2UgfSBmcm9tIFwibmFuby1lcnJvcnNcIjtcbmltcG9ydCBBY3Rpb24gZnJvbSBcIi4vQWN0aW9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRlNNT3B0aW9uczxTdGF0ZT4ge1xuICBuYW1lPzogc3RyaW5nO1xuICBzdGF0ZT86IFN0YXRlO1xuICBsb2dnZXI/OiBMb2dnZXJJbnN0YW5jZTtcbiAgYWxsb3dTYW1lU3RhdGU/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIFRoZSBtYWluIEZpbml0ZSBTdGF0ZSBNYWNoaW5lIG1hbmFnZXIsIHRoYXQgaG9sZHMgYWxsIGF2YWlsYWJsZSBhY3Rpb25zIGFuZCBwZXJmb3JtcyB0aGUgc3RhdGUgdHJhbnNpdGlvbnMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEZTTTxJbnN0YW5jZSwgU3RhdGUsIFBheWxvYWQgPSBhbnk+IHtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHJvdGVjdGVkIGFic3RyYWN0IGFjdGlvbnM6IEFjdGlvbjxJbnN0YW5jZSwgU3RhdGUsIFBheWxvYWQ+W107XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBpbml0aWFsU3RhdGU6IFN0YXRlO1xuICBwcm90ZWN0ZWQgYWJzdHJhY3Qgc3RhdGVzOiBTdGF0ZVtdO1xuICBwcm90ZWN0ZWQgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcbiAgcHJvdGVjdGVkIF9zdGF0ZTogU3RhdGU7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGluc3RhbmNlOiBJbnN0YW5jZSwgcHJvdGVjdGVkIG9wdGlvbnM6IEZTTU9wdGlvbnM8U3RhdGU+ID0ge30pIHtcbiAgICB0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWUgfHwgdGhpcy5uYW1lIHx8IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZXMgdGhlIHN0YXRlIGRlc2lyZWQgaXMgdmFsaWQgYW5kIHJlZ2lzdGVyZWQgaW4gdGhlIG1hY2hpbmUuXG4gICAqXG4gICAqIEBwYXJhbSBzdGF0ZSBUaGUgc3RhdGUgdG8gYmUgY2hlY2tlZFxuICAgKi9cbiAgaXNWYWxpZFN0YXRlKHN0YXRlOiBTdGF0ZSkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlcy5pbmRleE9mKHN0YXRlKSA+PSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjdXJyZW50IG1hY2hpbmUgc3RhdGUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHN0YXRlKCk6IFN0YXRlIHtcbiAgICAvLyBFbnN1cmUgc3RhdGUgaXMgdmFsaWRcbiAgICBpZiAoIXRoaXMuX3N0YXRlICYmIHRoaXMub3B0aW9ucy5zdGF0ZSAmJiAhdGhpcy5pc1ZhbGlkU3RhdGUodGhpcy5vcHRpb25zLnN0YXRlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGluaXRpYWwgc3RhdGU6IFwiJHt0aGlzLm9wdGlvbnMuc3RhdGV9XCJgKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9zdGF0ZSAmJiB0aGlzLmluaXRpYWxTdGF0ZSAmJiAhdGhpcy5pc1ZhbGlkU3RhdGUodGhpcy5pbml0aWFsU3RhdGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgaW5pdGlhbCBzdGF0ZTogXCIke3RoaXMuaW5pdGlhbFN0YXRlfVwiYCk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5fc3RhdGUgJiYgdGhpcy5vcHRpb25zLnN0YXRlKSB7XG4gICAgICAvLyBTZXQgdGhlIGluaXRpYWwgc3RhdGUgbG9jYWxseVxuICAgICAgdGhpcy5fc3RhdGUgPSB0aGlzLm9wdGlvbnMuc3RhdGU7XG4gICAgfSBlbHNlIGlmICghdGhpcy5fc3RhdGUpIHtcbiAgICAgIC8vIFNldCB0aGUgaW5pdGlhbCBzdGF0ZSBsb2NhbGx5XG4gICAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuaW5pdGlhbFN0YXRlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGEgc3RhdGUgdHJhbnNpdGlvbiBwcmVwYXJhdGlvblxuICAgKi9cbiAgcHVibGljIGJlZm9yZVRyYW5zaXRpb24oZnJvbTogU3RhdGUgfCAoU3RhdGUgfCBzdHJpbmcpW10sIHRvOiBTdGF0ZSwgZGF0YTogUGF5bG9hZCk6IHZvaWQge1xuICAgIHRoaXMubG9nZ2VyLnNpbGx5KGAke3RoaXMubmFtZX06IGxlYXZpbmcgc3RhdGUocykgXCIke0FycmF5LmlzQXJyYXkoZnJvbSkgPyBmcm9tLmpvaW4oYFwiLCBcImApIDogZnJvbX1cImAsIHsgZGF0YSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGEgc3RhdGUgdHJhbnNpdGlvblxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgdHJhbnNpdGlvbiBwYXlsb2FkIHBhc3NlZCB0byB0aGUgZnNtLmdvVG8oKSBtZXRob2QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgb25UcmFuc2l0aW9uKGZyb206IFN0YXRlIHwgKFN0YXRlIHwgc3RyaW5nKVtdLCB0bzogU3RhdGUsIGRhdGE6IFBheWxvYWQpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICB0aGlzLmxvZ2dlci5zaWxseShcbiAgICAgIGAke3RoaXMubmFtZX06IHRyYW5zaXRpb25pbmcgc3RhdGVzIFwiJHtBcnJheS5pc0FycmF5KGZyb20pID8gZnJvbS5qb2luKGBcIiwgXCJgKSA6IGZyb219XCIgPT4gXCIke3RvfVwiYCxcbiAgICAgIHsgZGF0YSB9XG4gICAgKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHBvc3QgdHJhbnNpdGlvbiByZXN1bHRzLlxuICAgKi9cbiAgcHVibGljIGFmdGVyVHJhbnNpdGlvbihmcm9tOiBTdGF0ZSB8IChTdGF0ZSB8IHN0cmluZylbXSwgdG86IFN0YXRlLCBkYXRhOiBQYXlsb2FkKTogdm9pZCB7XG4gICAgdGhpcy5sb2dnZXIuc2lsbHkoYCR7dGhpcy5uYW1lfTogZW50ZXJpbmcgXCIke3RvfVwiYCwgeyBkYXRhIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIGF2YWlsYWJsZSBhY3Rpb25zIHRvIGdvIHRvIGEgZGV0ZXJtaW5lZCBzdGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHRvIFRoZSBkZXNpcmVkIHN0YXRlXG4gICAqL1xuICBwdWJsaWMgcGF0aHNUbyh0bzogU3RhdGUpOiBmYWxzZSB8IEFjdGlvbjxJbnN0YW5jZSwgU3RhdGU+W10ge1xuICAgIGlmICh0byA9PT0gdGhpcy5zdGF0ZSAmJiAhdGhpcy5vcHRpb25zLmFsbG93U2FtZVN0YXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRvID09PSB0aGlzLnN0YXRlKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgLy8gR2V0IGFsbCBhdmFpbGFibGUgYWN0aW9ucyBmcm9tIHRoZSBjdXJyZW50IG1hY2hpbmVcbiAgICBjb25zdCBhY3Rpb25zID0gdGhpcy5hY3Rpb25zLmZpbHRlcihhY3Rpb24gPT4gYWN0aW9uLm1hdGNoZXModGhpcy5zdGF0ZSwgdG8pKTtcblxuICAgIGlmIChhY3Rpb25zICYmIGFjdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gYWN0aW9ucztcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGNhbiBnbyB0byBkZXNpcmVkIHN0YXRlLlxuICAgKlxuICAgKiBAcGFyYW0gdG8gVGhlIGRlc2lyZWQgc3RhdGVcbiAgICovXG4gIHB1YmxpYyBjYW5Hb1RvKHRvOiBTdGF0ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMucGF0aHNUbyh0byk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgdGhlIGludGVybmFsIHN0YXRlIGNoYW5nZSBpbiB0aGUgbWFjaGluZS4gU2hvdWxkIG5vdCBiZSBjYWxsZWQgZGlyZWN0bCwgdXNlIFwiZ29Ub1wiLlxuICAgKlxuICAgKiBAcGFyYW0gdG8gVGhlIGRlc3RpbmF0aW9uIHN0YXRlXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgc2V0U3RhdGUodG86IFN0YXRlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gU2V0IHRoZSBuZXh0IHN0YXRlIGxvY2FsbHlcbiAgICB0aGlzLl9zdGF0ZSA9IHRvO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgbmV3IHRyYW5zaXRpb24gaW4gdGhlIG1hY2hpbmUuXG4gICAqXG4gICAqIEBwYXJhbSB0byBUaGUgZGVzaXJlZCBzdGF0ZVxuICAgKiBAcGFyYW0gZGF0YSBBbiBvcHRpb25hbCBwYXlsb2FkIHRvIGJlIHBhc3NlZCB0byB0aGUgbWFjaGluZSBhY3Rpb25zXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ29Ubyh0bzogU3RhdGUsIGRhdGE/OiBQYXlsb2FkKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuXG4gICAgaWYgKHRvID09PSBzdGF0ZSAmJiAhdGhpcy5vcHRpb25zLmFsbG93U2FtZVN0YXRlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE1hY2hpbmUgaXMgYWxyZWFkeSBpbiBcIiR7c3RhdGV9XCIgc3RhdGVgKTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgc3RhdGUgaXMgdmFsaWRcbiAgICBpZiAoIXRoaXMuaXNWYWxpZFN0YXRlKHRvKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHN0YXRlOiBcIiR7dG99XCJgKTtcbiAgICB9XG5cbiAgICAvLyBHZXQgYWxsIGF2YWlsYWJsZSBhY3Rpb25zIGZyb20gdGhlIGN1cnJlbnQgbWFjaGluZVxuICAgIGNvbnN0IGFjdGlvbnMgPSB0aGlzLnBhdGhzVG8odG8pO1xuXG4gICAgaWYgKGFjdGlvbnMpIHtcbiAgICAgIGNvbnN0IGZyb21zID0gYWN0aW9ucy5sZW5ndGhcbiAgICAgICAgPyBhY3Rpb25zLnJlZHVjZShcbiAgICAgICAgICAgIChzdGF0ZXMsIGFjdGlvbikgPT4ge1xuICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhY3Rpb24uZnJvbSkpIHtcbiAgICAgICAgICAgICAgICAoYWN0aW9uLmZyb20gYXMgU3RhdGVbXSkuZm9yRWFjaChzdGF0ZSA9PiBzdGF0ZXMucHVzaChzdGF0ZSkpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXRlcy5wdXNoKGFjdGlvbi5mcm9tKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBzdGF0ZXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW10gYXMgKFN0YXRlIHwgc3RyaW5nKVtdXG4gICAgICAgICAgKVxuICAgICAgICA6IHRoaXMuc3RhdGU7XG5cbiAgICAgIC8vIE5vdGlmeSB3ZSdyZSBsZWF2aW5nIHRoZSBjdXJyZW50IHN0YXRlXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChhY3Rpb25zLm1hcChhY3Rpb24gPT4gYWN0aW9uLmJlZm9yZVRyYW5zaXRpb24odGhpcy5pbnN0YW5jZSkpKTtcblxuICAgICAgLy8gUnVuIG93biBiZWZvcmVUcmFuc3Rpb25cbiAgICAgIGF3YWl0IHRoaXMuYmVmb3JlVHJhbnNpdGlvbihmcm9tcywgdG8sIGRhdGEpO1xuXG4gICAgICAvLyBUT0RPOiBSdW4gdGhpcyBpcyBzZXJpZXNcbiAgICAgIC8vIENoZWNrIGlmIHdlIGNhbiB0cmFuc2l0aW9uIHRvIHRoZSBuZXh0IHN0YXRlXG4gICAgICBjb25zdCBjb21wdXRlZERhdGEgPSB7IC4uLihkYXRhIHx8IHt9KSwgdG8sIGZyb206IHN0YXRlIH07XG4gICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwoYWN0aW9ucy5tYXAoYWN0aW9uID0+IGFjdGlvbi5vblRyYW5zaXRpb24odGhpcy5pbnN0YW5jZSwgY29tcHV0ZWREYXRhKSkpO1xuXG4gICAgICAvLyBSdW4gb3duIG9uVHJhbnN0aW9uXG4gICAgICByZXN1bHRzLnB1c2goYXdhaXQgdGhpcy5vblRyYW5zaXRpb24oZnJvbXMsIHRvLCBkYXRhKSk7XG5cbiAgICAgIGNvbnN0IG9rID0gcmVzdWx0cy5yZWR1Y2UoKGFnZ3IsIG5leHQpID0+IGFnZ3IgJiYgbmV4dCwgdHJ1ZSk7XG5cbiAgICAgIGlmIChvaykge1xuICAgICAgICBhd2FpdCB0aGlzLnNldFN0YXRlKHRvKTtcblxuICAgICAgICAvLyBOb3RpZnkgd2UncmUgZW50ZXJlZCB0aGUgbmV4dCBzdGF0ZVxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChhY3Rpb25zLm1hcChhY3Rpb24gPT4gYWN0aW9uLmFmdGVyVHJhbnNpdGlvbih0aGlzLmluc3RhbmNlKSkpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMuYWZ0ZXJUcmFuc2l0aW9uKGZyb21zLCB0bywgZGF0YSk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oYFRyYW5zaXRpb24gaW50ZXJydXB0ZWQ6IFwiJHtzdGF0ZX1cIiA9PiBcIiR7dG99XCJgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBhY3Rpb24gYXZhaWxhYmxlIHRvIHRyYW5zaXRpb24gZnJvbSBcIiR7c3RhdGV9XCIgdG8gXCIke3RvfVwiIHN0YXRlLmApO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHRvRG90KG9wdGlvbnM6IHsgbmFtZTogc3RyaW5nIH0gPSB7IG5hbWU6IFwiZ3JhcGhuYW1lXCIgfSkge1xuICAgIGNvbnN0IHN0YXJ0ID0gYGRpZ3JhcGggJHtvcHRpb25zLm5hbWV9IHtcXG5gO1xuXG4gICAgY29uc3QgYm9keSA9IHRoaXMuc3RhdGVzXG4gICAgICAuZmxhdE1hcChzdGF0ZSA9PiB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzU3RhdGVzID0gdGhpcy5wYXRoc1RvKHN0YXRlKTtcbiAgICAgICAgaWYgKCFwcmV2aW91c1N0YXRlcykgcmV0dXJuIFtcIlwiXTtcblxuICAgICAgICByZXR1cm4gcHJldmlvdXNTdGF0ZXMubWFwKHByZXZpb3VzU3RhdGUgPT4ge1xuICAgICAgICAgIGxldCBub3JtYWxpemVkUHJldmlvdXNTdGF0ZSA9IFwiXCI7XG4gICAgICAgICAgaWYgKChwcmV2aW91c1N0YXRlLmZyb20gPSBcIipcIikpIHtcbiAgICAgICAgICAgIG5vcm1hbGl6ZWRQcmV2aW91c1N0YXRlID0gdGhpcy5zdGF0ZXMuam9pbihcIixcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vcm1hbGl6ZWRQcmV2aW91c1N0YXRlID0gcHJldmlvdXNTdGF0ZS5mcm9tO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBgICAke25vcm1hbGl6ZWRQcmV2aW91c1N0YXRlfSAtPiAke3N0YXRlfSBbbGFiZWw9JHtwcmV2aW91c1N0YXRlLm5hbWV9XTtcXG5gO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKHMgPT4gISFzKVxuICAgICAgLmpvaW4oXCJcIik7XG5cbiAgICBjb25zdCBlbmQgPSBgfWA7XG5cbiAgICByZXR1cm4gc3RhcnQgKyBib2R5ICsgZW5kO1xuICB9XG59XG4iXX0=