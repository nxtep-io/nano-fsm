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
const ts_framework_common_1 = require("ts-framework-common");
/**
 * The main Finite State Machine manager, that holds all available actions and performs the state transitions.
 */
class FSM {
    constructor(instance, options = {}) {
        this.instance = instance;
        this.options = options;
        this.name = options.name || this.name || this.constructor.name;
        this.logger = options.logger || new ts_framework_common_1.Logger();
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
                const froms = actions.length ? actions.reduce((states, action) => {
                    if (Array.isArray(action.from)) {
                        action.from.forEach(state => states.push(state));
                    }
                    else {
                        states.push(action.from);
                    }
                    return states;
                }, []) : this.state;
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
}
exports.default = FSM;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmluaXRlU3RhdGVNYWNoaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0Zpbml0ZVN0YXRlTWFjaGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkRBQTZDO0FBVTdDOztHQUVHO0FBQ0gsTUFBOEIsR0FBRztJQVEvQixZQUFtQixRQUFrQixFQUFZLFVBQTZCLEVBQUU7UUFBN0QsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFZLFlBQU8sR0FBUCxPQUFPLENBQXdCO1FBQzlFLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQy9ELElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLDRCQUFNLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFlBQVksQ0FBQyxLQUFZO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsS0FBSztRQUNkLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNoRixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDbkU7YUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDckYs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LFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNuRTtpQkFBTTtnQkFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxLQUFLLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUN4RjtZQUVELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztLQUFBO0NBQ0Y7QUFyTEQsc0JBcUxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCBBY3Rpb24gZnJvbSBcIi4vQWN0aW9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRlNNT3B0aW9uczxTdGF0ZT4ge1xuICBuYW1lPzogc3RyaW5nO1xuICBzdGF0ZT86IFN0YXRlO1xuICBsb2dnZXI/OiBMb2dnZXI7XG4gIGFsbG93U2FtZVN0YXRlPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBUaGUgbWFpbiBGaW5pdGUgU3RhdGUgTWFjaGluZSBtYW5hZ2VyLCB0aGF0IGhvbGRzIGFsbCBhdmFpbGFibGUgYWN0aW9ucyBhbmQgcGVyZm9ybXMgdGhlIHN0YXRlIHRyYW5zaXRpb25zLlxuICovXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBGU008SW5zdGFuY2UsIFN0YXRlLCBQYXlsb2FkID0gYW55PiB7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhY3Rpb25zOiBBY3Rpb248SW5zdGFuY2UsIFN0YXRlLCBQYXlsb2FkPltdO1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgaW5pdGlhbFN0YXRlOiBTdGF0ZTtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHN0YXRlczogU3RhdGVbXTtcbiAgcHJvdGVjdGVkIGxvZ2dlcjogTG9nZ2VyO1xuICBwcm90ZWN0ZWQgX3N0YXRlOiBTdGF0ZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5zdGFuY2U6IEluc3RhbmNlLCBwcm90ZWN0ZWQgb3B0aW9uczogRlNNT3B0aW9uczxTdGF0ZT4gPSB7fSkge1xuICAgIHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZSB8fCB0aGlzLm5hbWUgfHwgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgbmV3IExvZ2dlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZXMgdGhlIHN0YXRlIGRlc2lyZWQgaXMgdmFsaWQgYW5kIHJlZ2lzdGVyZWQgaW4gdGhlIG1hY2hpbmUuXG4gICAqXG4gICAqIEBwYXJhbSBzdGF0ZSBUaGUgc3RhdGUgdG8gYmUgY2hlY2tlZFxuICAgKi9cbiAgaXNWYWxpZFN0YXRlKHN0YXRlOiBTdGF0ZSkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlcy5pbmRleE9mKHN0YXRlKSA+PSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjdXJyZW50IG1hY2hpbmUgc3RhdGUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHN0YXRlKCk6IFN0YXRlIHtcbiAgICAvLyBFbnN1cmUgc3RhdGUgaXMgdmFsaWRcbiAgICBpZiAoIXRoaXMuX3N0YXRlICYmIHRoaXMub3B0aW9ucy5zdGF0ZSAmJiAhdGhpcy5pc1ZhbGlkU3RhdGUodGhpcy5vcHRpb25zLnN0YXRlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGluaXRpYWwgc3RhdGU6IFwiJHt0aGlzLm9wdGlvbnMuc3RhdGV9XCJgKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9zdGF0ZSAmJiB0aGlzLmluaXRpYWxTdGF0ZSAmJiAhdGhpcy5pc1ZhbGlkU3RhdGUodGhpcy5pbml0aWFsU3RhdGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgaW5pdGlhbCBzdGF0ZTogXCIke3RoaXMuaW5pdGlhbFN0YXRlfVwiYCk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5fc3RhdGUgJiYgdGhpcy5vcHRpb25zLnN0YXRlKSB7XG4gICAgICAvLyBTZXQgdGhlIGluaXRpYWwgc3RhdGUgbG9jYWxseVxuICAgICAgdGhpcy5fc3RhdGUgPSB0aGlzLm9wdGlvbnMuc3RhdGU7XG4gICAgfSBlbHNlIGlmICghdGhpcy5fc3RhdGUpIHtcbiAgICAgIC8vIFNldCB0aGUgaW5pdGlhbCBzdGF0ZSBsb2NhbGx5XG4gICAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuaW5pdGlhbFN0YXRlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGEgc3RhdGUgdHJhbnNpdGlvbiBwcmVwYXJhdGlvblxuICAgKi9cbiAgcHVibGljIGJlZm9yZVRyYW5zaXRpb24oZnJvbTogU3RhdGUgfCAoU3RhdGUgfCBzdHJpbmcpW10sIHRvOiBTdGF0ZSwgZGF0YTogUGF5bG9hZCk6IHZvaWQge1xuICAgIHRoaXMubG9nZ2VyLnNpbGx5KGAke3RoaXMubmFtZX06IGxlYXZpbmcgc3RhdGUocykgXCIke0FycmF5LmlzQXJyYXkoZnJvbSkgPyBmcm9tLmpvaW4oYFwiLCBcImApIDogZnJvbX1cImAsIHsgZGF0YSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGEgc3RhdGUgdHJhbnNpdGlvblxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgdHJhbnNpdGlvbiBwYXlsb2FkIHBhc3NlZCB0byB0aGUgZnNtLmdvVG8oKSBtZXRob2QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgb25UcmFuc2l0aW9uKGZyb206IFN0YXRlIHwgKFN0YXRlIHwgc3RyaW5nKVtdLCB0bzogU3RhdGUsIGRhdGE6IFBheWxvYWQpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICB0aGlzLmxvZ2dlci5zaWxseShcbiAgICAgIGAke3RoaXMubmFtZX06IHRyYW5zaXRpb25pbmcgc3RhdGVzIFwiJHtBcnJheS5pc0FycmF5KGZyb20pID8gZnJvbS5qb2luKGBcIiwgXCJgKSA6IGZyb219XCIgPT4gXCIke3RvfVwiYCxcbiAgICAgIHsgZGF0YSB9XG4gICAgKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHBvc3QgdHJhbnNpdGlvbiByZXN1bHRzLlxuICAgKi9cbiAgcHVibGljIGFmdGVyVHJhbnNpdGlvbihmcm9tOiBTdGF0ZSB8IChTdGF0ZSB8IHN0cmluZylbXSwgdG86IFN0YXRlLCBkYXRhOiBQYXlsb2FkKTogdm9pZCB7XG4gICAgdGhpcy5sb2dnZXIuc2lsbHkoYCR7dGhpcy5uYW1lfTogZW50ZXJpbmcgXCIke3RvfVwiYCwgeyBkYXRhIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIGF2YWlsYWJsZSBhY3Rpb25zIHRvIGdvIHRvIGEgZGV0ZXJtaW5lZCBzdGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHRvIFRoZSBkZXNpcmVkIHN0YXRlXG4gICAqL1xuICBwdWJsaWMgcGF0aHNUbyh0bzogU3RhdGUpOiBmYWxzZSB8IEFjdGlvbjxJbnN0YW5jZSwgU3RhdGU+W10ge1xuICAgIGlmICh0byA9PT0gdGhpcy5zdGF0ZSAmJiAhdGhpcy5vcHRpb25zLmFsbG93U2FtZVN0YXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRvID09PSB0aGlzLnN0YXRlKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgLy8gR2V0IGFsbCBhdmFpbGFibGUgYWN0aW9ucyBmcm9tIHRoZSBjdXJyZW50IG1hY2hpbmVcbiAgICBjb25zdCBhY3Rpb25zID0gdGhpcy5hY3Rpb25zLmZpbHRlcihhY3Rpb24gPT4gYWN0aW9uLm1hdGNoZXModGhpcy5zdGF0ZSwgdG8pKTtcblxuICAgIGlmIChhY3Rpb25zICYmIGFjdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gYWN0aW9ucztcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGNhbiBnbyB0byBkZXNpcmVkIHN0YXRlLlxuICAgKlxuICAgKiBAcGFyYW0gdG8gVGhlIGRlc2lyZWQgc3RhdGVcbiAgICovXG4gIHB1YmxpYyBjYW5Hb1RvKHRvOiBTdGF0ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMucGF0aHNUbyh0byk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgdGhlIGludGVybmFsIHN0YXRlIGNoYW5nZSBpbiB0aGUgbWFjaGluZS4gU2hvdWxkIG5vdCBiZSBjYWxsZWQgZGlyZWN0bCwgdXNlIFwiZ29Ub1wiLlxuICAgKlxuICAgKiBAcGFyYW0gdG8gVGhlIGRlc3RpbmF0aW9uIHN0YXRlXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgc2V0U3RhdGUodG86IFN0YXRlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gU2V0IHRoZSBuZXh0IHN0YXRlIGxvY2FsbHlcbiAgICB0aGlzLl9zdGF0ZSA9IHRvO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgbmV3IHRyYW5zaXRpb24gaW4gdGhlIG1hY2hpbmUuXG4gICAqXG4gICAqIEBwYXJhbSB0byBUaGUgZGVzaXJlZCBzdGF0ZVxuICAgKiBAcGFyYW0gZGF0YSBBbiBvcHRpb25hbCBwYXlsb2FkIHRvIGJlIHBhc3NlZCB0byB0aGUgbWFjaGluZSBhY3Rpb25zXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ29Ubyh0bzogU3RhdGUsIGRhdGE/OiBQYXlsb2FkKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuXG4gICAgaWYgKHRvID09PSBzdGF0ZSAmJiAhdGhpcy5vcHRpb25zLmFsbG93U2FtZVN0YXRlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE1hY2hpbmUgaXMgYWxyZWFkeSBpbiBcIiR7c3RhdGV9XCIgc3RhdGVgKTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgc3RhdGUgaXMgdmFsaWRcbiAgICBpZiAoIXRoaXMuaXNWYWxpZFN0YXRlKHRvKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHN0YXRlOiBcIiR7dG99XCJgKTtcbiAgICB9XG5cbiAgICAvLyBHZXQgYWxsIGF2YWlsYWJsZSBhY3Rpb25zIGZyb20gdGhlIGN1cnJlbnQgbWFjaGluZVxuICAgIGNvbnN0IGFjdGlvbnMgPSB0aGlzLnBhdGhzVG8odG8pO1xuXG4gICAgaWYgKGFjdGlvbnMpIHtcbiAgICAgIGNvbnN0IGZyb21zID0gYWN0aW9ucy5sZW5ndGggPyBhY3Rpb25zLnJlZHVjZShcbiAgICAgICAgKHN0YXRlcywgYWN0aW9uKSA9PiB7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYWN0aW9uLmZyb20pKSB7XG4gICAgICAgICAgICAoYWN0aW9uLmZyb20gYXMgU3RhdGVbXSkuZm9yRWFjaChzdGF0ZSA9PiBzdGF0ZXMucHVzaChzdGF0ZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0ZXMucHVzaChhY3Rpb24uZnJvbSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHN0YXRlcztcbiAgICAgICAgfSxcbiAgICAgICAgW10gYXMgKFN0YXRlIHwgc3RyaW5nKVtdXG4gICAgICApIDogdGhpcy5zdGF0ZTtcblxuICAgICAgLy8gTm90aWZ5IHdlJ3JlIGxlYXZpbmcgdGhlIGN1cnJlbnQgc3RhdGVcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGFjdGlvbnMubWFwKGFjdGlvbiA9PiBhY3Rpb24uYmVmb3JlVHJhbnNpdGlvbih0aGlzLmluc3RhbmNlKSkpO1xuXG4gICAgICAvLyBSdW4gb3duIGJlZm9yZVRyYW5zdGlvblxuICAgICAgYXdhaXQgdGhpcy5iZWZvcmVUcmFuc2l0aW9uKGZyb21zLCB0bywgZGF0YSk7XG5cbiAgICAgIC8vIFRPRE86IFJ1biB0aGlzIGlzIHNlcmllc1xuICAgICAgLy8gQ2hlY2sgaWYgd2UgY2FuIHRyYW5zaXRpb24gdG8gdGhlIG5leHQgc3RhdGVcbiAgICAgIGNvbnN0IGNvbXB1dGVkRGF0YSA9IHsgLi4uKGRhdGEgfHwge30pLCB0bywgZnJvbTogc3RhdGUgfTtcbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbChhY3Rpb25zLm1hcChhY3Rpb24gPT4gYWN0aW9uLm9uVHJhbnNpdGlvbih0aGlzLmluc3RhbmNlLCBjb21wdXRlZERhdGEpKSk7XG5cbiAgICAgIC8vIFJ1biBvd24gb25UcmFuc3Rpb25cbiAgICAgIHJlc3VsdHMucHVzaChhd2FpdCB0aGlzLm9uVHJhbnNpdGlvbihmcm9tcywgdG8sIGRhdGEpKTtcblxuICAgICAgY29uc3Qgb2sgPSByZXN1bHRzLnJlZHVjZSgoYWdnciwgbmV4dCkgPT4gYWdnciAmJiBuZXh0LCB0cnVlKTtcblxuICAgICAgaWYgKG9rKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc2V0U3RhdGUodG8pO1xuXG4gICAgICAgIC8vIE5vdGlmeSB3ZSdyZSBlbnRlcmVkIHRoZSBuZXh0IHN0YXRlXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKGFjdGlvbnMubWFwKGFjdGlvbiA9PiBhY3Rpb24uYWZ0ZXJUcmFuc2l0aW9uKHRoaXMuaW5zdGFuY2UpKSk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5hZnRlclRyYW5zaXRpb24oZnJvbXMsIHRvLCBkYXRhKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgVHJhbnNpdGlvbiBpbnRlcnJ1cHRlZDogXCIke3N0YXRlfVwiID0+IFwiJHt0b31cImApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGFjdGlvbiBhdmFpbGFibGUgdG8gdHJhbnNpdGlvbiBmcm9tIFwiJHtzdGF0ZX1cIiB0byBcIiR7dG99XCIgc3RhdGUuYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=