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
            const state = this.state;
            if (to === state && !this.options.allowSameState) {
                throw new Error(`Machine is already in "${state}" state`);
            }
            else if (to === state) {
                yield this.setState(to, []);
                return true;
            }
            // Ensure state is valid
            if (!this.isValidState(to)) {
                throw new Error(`Invalid state: "${to}"`);
            }
            // Get all available actions from the current machine
            const actions = this.pathsTo(to);
            if (actions) {
                // Notify we're leaving the current state
                yield Promise.all(actions.map(action => action.beforeTransition(this.instance)));
                // TODO: Run this is series
                // Check if we can transition to the next state
                const computedData = Object.assign({}, (data || {}), { to, from: state });
                const results = yield Promise.all(actions.map(action => action.onTransition(this.instance, computedData)));
                const ok = results.reduce((aggr, next) => aggr && next, true);
                if (ok) {
                    yield this.setState(to, actions);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmluaXRlU3RhdGVNYWNoaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0Zpbml0ZVN0YXRlTWFjaGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkRBQTZDO0FBUzdDOztHQUVHO0FBQ0gsTUFBOEIsR0FBRztJQU8vQixZQUFtQixRQUFrQixFQUFZLFVBQTZCLEVBQUU7UUFBN0QsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFZLFlBQU8sR0FBUCxPQUFPLENBQXdCO1FBQzlFLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLDRCQUFNLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFlBQVksQ0FBQyxLQUFZO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsS0FBSztRQUNkLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNoRixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUE7U0FDbEU7YUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDckYsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUE7U0FDakU7YUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFB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LEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxHQUFFLENBQUM7Z0JBQzFELE1BQU0sT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0csTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRTlELElBQUksRUFBRSxFQUFFO29CQUNOLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ2pDLE9BQU8sSUFBSSxDQUFDO2lCQUNiO2dCQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixLQUFLLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNuRTtpQkFBTTtnQkFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxLQUFLLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUN4RjtZQUVELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztLQUFBO0NBQ0Y7QUFwSUQsc0JBb0lDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCBBY3Rpb24gZnJvbSBcIi4vQWN0aW9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRlNNT3B0aW9uczxTdGF0ZT4ge1xuICBzdGF0ZT86IFN0YXRlO1xuICBsb2dnZXI/OiBMb2dnZXI7XG4gIGFsbG93U2FtZVN0YXRlPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBUaGUgbWFpbiBGaW5pdGUgU3RhdGUgTWFjaGluZSBtYW5hZ2VyLCB0aGF0IGhvbGRzIGFsbCBhdmFpbGFibGUgYWN0aW9ucyBhbmQgcGVyZm9ybXMgdGhlIHN0YXRlIHRyYW5zaXRpb25zLlxuICovXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBGU008SW5zdGFuY2UsIFN0YXRlLCBQYXlsb2FkID0gYW55PiB7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhY3Rpb25zOiBBY3Rpb248SW5zdGFuY2UsIFN0YXRlLCBQYXlsb2FkPltdO1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgaW5pdGlhbFN0YXRlOiBTdGF0ZTtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHN0YXRlczogU3RhdGVbXTtcbiAgcHJvdGVjdGVkIGxvZ2dlcjogTG9nZ2VyO1xuICBwcm90ZWN0ZWQgX3N0YXRlOiBTdGF0ZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5zdGFuY2U6IEluc3RhbmNlLCBwcm90ZWN0ZWQgb3B0aW9uczogRlNNT3B0aW9uczxTdGF0ZT4gPSB7fSkge1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgbmV3IExvZ2dlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZXMgdGhlIHN0YXRlIGRlc2lyZWQgaXMgdmFsaWQgYW5kIHJlZ2lzdGVyZWQgaW4gdGhlIG1hY2hpbmUuXG4gICAqIFxuICAgKiBAcGFyYW0gc3RhdGUgVGhlIHN0YXRlIHRvIGJlIGNoZWNrZWRcbiAgICovXG4gIGlzVmFsaWRTdGF0ZShzdGF0ZTogU3RhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZXMuaW5kZXhPZihzdGF0ZSkgPj0gMFxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjdXJyZW50IG1hY2hpbmUgc3RhdGUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHN0YXRlKCk6IFN0YXRlIHtcbiAgICAvLyBFbnN1cmUgc3RhdGUgaXMgdmFsaWRcbiAgICBpZiAoIXRoaXMuX3N0YXRlICYmIHRoaXMub3B0aW9ucy5zdGF0ZSAmJiAhdGhpcy5pc1ZhbGlkU3RhdGUodGhpcy5vcHRpb25zLnN0YXRlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGluaXRpYWwgc3RhdGU6IFwiJHt0aGlzLm9wdGlvbnMuc3RhdGV9XCJgKVxuICAgIH0gZWxzZSBpZiAoIXRoaXMuX3N0YXRlICYmIHRoaXMuaW5pdGlhbFN0YXRlICYmICF0aGlzLmlzVmFsaWRTdGF0ZSh0aGlzLmluaXRpYWxTdGF0ZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBpbml0aWFsIHN0YXRlOiBcIiR7dGhpcy5pbml0aWFsU3RhdGV9XCJgKVxuICAgIH0gZWxzZSBpZiAoIXRoaXMuX3N0YXRlICYmIHRoaXMub3B0aW9ucy5zdGF0ZSkge1xuICAgICAgLy8gU2V0IHRoZSBpbml0aWFsIHN0YXRlIGxvY2FsbHlcbiAgICAgIHRoaXMuX3N0YXRlID0gdGhpcy5vcHRpb25zLnN0YXRlO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuX3N0YXRlKSB7XG4gICAgICAvLyBTZXQgdGhlIGluaXRpYWwgc3RhdGUgbG9jYWxseVxuICAgICAgdGhpcy5fc3RhdGUgPSB0aGlzLmluaXRpYWxTdGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgYXZhaWxhYmxlIGFjdGlvbnMgdG8gZ28gdG8gYSBkZXRlcm1pbmVkIHN0YXRlLlxuICAgKiBcbiAgICogQHBhcmFtIHRvIFRoZSBkZXNpcmVkIHN0YXRlXG4gICAqL1xuICBwdWJsaWMgcGF0aHNUbyh0bzogU3RhdGUpOiBmYWxzZSB8IEFjdGlvbjxJbnN0YW5jZSwgU3RhdGU+W10ge1xuICAgIGlmICh0byA9PT0gdGhpcy5zdGF0ZSAmJiAhdGhpcy5vcHRpb25zLmFsbG93U2FtZVN0YXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRvID09PSB0aGlzLnN0YXRlKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgLy8gR2V0IGFsbCBhdmFpbGFibGUgYWN0aW9ucyBmcm9tIHRoZSBjdXJyZW50IG1hY2hpbmVcbiAgICBjb25zdCBhY3Rpb25zID0gdGhpcy5hY3Rpb25zLmZpbHRlcihhY3Rpb24gPT4gYWN0aW9uLm1hdGNoZXModGhpcy5zdGF0ZSwgdG8pKTtcblxuICAgIGlmIChhY3Rpb25zICYmIGFjdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gYWN0aW9ucztcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGNhbiBnbyB0byBkZXNpcmVkIHN0YXRlLlxuICAgKiBcbiAgICogQHBhcmFtIHRvIFRoZSBkZXNpcmVkIHN0YXRlXG4gICAqL1xuICBwdWJsaWMgY2FuR29Ubyh0bzogU3RhdGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLnBhdGhzVG8odG8pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIHRoZSBpbnRlcm5hbCBzdGF0ZSBjaGFuZ2UgaW4gdGhlIG1hY2hpbmUuIFNob3VsZCBub3QgYmUgY2FsbGVkIGRpcmVjdGwsIHVzZSBcImdvVG9cIi5cbiAgICogXG4gICAqIEBwYXJhbSB0byBUaGUgZGVzdGluYXRpb24gc3RhdGVcbiAgICovXG4gIHByb3RlY3RlZCBhc3luYyBzZXRTdGF0ZSh0bzogU3RhdGUsIGFjdGlvbnM6IEFjdGlvbjxJbnN0YW5jZSwgU3RhdGU+W10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBTZXQgdGhlIG5leHQgc3RhdGUgbG9jYWxseVxuICAgIHRoaXMuX3N0YXRlID0gdG87XG5cbiAgICAvLyBOb3RpZnkgd2UncmUgZW50ZXJlZCB0aGUgbmV4dCBzdGF0ZVxuICAgIGF3YWl0IFByb21pc2UuYWxsKGFjdGlvbnMubWFwKGFjdGlvbiA9PiBhY3Rpb24uYWZ0ZXJUcmFuc2l0aW9uKHRoaXMuaW5zdGFuY2UpKSk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBuZXcgdHJhbnNpdGlvbiBpbiB0aGUgbWFjaGluZS5cbiAgICogXG4gICAqIEBwYXJhbSB0byBUaGUgZGVzaXJlZCBzdGF0ZVxuICAgKiBAcGFyYW0gZGF0YSBBbiBvcHRpb25hbCBwYXlsb2FkIHRvIGJlIHBhc3NlZCB0byB0aGUgbWFjaGluZSBhY3Rpb25zXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ29Ubyh0bzogU3RhdGUsIGRhdGE/OiBQYXlsb2FkKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuXG4gICAgaWYgKHRvID09PSBzdGF0ZSAmJiAhdGhpcy5vcHRpb25zLmFsbG93U2FtZVN0YXRlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE1hY2hpbmUgaXMgYWxyZWFkeSBpbiBcIiR7c3RhdGV9XCIgc3RhdGVgKTtcbiAgICB9IGVsc2UgaWYgKHRvID09PSBzdGF0ZSkge1xuICAgICAgYXdhaXQgdGhpcy5zZXRTdGF0ZSh0bywgW10pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIHN0YXRlIGlzIHZhbGlkXG4gICAgaWYgKCF0aGlzLmlzVmFsaWRTdGF0ZSh0bykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBzdGF0ZTogXCIke3RvfVwiYClcbiAgICB9XG5cbiAgICAvLyBHZXQgYWxsIGF2YWlsYWJsZSBhY3Rpb25zIGZyb20gdGhlIGN1cnJlbnQgbWFjaGluZVxuICAgIGNvbnN0IGFjdGlvbnMgPSB0aGlzLnBhdGhzVG8odG8pO1xuXG4gICAgaWYgKGFjdGlvbnMpIHtcbiAgICAgIC8vIE5vdGlmeSB3ZSdyZSBsZWF2aW5nIHRoZSBjdXJyZW50IHN0YXRlXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChhY3Rpb25zLm1hcChhY3Rpb24gPT4gYWN0aW9uLmJlZm9yZVRyYW5zaXRpb24odGhpcy5pbnN0YW5jZSkpKTtcblxuICAgICAgLy8gVE9ETzogUnVuIHRoaXMgaXMgc2VyaWVzXG4gICAgICAvLyBDaGVjayBpZiB3ZSBjYW4gdHJhbnNpdGlvbiB0byB0aGUgbmV4dCBzdGF0ZVxuICAgICAgY29uc3QgY29tcHV0ZWREYXRhID0geyAuLi4oZGF0YSB8fCB7fSksIHRvLCBmcm9tOiBzdGF0ZSB9O1xuICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IFByb21pc2UuYWxsKGFjdGlvbnMubWFwKGFjdGlvbiA9PiBhY3Rpb24ub25UcmFuc2l0aW9uKHRoaXMuaW5zdGFuY2UsIGNvbXB1dGVkRGF0YSkpKTtcbiAgICAgIGNvbnN0IG9rID0gcmVzdWx0cy5yZWR1Y2UoKGFnZ3IsIG5leHQpID0+IGFnZ3IgJiYgbmV4dCwgdHJ1ZSk7XG5cbiAgICAgIGlmIChvaykge1xuICAgICAgICBhd2FpdCB0aGlzLnNldFN0YXRlKHRvLCBhY3Rpb25zKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oYFRyYW5zaXRpb24gaW50ZXJydXB0ZWQ6IFwiJHtzdGF0ZX1cIiA9PiBcIiR7dG99XCJgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBhY3Rpb24gYXZhaWxhYmxlIHRvIHRyYW5zaXRpb24gZnJvbSBcIiR7c3RhdGV9XCIgdG8gXCIke3RvfVwiIHN0YXRlLmApO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19