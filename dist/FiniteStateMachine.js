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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmluaXRlU3RhdGVNYWNoaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0Zpbml0ZVN0YXRlTWFjaGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkNBQXFEO0FBVXJEOztHQUVHO0FBQ0gsTUFBOEIsR0FBRztJQVEvQixZQUFtQixRQUFrQixFQUFZLFVBQTZCLEVBQUU7UUFBN0QsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFZLFlBQU8sR0FBUCxPQUFPLENBQXdCO1FBQzlFLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQy9ELElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxvQkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsWUFBWSxDQUFDLEtBQVk7UUFDdkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxLQUFLO1FBQ2Qsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hGLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUNuRTthQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZ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LEtBQUssU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ25FO2lCQUFNO2dCQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLEtBQUssU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQ3hGO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO0tBQUE7Q0FDRjtBQXJMRCxzQkFxTEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIsIExvZ2dlckluc3RhbmNlIH0gZnJvbSBcIm5hbm8tZXJyb3JzXCI7XG5pbXBvcnQgQWN0aW9uIGZyb20gXCIuL0FjdGlvblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZTTU9wdGlvbnM8U3RhdGU+IHtcbiAgbmFtZT86IHN0cmluZztcbiAgc3RhdGU/OiBTdGF0ZTtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIGFsbG93U2FtZVN0YXRlPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBUaGUgbWFpbiBGaW5pdGUgU3RhdGUgTWFjaGluZSBtYW5hZ2VyLCB0aGF0IGhvbGRzIGFsbCBhdmFpbGFibGUgYWN0aW9ucyBhbmQgcGVyZm9ybXMgdGhlIHN0YXRlIHRyYW5zaXRpb25zLlxuICovXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBGU008SW5zdGFuY2UsIFN0YXRlLCBQYXlsb2FkID0gYW55PiB7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhY3Rpb25zOiBBY3Rpb248SW5zdGFuY2UsIFN0YXRlLCBQYXlsb2FkPltdO1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgaW5pdGlhbFN0YXRlOiBTdGF0ZTtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHN0YXRlczogU3RhdGVbXTtcbiAgcHJvdGVjdGVkIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG4gIHByb3RlY3RlZCBfc3RhdGU6IFN0YXRlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpbnN0YW5jZTogSW5zdGFuY2UsIHByb3RlY3RlZCBvcHRpb25zOiBGU01PcHRpb25zPFN0YXRlPiA9IHt9KSB7XG4gICAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lIHx8IHRoaXMubmFtZSB8fCB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbnN1cmVzIHRoZSBzdGF0ZSBkZXNpcmVkIGlzIHZhbGlkIGFuZCByZWdpc3RlcmVkIGluIHRoZSBtYWNoaW5lLlxuICAgKlxuICAgKiBAcGFyYW0gc3RhdGUgVGhlIHN0YXRlIHRvIGJlIGNoZWNrZWRcbiAgICovXG4gIGlzVmFsaWRTdGF0ZShzdGF0ZTogU3RhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZXMuaW5kZXhPZihzdGF0ZSkgPj0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY3VycmVudCBtYWNoaW5lIHN0YXRlLlxuICAgKi9cbiAgcHVibGljIGdldCBzdGF0ZSgpOiBTdGF0ZSB7XG4gICAgLy8gRW5zdXJlIHN0YXRlIGlzIHZhbGlkXG4gICAgaWYgKCF0aGlzLl9zdGF0ZSAmJiB0aGlzLm9wdGlvbnMuc3RhdGUgJiYgIXRoaXMuaXNWYWxpZFN0YXRlKHRoaXMub3B0aW9ucy5zdGF0ZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBpbml0aWFsIHN0YXRlOiBcIiR7dGhpcy5vcHRpb25zLnN0YXRlfVwiYCk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5fc3RhdGUgJiYgdGhpcy5pbml0aWFsU3RhdGUgJiYgIXRoaXMuaXNWYWxpZFN0YXRlKHRoaXMuaW5pdGlhbFN0YXRlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGluaXRpYWwgc3RhdGU6IFwiJHt0aGlzLmluaXRpYWxTdGF0ZX1cImApO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuX3N0YXRlICYmIHRoaXMub3B0aW9ucy5zdGF0ZSkge1xuICAgICAgLy8gU2V0IHRoZSBpbml0aWFsIHN0YXRlIGxvY2FsbHlcbiAgICAgIHRoaXMuX3N0YXRlID0gdGhpcy5vcHRpb25zLnN0YXRlO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuX3N0YXRlKSB7XG4gICAgICAvLyBTZXQgdGhlIGluaXRpYWwgc3RhdGUgbG9jYWxseVxuICAgICAgdGhpcy5fc3RhdGUgPSB0aGlzLmluaXRpYWxTdGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhIHN0YXRlIHRyYW5zaXRpb24gcHJlcGFyYXRpb25cbiAgICovXG4gIHB1YmxpYyBiZWZvcmVUcmFuc2l0aW9uKGZyb206IFN0YXRlIHwgKFN0YXRlIHwgc3RyaW5nKVtdLCB0bzogU3RhdGUsIGRhdGE6IFBheWxvYWQpOiB2b2lkIHtcbiAgICB0aGlzLmxvZ2dlci5zaWxseShgJHt0aGlzLm5hbWV9OiBsZWF2aW5nIHN0YXRlKHMpIFwiJHtBcnJheS5pc0FycmF5KGZyb20pID8gZnJvbS5qb2luKGBcIiwgXCJgKSA6IGZyb219XCJgLCB7IGRhdGEgfSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhIHN0YXRlIHRyYW5zaXRpb25cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgVGhlIHRyYW5zaXRpb24gcGF5bG9hZCBwYXNzZWQgdG8gdGhlIGZzbS5nb1RvKCkgbWV0aG9kLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIG9uVHJhbnNpdGlvbihmcm9tOiBTdGF0ZSB8IChTdGF0ZSB8IHN0cmluZylbXSwgdG86IFN0YXRlLCBkYXRhOiBQYXlsb2FkKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdGhpcy5sb2dnZXIuc2lsbHkoXG4gICAgICBgJHt0aGlzLm5hbWV9OiB0cmFuc2l0aW9uaW5nIHN0YXRlcyBcIiR7QXJyYXkuaXNBcnJheShmcm9tKSA/IGZyb20uam9pbihgXCIsIFwiYCkgOiBmcm9tfVwiID0+IFwiJHt0b31cImAsXG4gICAgICB7IGRhdGEgfVxuICAgICk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwb3N0IHRyYW5zaXRpb24gcmVzdWx0cy5cbiAgICovXG4gIHB1YmxpYyBhZnRlclRyYW5zaXRpb24oZnJvbTogU3RhdGUgfCAoU3RhdGUgfCBzdHJpbmcpW10sIHRvOiBTdGF0ZSwgZGF0YTogUGF5bG9hZCk6IHZvaWQge1xuICAgIHRoaXMubG9nZ2VyLnNpbGx5KGAke3RoaXMubmFtZX06IGVudGVyaW5nIFwiJHt0b31cImAsIHsgZGF0YSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCBhdmFpbGFibGUgYWN0aW9ucyB0byBnbyB0byBhIGRldGVybWluZWQgc3RhdGUuXG4gICAqXG4gICAqIEBwYXJhbSB0byBUaGUgZGVzaXJlZCBzdGF0ZVxuICAgKi9cbiAgcHVibGljIHBhdGhzVG8odG86IFN0YXRlKTogZmFsc2UgfCBBY3Rpb248SW5zdGFuY2UsIFN0YXRlPltdIHtcbiAgICBpZiAodG8gPT09IHRoaXMuc3RhdGUgJiYgIXRoaXMub3B0aW9ucy5hbGxvd1NhbWVTdGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0byA9PT0gdGhpcy5zdGF0ZSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIC8vIEdldCBhbGwgYXZhaWxhYmxlIGFjdGlvbnMgZnJvbSB0aGUgY3VycmVudCBtYWNoaW5lXG4gICAgY29uc3QgYWN0aW9ucyA9IHRoaXMuYWN0aW9ucy5maWx0ZXIoYWN0aW9uID0+IGFjdGlvbi5tYXRjaGVzKHRoaXMuc3RhdGUsIHRvKSk7XG5cbiAgICBpZiAoYWN0aW9ucyAmJiBhY3Rpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGFjdGlvbnM7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBjYW4gZ28gdG8gZGVzaXJlZCBzdGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHRvIFRoZSBkZXNpcmVkIHN0YXRlXG4gICAqL1xuICBwdWJsaWMgY2FuR29Ubyh0bzogU3RhdGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLnBhdGhzVG8odG8pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIHRoZSBpbnRlcm5hbCBzdGF0ZSBjaGFuZ2UgaW4gdGhlIG1hY2hpbmUuIFNob3VsZCBub3QgYmUgY2FsbGVkIGRpcmVjdGwsIHVzZSBcImdvVG9cIi5cbiAgICpcbiAgICogQHBhcmFtIHRvIFRoZSBkZXN0aW5hdGlvbiBzdGF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIGFzeW5jIHNldFN0YXRlKHRvOiBTdGF0ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIFNldCB0aGUgbmV4dCBzdGF0ZSBsb2NhbGx5XG4gICAgdGhpcy5fc3RhdGUgPSB0bztcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIG5ldyB0cmFuc2l0aW9uIGluIHRoZSBtYWNoaW5lLlxuICAgKlxuICAgKiBAcGFyYW0gdG8gVGhlIGRlc2lyZWQgc3RhdGVcbiAgICogQHBhcmFtIGRhdGEgQW4gb3B0aW9uYWwgcGF5bG9hZCB0byBiZSBwYXNzZWQgdG8gdGhlIG1hY2hpbmUgYWN0aW9uc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIGdvVG8odG86IFN0YXRlLCBkYXRhPzogUGF5bG9hZCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcblxuICAgIGlmICh0byA9PT0gc3RhdGUgJiYgIXRoaXMub3B0aW9ucy5hbGxvd1NhbWVTdGF0ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBNYWNoaW5lIGlzIGFscmVhZHkgaW4gXCIke3N0YXRlfVwiIHN0YXRlYCk7XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIHN0YXRlIGlzIHZhbGlkXG4gICAgaWYgKCF0aGlzLmlzVmFsaWRTdGF0ZSh0bykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBzdGF0ZTogXCIke3RvfVwiYCk7XG4gICAgfVxuXG4gICAgLy8gR2V0IGFsbCBhdmFpbGFibGUgYWN0aW9ucyBmcm9tIHRoZSBjdXJyZW50IG1hY2hpbmVcbiAgICBjb25zdCBhY3Rpb25zID0gdGhpcy5wYXRoc1RvKHRvKTtcblxuICAgIGlmIChhY3Rpb25zKSB7XG4gICAgICBjb25zdCBmcm9tcyA9IGFjdGlvbnMubGVuZ3RoID8gYWN0aW9ucy5yZWR1Y2UoXG4gICAgICAgIChzdGF0ZXMsIGFjdGlvbikgPT4ge1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFjdGlvbi5mcm9tKSkge1xuICAgICAgICAgICAgKGFjdGlvbi5mcm9tIGFzIFN0YXRlW10pLmZvckVhY2goc3RhdGUgPT4gc3RhdGVzLnB1c2goc3RhdGUpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhdGVzLnB1c2goYWN0aW9uLmZyb20pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBzdGF0ZXM7XG4gICAgICAgIH0sXG4gICAgICAgIFtdIGFzIChTdGF0ZSB8IHN0cmluZylbXVxuICAgICAgKSA6IHRoaXMuc3RhdGU7XG5cbiAgICAgIC8vIE5vdGlmeSB3ZSdyZSBsZWF2aW5nIHRoZSBjdXJyZW50IHN0YXRlXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChhY3Rpb25zLm1hcChhY3Rpb24gPT4gYWN0aW9uLmJlZm9yZVRyYW5zaXRpb24odGhpcy5pbnN0YW5jZSkpKTtcblxuICAgICAgLy8gUnVuIG93biBiZWZvcmVUcmFuc3Rpb25cbiAgICAgIGF3YWl0IHRoaXMuYmVmb3JlVHJhbnNpdGlvbihmcm9tcywgdG8sIGRhdGEpO1xuXG4gICAgICAvLyBUT0RPOiBSdW4gdGhpcyBpcyBzZXJpZXNcbiAgICAgIC8vIENoZWNrIGlmIHdlIGNhbiB0cmFuc2l0aW9uIHRvIHRoZSBuZXh0IHN0YXRlXG4gICAgICBjb25zdCBjb21wdXRlZERhdGEgPSB7IC4uLihkYXRhIHx8IHt9KSwgdG8sIGZyb206IHN0YXRlIH07XG4gICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwoYWN0aW9ucy5tYXAoYWN0aW9uID0+IGFjdGlvbi5vblRyYW5zaXRpb24odGhpcy5pbnN0YW5jZSwgY29tcHV0ZWREYXRhKSkpO1xuXG4gICAgICAvLyBSdW4gb3duIG9uVHJhbnN0aW9uXG4gICAgICByZXN1bHRzLnB1c2goYXdhaXQgdGhpcy5vblRyYW5zaXRpb24oZnJvbXMsIHRvLCBkYXRhKSk7XG5cbiAgICAgIGNvbnN0IG9rID0gcmVzdWx0cy5yZWR1Y2UoKGFnZ3IsIG5leHQpID0+IGFnZ3IgJiYgbmV4dCwgdHJ1ZSk7XG5cbiAgICAgIGlmIChvaykge1xuICAgICAgICBhd2FpdCB0aGlzLnNldFN0YXRlKHRvKTtcblxuICAgICAgICAvLyBOb3RpZnkgd2UncmUgZW50ZXJlZCB0aGUgbmV4dCBzdGF0ZVxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChhY3Rpb25zLm1hcChhY3Rpb24gPT4gYWN0aW9uLmFmdGVyVHJhbnNpdGlvbih0aGlzLmluc3RhbmNlKSkpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMuYWZ0ZXJUcmFuc2l0aW9uKGZyb21zLCB0bywgZGF0YSk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oYFRyYW5zaXRpb24gaW50ZXJydXB0ZWQ6IFwiJHtzdGF0ZX1cIiA9PiBcIiR7dG99XCJgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBhY3Rpb24gYXZhaWxhYmxlIHRvIHRyYW5zaXRpb24gZnJvbSBcIiR7c3RhdGV9XCIgdG8gXCIke3RvfVwiIHN0YXRlLmApO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19