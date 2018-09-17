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
        this._state = options.state;
        this.logger = options.logger || new ts_framework_common_1.Logger();
    }
    /**
     * Get current machine state.
     */
    get state() {
        this._state = this._state || this.initialState;
        return this._state;
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
        else if (to === this.state) {
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
     * Performs the internal state change in the machine, without validations. Should not be called directl, use "goTo".
     *
     * @param to The destination state
     */
    setState(to, actions) {
        return __awaiter(this, void 0, void 0, function* () {
            // Set the next state locally
            this._state = to;
            // Notify we're entered the next state
            yield Promise.all(actions.map(action => action.afterTransition(this.instance)));
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
            if (to === this.state && !this.options.allowSameState) {
                throw new Error(`Machine is already in "${this.state}" state`);
            }
            else if (to === this.state) {
                yield this.setState(to, []);
                return true;
            }
            // Get all available actions from the current machine
            const actions = this.pathsTo(to);
            if (actions) {
                // Notify we're leaving the current state
                yield Promise.all(actions.map(action => action.beforeTransition(this.instance)));
                // TODO: Run this is series
                // Check if we can transition to the next state
                const computedData = Object.assign({}, data, { to, from: this.state });
                const results = yield Promise.all(actions.map(action => action.onTransition(this.instance, computedData)));
                const ok = results.reduce((aggr, next) => aggr && next, true);
                if (ok) {
                    yield this.setState(to, actions);
                    return true;
                }
                else {
                    this.logger.info(`Transition interrupted: "${this.state}" => "${to}"`);
                }
                // No transition available
            }
            else {
                throw new Error(`No action available to transition from "${this.state}" to "${to}" state.`);
            }
            return false;
        });
    }
}
exports.default = FSM;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmluaXRlU3RhdGVNYWNoaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0Zpbml0ZVN0YXRlTWFjaGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkRBQTZDO0FBUzdDOztHQUVHO0FBQ0gsTUFBOEIsR0FBRztJQU0vQixZQUFtQixRQUFrQixFQUFZLFVBQTZCLEVBQUU7UUFBN0QsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFZLFlBQU8sR0FBUCxPQUFPLENBQXdCO1FBQzlFLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSw0QkFBTSxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxLQUFLO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDL0MsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksT0FBTyxDQUFDLEVBQVM7UUFDdEIsSUFBSSxFQUFFLEtBQUssSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFO1lBQ3JELE9BQU8sS0FBSyxDQUFDO1NBQ2Q7YUFBTSxJQUFHLEVBQUUsS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzNCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxxREFBcUQ7UUFDckQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUU5RSxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQzdCLE9BQU8sT0FBTyxDQUFDO1NBQ2hCO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE9BQU8sQ0FBQyxFQUFTO1FBQ3RCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDYSxRQUFRLENBQUMsRUFBUyxFQUFFLE9BQWtDOztZQUNwRSw2QkFBNkI7WUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFFakIsc0NBQXNDO1lBQ3RDLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ1UsSUFBSSxDQUFDLEVBQVMsRUFBRSxJQUFVOztZQUNyQyxJQUFJLEVBQUUsS0FBSyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUU7Z0JBQ3JELE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLElBQUksQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDO2FBQ2hFO2lCQUFNLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQzVCLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzVCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxxREFBcUQ7WUFDckQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVqQyxJQUFJLE9BQU8sRUFBRTtnQkFDWCx5Q0FBeUM7Z0JBQ3pDLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRWpGLDJCQUEyQjtnQkFDM0IsK0NBQStDO2dCQUMvQyxNQUFNLFlBQVkscUJBQVEsSUFBSSxJQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRSxDQUFDO2dCQUN2RCxNQUFNLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNHLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUU5RCxJQUFJLEVBQUUsRUFBRTtvQkFDTixNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUNqQyxPQUFPLElBQUksQ0FBQztpQkFDYjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUN4RTtnQkFDRCwwQkFBMEI7YUFDM0I7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQzdGO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO0tBQUE7Q0FDRjtBQXZHRCxzQkF1R0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IEFjdGlvbiBmcm9tIFwiLi9BY3Rpb25cIjtcblxuZXhwb3J0IGludGVyZmFjZSBGU01PcHRpb25zPFN0YXRlPiB7XG4gIHN0YXRlPzogU3RhdGU7XG4gIGxvZ2dlcj86IExvZ2dlcjtcbiAgYWxsb3dTYW1lU3RhdGU/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIFRoZSBtYWluIEZpbml0ZSBTdGF0ZSBNYWNoaW5lIG1hbmFnZXIsIHRoYXQgaG9sZHMgYWxsIGF2YWlsYWJsZSBhY3Rpb25zIGFuZCBwZXJmb3JtcyB0aGUgc3RhdGUgdHJhbnNpdGlvbnMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEZTTTxJbnN0YW5jZSwgU3RhdGU+IHtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IGFjdGlvbnM6IEFjdGlvbjxJbnN0YW5jZSwgU3RhdGU+W107XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBpbml0aWFsU3RhdGU6IFN0YXRlO1xuICBwcm90ZWN0ZWQgbG9nZ2VyOiBMb2dnZXI7XG4gIHByb3RlY3RlZCBfc3RhdGU6IFN0YXRlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpbnN0YW5jZTogSW5zdGFuY2UsIHByb3RlY3RlZCBvcHRpb25zOiBGU01PcHRpb25zPFN0YXRlPiA9IHt9KSB7XG4gICAgdGhpcy5fc3RhdGUgPSBvcHRpb25zLnN0YXRlO1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgbmV3IExvZ2dlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjdXJyZW50IG1hY2hpbmUgc3RhdGUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHN0YXRlKCk6IFN0YXRlIHtcbiAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuX3N0YXRlIHx8IHRoaXMuaW5pdGlhbFN0YXRlO1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCBhdmFpbGFibGUgYWN0aW9ucyB0byBnbyB0byBhIGRldGVybWluZWQgc3RhdGUuXG4gICAqIFxuICAgKiBAcGFyYW0gdG8gVGhlIGRlc2lyZWQgc3RhdGVcbiAgICovXG4gIHB1YmxpYyBwYXRoc1RvKHRvOiBTdGF0ZSk6IGZhbHNlIHwgQWN0aW9uPEluc3RhbmNlLCBTdGF0ZT5bXSB7XG4gICAgaWYgKHRvID09PSB0aGlzLnN0YXRlICYmICF0aGlzLm9wdGlvbnMuYWxsb3dTYW1lU3RhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYodG8gPT09IHRoaXMuc3RhdGUpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICAvLyBHZXQgYWxsIGF2YWlsYWJsZSBhY3Rpb25zIGZyb20gdGhlIGN1cnJlbnQgbWFjaGluZVxuICAgIGNvbnN0IGFjdGlvbnMgPSB0aGlzLmFjdGlvbnMuZmlsdGVyKGFjdGlvbiA9PiBhY3Rpb24ubWF0Y2hlcyh0aGlzLnN0YXRlLCB0bykpO1xuXG4gICAgaWYgKGFjdGlvbnMgJiYgYWN0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBhY3Rpb25zO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgY2FuIGdvIHRvIGRlc2lyZWQgc3RhdGUuXG4gICAqIFxuICAgKiBAcGFyYW0gdG8gVGhlIGRlc2lyZWQgc3RhdGVcbiAgICovXG4gIHB1YmxpYyBjYW5Hb1RvKHRvOiBTdGF0ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMucGF0aHNUbyh0byk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgdGhlIGludGVybmFsIHN0YXRlIGNoYW5nZSBpbiB0aGUgbWFjaGluZSwgd2l0aG91dCB2YWxpZGF0aW9ucy4gU2hvdWxkIG5vdCBiZSBjYWxsZWQgZGlyZWN0bCwgdXNlIFwiZ29Ub1wiLlxuICAgKiBcbiAgICogQHBhcmFtIHRvIFRoZSBkZXN0aW5hdGlvbiBzdGF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIGFzeW5jIHNldFN0YXRlKHRvOiBTdGF0ZSwgYWN0aW9uczogQWN0aW9uPEluc3RhbmNlLCBTdGF0ZT5bXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIFNldCB0aGUgbmV4dCBzdGF0ZSBsb2NhbGx5XG4gICAgdGhpcy5fc3RhdGUgPSB0bztcblxuICAgIC8vIE5vdGlmeSB3ZSdyZSBlbnRlcmVkIHRoZSBuZXh0IHN0YXRlXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoYWN0aW9ucy5tYXAoYWN0aW9uID0+IGFjdGlvbi5hZnRlclRyYW5zaXRpb24odGhpcy5pbnN0YW5jZSkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIG5ldyB0cmFuc2l0aW9uIGluIHRoZSBtYWNoaW5lLlxuICAgKiBcbiAgICogQHBhcmFtIHRvIFRoZSBkZXNpcmVkIHN0YXRlXG4gICAqIEBwYXJhbSBkYXRhIEFuIG9wdGlvbmFsIHBheWxvYWQgdG8gYmUgcGFzc2VkIHRvIHRoZSBtYWNoaW5lIGFjdGlvbnNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBnb1RvKHRvOiBTdGF0ZSwgZGF0YT86IGFueSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICh0byA9PT0gdGhpcy5zdGF0ZSAmJiAhdGhpcy5vcHRpb25zLmFsbG93U2FtZVN0YXRlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE1hY2hpbmUgaXMgYWxyZWFkeSBpbiBcIiR7dGhpcy5zdGF0ZX1cIiBzdGF0ZWApO1xuICAgIH0gZWxzZSBpZiAodG8gPT09IHRoaXMuc3RhdGUpIHtcbiAgICAgIGF3YWl0IHRoaXMuc2V0U3RhdGUodG8sIFtdKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEdldCBhbGwgYXZhaWxhYmxlIGFjdGlvbnMgZnJvbSB0aGUgY3VycmVudCBtYWNoaW5lXG4gICAgY29uc3QgYWN0aW9ucyA9IHRoaXMucGF0aHNUbyh0byk7XG5cbiAgICBpZiAoYWN0aW9ucykge1xuICAgICAgLy8gTm90aWZ5IHdlJ3JlIGxlYXZpbmcgdGhlIGN1cnJlbnQgc3RhdGVcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGFjdGlvbnMubWFwKGFjdGlvbiA9PiBhY3Rpb24uYmVmb3JlVHJhbnNpdGlvbih0aGlzLmluc3RhbmNlKSkpO1xuXG4gICAgICAvLyBUT0RPOiBSdW4gdGhpcyBpcyBzZXJpZXNcbiAgICAgIC8vIENoZWNrIGlmIHdlIGNhbiB0cmFuc2l0aW9uIHRvIHRoZSBuZXh0IHN0YXRlXG4gICAgICBjb25zdCBjb21wdXRlZERhdGEgPSB7IC4uLmRhdGEsIHRvLCBmcm9tOiB0aGlzLnN0YXRlIH07XG4gICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwoYWN0aW9ucy5tYXAoYWN0aW9uID0+IGFjdGlvbi5vblRyYW5zaXRpb24odGhpcy5pbnN0YW5jZSwgY29tcHV0ZWREYXRhKSkpO1xuICAgICAgY29uc3Qgb2sgPSByZXN1bHRzLnJlZHVjZSgoYWdnciwgbmV4dCkgPT4gYWdnciAmJiBuZXh0LCB0cnVlKTtcblxuICAgICAgaWYgKG9rKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc2V0U3RhdGUodG8sIGFjdGlvbnMpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYFRyYW5zaXRpb24gaW50ZXJydXB0ZWQ6IFwiJHt0aGlzLnN0YXRlfVwiID0+IFwiJHt0b31cImApO1xuICAgICAgfVxuICAgICAgLy8gTm8gdHJhbnNpdGlvbiBhdmFpbGFibGVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBhY3Rpb24gYXZhaWxhYmxlIHRvIHRyYW5zaXRpb24gZnJvbSBcIiR7dGhpcy5zdGF0ZX1cIiB0byBcIiR7dG99XCIgc3RhdGUuYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=