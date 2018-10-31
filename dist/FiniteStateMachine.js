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
    beforeTransition(from, to) {
        this.logger.silly(`${this.name}: leaving states "${Array.isArray(from) ? from.join(`", "`) : from}"`);
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
    afterTransition(from, to) {
        this.logger.silly(`${this.name}: entering "${to}"`);
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
    setState(from, to, actions) {
        return __awaiter(this, void 0, void 0, function* () {
            // Set the next state locally
            this._state = to;
            // Notify we're entered the next state
            yield Promise.all(actions.map(action => action.afterTransition(this.instance)));
            yield this.afterTransition(from, to);
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
            else if (to === state) {
                yield this.setState(state, to, []);
                return true;
            }
            // Ensure state is valid
            if (!this.isValidState(to)) {
                throw new Error(`Invalid state: "${to}"`);
            }
            // Get all available actions from the current machine
            const actions = this.pathsTo(to);
            if (actions) {
                const froms = actions.reduce((states, action) => {
                    if (Array.isArray(action.from)) {
                        action.from.forEach(state => states.push(state));
                    }
                    else {
                        states.push(action.from);
                    }
                    return states;
                }, []);
                // Notify we're leaving the current state
                yield Promise.all(actions.map(action => action.beforeTransition(this.instance)));
                // Run own beforeTranstion
                yield this.beforeTransition(froms, to);
                // TODO: Run this is series
                // Check if we can transition to the next state
                const computedData = Object.assign({}, (data || {}), { to, from: state });
                const results = yield Promise.all(actions.map(action => action.onTransition(this.instance, computedData)));
                // Run own onTranstion
                results.push(yield this.onTransition(froms, to, data));
                const ok = results.reduce((aggr, next) => aggr && next, true);
                if (ok) {
                    yield this.setState(froms, to, actions);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmluaXRlU3RhdGVNYWNoaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0Zpbml0ZVN0YXRlTWFjaGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkRBQTZDO0FBVTdDOztHQUVHO0FBQ0gsTUFBOEIsR0FBRztJQVEvQixZQUFtQixRQUFrQixFQUFZLFVBQTZCLEVBQUU7UUFBN0QsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFZLFlBQU8sR0FBUCxPQUFPLENBQXdCO1FBQzlFLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQy9ELElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLDRCQUFNLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFlBQVksQ0FBQyxLQUFZO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsS0FBSztRQUNkLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNoRixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDbkU7YUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDckYs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Q0FBQyxJQUFJLENBQUMsNEJBQTRCLEtBQUssU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ25FO2lCQUFNO2dCQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLEtBQUssU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQ3hGO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO0tBQUE7Q0FDRjtBQTNMRCxzQkEyTEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IEFjdGlvbiwgeyBUcmFuc2l0aW9uRGF0YSB9IGZyb20gXCIuL0FjdGlvblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZTTU9wdGlvbnM8U3RhdGU+IHtcbiAgbmFtZT86IHN0cmluZztcbiAgc3RhdGU/OiBTdGF0ZTtcbiAgbG9nZ2VyPzogTG9nZ2VyO1xuICBhbGxvd1NhbWVTdGF0ZT86IGJvb2xlYW47XG59XG5cbi8qKlxuICogVGhlIG1haW4gRmluaXRlIFN0YXRlIE1hY2hpbmUgbWFuYWdlciwgdGhhdCBob2xkcyBhbGwgYXZhaWxhYmxlIGFjdGlvbnMgYW5kIHBlcmZvcm1zIHRoZSBzdGF0ZSB0cmFuc2l0aW9ucy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgRlNNPEluc3RhbmNlLCBTdGF0ZSwgUGF5bG9hZCA9IGFueT4ge1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYWN0aW9uczogQWN0aW9uPEluc3RhbmNlLCBTdGF0ZSwgUGF5bG9hZD5bXTtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IGluaXRpYWxTdGF0ZTogU3RhdGU7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBzdGF0ZXM6IFN0YXRlW107XG4gIHByb3RlY3RlZCBsb2dnZXI6IExvZ2dlcjtcbiAgcHJvdGVjdGVkIF9zdGF0ZTogU3RhdGU7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGluc3RhbmNlOiBJbnN0YW5jZSwgcHJvdGVjdGVkIG9wdGlvbnM6IEZTTU9wdGlvbnM8U3RhdGU+ID0ge30pIHtcbiAgICB0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWUgfHwgdGhpcy5uYW1lIHx8IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IG5ldyBMb2dnZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbnN1cmVzIHRoZSBzdGF0ZSBkZXNpcmVkIGlzIHZhbGlkIGFuZCByZWdpc3RlcmVkIGluIHRoZSBtYWNoaW5lLlxuICAgKlxuICAgKiBAcGFyYW0gc3RhdGUgVGhlIHN0YXRlIHRvIGJlIGNoZWNrZWRcbiAgICovXG4gIGlzVmFsaWRTdGF0ZShzdGF0ZTogU3RhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZXMuaW5kZXhPZihzdGF0ZSkgPj0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY3VycmVudCBtYWNoaW5lIHN0YXRlLlxuICAgKi9cbiAgcHVibGljIGdldCBzdGF0ZSgpOiBTdGF0ZSB7XG4gICAgLy8gRW5zdXJlIHN0YXRlIGlzIHZhbGlkXG4gICAgaWYgKCF0aGlzLl9zdGF0ZSAmJiB0aGlzLm9wdGlvbnMuc3RhdGUgJiYgIXRoaXMuaXNWYWxpZFN0YXRlKHRoaXMub3B0aW9ucy5zdGF0ZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBpbml0aWFsIHN0YXRlOiBcIiR7dGhpcy5vcHRpb25zLnN0YXRlfVwiYCk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5fc3RhdGUgJiYgdGhpcy5pbml0aWFsU3RhdGUgJiYgIXRoaXMuaXNWYWxpZFN0YXRlKHRoaXMuaW5pdGlhbFN0YXRlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGluaXRpYWwgc3RhdGU6IFwiJHt0aGlzLmluaXRpYWxTdGF0ZX1cImApO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuX3N0YXRlICYmIHRoaXMub3B0aW9ucy5zdGF0ZSkge1xuICAgICAgLy8gU2V0IHRoZSBpbml0aWFsIHN0YXRlIGxvY2FsbHlcbiAgICAgIHRoaXMuX3N0YXRlID0gdGhpcy5vcHRpb25zLnN0YXRlO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuX3N0YXRlKSB7XG4gICAgICAvLyBTZXQgdGhlIGluaXRpYWwgc3RhdGUgbG9jYWxseVxuICAgICAgdGhpcy5fc3RhdGUgPSB0aGlzLmluaXRpYWxTdGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhIHN0YXRlIHRyYW5zaXRpb24gcHJlcGFyYXRpb25cbiAgICovXG4gIHB1YmxpYyBiZWZvcmVUcmFuc2l0aW9uKGZyb206IFN0YXRlIHwgKFN0YXRlIHwgc3RyaW5nKVtdLCB0bzogU3RhdGUpOiB2b2lkIHtcbiAgICB0aGlzLmxvZ2dlci5zaWxseShgJHt0aGlzLm5hbWV9OiBsZWF2aW5nIHN0YXRlcyBcIiR7QXJyYXkuaXNBcnJheShmcm9tKSA/IGZyb20uam9pbihgXCIsIFwiYCkgOiBmcm9tfVwiYCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhIHN0YXRlIHRyYW5zaXRpb25cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgVGhlIHRyYW5zaXRpb24gcGF5bG9hZCBwYXNzZWQgdG8gdGhlIGZzbS5nb1RvKCkgbWV0aG9kLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIG9uVHJhbnNpdGlvbihmcm9tOiBTdGF0ZSB8IChTdGF0ZSB8IHN0cmluZylbXSwgdG86IFN0YXRlLCBkYXRhOiBQYXlsb2FkKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdGhpcy5sb2dnZXIuc2lsbHkoXG4gICAgICBgJHt0aGlzLm5hbWV9OiB0cmFuc2l0aW9uaW5nIHN0YXRlcyBcIiR7QXJyYXkuaXNBcnJheShmcm9tKSA/IGZyb20uam9pbihgXCIsIFwiYCkgOiBmcm9tfVwiID0+IFwiJHt0b31cImAsXG4gICAgICB7IGRhdGEgfVxuICAgICk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwb3N0IHRyYW5zaXRpb24gcmVzdWx0cy5cbiAgICovXG4gIHB1YmxpYyBhZnRlclRyYW5zaXRpb24oZnJvbTogU3RhdGUgfCAoU3RhdGUgfCBzdHJpbmcpW10sIHRvOiBTdGF0ZSk6IHZvaWQge1xuICAgIHRoaXMubG9nZ2VyLnNpbGx5KGAke3RoaXMubmFtZX06IGVudGVyaW5nIFwiJHt0b31cImApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIGF2YWlsYWJsZSBhY3Rpb25zIHRvIGdvIHRvIGEgZGV0ZXJtaW5lZCBzdGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHRvIFRoZSBkZXNpcmVkIHN0YXRlXG4gICAqL1xuICBwdWJsaWMgcGF0aHNUbyh0bzogU3RhdGUpOiBmYWxzZSB8IEFjdGlvbjxJbnN0YW5jZSwgU3RhdGU+W10ge1xuICAgIGlmICh0byA9PT0gdGhpcy5zdGF0ZSAmJiAhdGhpcy5vcHRpb25zLmFsbG93U2FtZVN0YXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRvID09PSB0aGlzLnN0YXRlKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgLy8gR2V0IGFsbCBhdmFpbGFibGUgYWN0aW9ucyBmcm9tIHRoZSBjdXJyZW50IG1hY2hpbmVcbiAgICBjb25zdCBhY3Rpb25zID0gdGhpcy5hY3Rpb25zLmZpbHRlcihhY3Rpb24gPT4gYWN0aW9uLm1hdGNoZXModGhpcy5zdGF0ZSwgdG8pKTtcblxuICAgIGlmIChhY3Rpb25zICYmIGFjdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gYWN0aW9ucztcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGNhbiBnbyB0byBkZXNpcmVkIHN0YXRlLlxuICAgKlxuICAgKiBAcGFyYW0gdG8gVGhlIGRlc2lyZWQgc3RhdGVcbiAgICovXG4gIHB1YmxpYyBjYW5Hb1RvKHRvOiBTdGF0ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMucGF0aHNUbyh0byk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgdGhlIGludGVybmFsIHN0YXRlIGNoYW5nZSBpbiB0aGUgbWFjaGluZS4gU2hvdWxkIG5vdCBiZSBjYWxsZWQgZGlyZWN0bCwgdXNlIFwiZ29Ub1wiLlxuICAgKlxuICAgKiBAcGFyYW0gdG8gVGhlIGRlc3RpbmF0aW9uIHN0YXRlXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgc2V0U3RhdGUoXG4gICAgZnJvbTogU3RhdGUgfCAoU3RhdGUgfCBzdHJpbmcpW10sXG4gICAgdG86IFN0YXRlLFxuICAgIGFjdGlvbnM6IEFjdGlvbjxJbnN0YW5jZSwgU3RhdGU+W11cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gU2V0IHRoZSBuZXh0IHN0YXRlIGxvY2FsbHlcbiAgICB0aGlzLl9zdGF0ZSA9IHRvO1xuXG4gICAgLy8gTm90aWZ5IHdlJ3JlIGVudGVyZWQgdGhlIG5leHQgc3RhdGVcbiAgICBhd2FpdCBQcm9taXNlLmFsbChhY3Rpb25zLm1hcChhY3Rpb24gPT4gYWN0aW9uLmFmdGVyVHJhbnNpdGlvbih0aGlzLmluc3RhbmNlKSkpO1xuICAgIGF3YWl0IHRoaXMuYWZ0ZXJUcmFuc2l0aW9uKGZyb20sIHRvKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIG5ldyB0cmFuc2l0aW9uIGluIHRoZSBtYWNoaW5lLlxuICAgKlxuICAgKiBAcGFyYW0gdG8gVGhlIGRlc2lyZWQgc3RhdGVcbiAgICogQHBhcmFtIGRhdGEgQW4gb3B0aW9uYWwgcGF5bG9hZCB0byBiZSBwYXNzZWQgdG8gdGhlIG1hY2hpbmUgYWN0aW9uc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIGdvVG8odG86IFN0YXRlLCBkYXRhPzogUGF5bG9hZCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcblxuICAgIGlmICh0byA9PT0gc3RhdGUgJiYgIXRoaXMub3B0aW9ucy5hbGxvd1NhbWVTdGF0ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBNYWNoaW5lIGlzIGFscmVhZHkgaW4gXCIke3N0YXRlfVwiIHN0YXRlYCk7XG4gICAgfSBlbHNlIGlmICh0byA9PT0gc3RhdGUpIHtcbiAgICAgIGF3YWl0IHRoaXMuc2V0U3RhdGUoc3RhdGUsIHRvLCBbXSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgc3RhdGUgaXMgdmFsaWRcbiAgICBpZiAoIXRoaXMuaXNWYWxpZFN0YXRlKHRvKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHN0YXRlOiBcIiR7dG99XCJgKTtcbiAgICB9XG5cbiAgICAvLyBHZXQgYWxsIGF2YWlsYWJsZSBhY3Rpb25zIGZyb20gdGhlIGN1cnJlbnQgbWFjaGluZVxuICAgIGNvbnN0IGFjdGlvbnMgPSB0aGlzLnBhdGhzVG8odG8pO1xuXG4gICAgaWYgKGFjdGlvbnMpIHtcbiAgICAgIGNvbnN0IGZyb21zID0gYWN0aW9ucy5yZWR1Y2UoXG4gICAgICAgIChzdGF0ZXMsIGFjdGlvbikgPT4ge1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFjdGlvbi5mcm9tKSkge1xuICAgICAgICAgICAgKGFjdGlvbi5mcm9tIGFzIFN0YXRlW10pLmZvckVhY2goc3RhdGUgPT4gc3RhdGVzLnB1c2goc3RhdGUpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhdGVzLnB1c2goYWN0aW9uLmZyb20pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBzdGF0ZXM7XG4gICAgICAgIH0sXG4gICAgICAgIFtdIGFzIChTdGF0ZSB8IHN0cmluZylbXVxuICAgICAgKTtcblxuICAgICAgLy8gTm90aWZ5IHdlJ3JlIGxlYXZpbmcgdGhlIGN1cnJlbnQgc3RhdGVcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGFjdGlvbnMubWFwKGFjdGlvbiA9PiBhY3Rpb24uYmVmb3JlVHJhbnNpdGlvbih0aGlzLmluc3RhbmNlKSkpO1xuXG4gICAgICAvLyBSdW4gb3duIGJlZm9yZVRyYW5zdGlvblxuICAgICAgYXdhaXQgdGhpcy5iZWZvcmVUcmFuc2l0aW9uKGZyb21zLCB0byk7XG5cbiAgICAgIC8vIFRPRE86IFJ1biB0aGlzIGlzIHNlcmllc1xuICAgICAgLy8gQ2hlY2sgaWYgd2UgY2FuIHRyYW5zaXRpb24gdG8gdGhlIG5leHQgc3RhdGVcbiAgICAgIGNvbnN0IGNvbXB1dGVkRGF0YSA9IHsgLi4uKGRhdGEgfHwge30pLCB0bywgZnJvbTogc3RhdGUgfTtcbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbChhY3Rpb25zLm1hcChhY3Rpb24gPT4gYWN0aW9uLm9uVHJhbnNpdGlvbih0aGlzLmluc3RhbmNlLCBjb21wdXRlZERhdGEpKSk7XG5cbiAgICAgIC8vIFJ1biBvd24gb25UcmFuc3Rpb25cbiAgICAgIHJlc3VsdHMucHVzaChhd2FpdCB0aGlzLm9uVHJhbnNpdGlvbihmcm9tcywgdG8sIGRhdGEpKTtcblxuICAgICAgY29uc3Qgb2sgPSByZXN1bHRzLnJlZHVjZSgoYWdnciwgbmV4dCkgPT4gYWdnciAmJiBuZXh0LCB0cnVlKTtcblxuICAgICAgaWYgKG9rKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc2V0U3RhdGUoZnJvbXMsIHRvLCBhY3Rpb25zKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgVHJhbnNpdGlvbiBpbnRlcnJ1cHRlZDogXCIke3N0YXRlfVwiID0+IFwiJHt0b31cImApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGFjdGlvbiBhdmFpbGFibGUgdG8gdHJhbnNpdGlvbiBmcm9tIFwiJHtzdGF0ZX1cIiB0byBcIiR7dG99XCIgc3RhdGUuYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=