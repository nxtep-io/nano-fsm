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
                const computedData = Object.assign({}, data, { to, from: state });
                const results = yield Promise.all(actions.map(action => action.onTransition(this.instance, computedData)));
                const ok = results.reduce((aggr, next) => aggr && next, true);
                if (ok) {
                    yield this.setState(to, actions);
                    return true;
                }
                else {
                    this.logger.info(`Transition interrupted: "${state}" => "${to}"`);
                }
                // No transition available
            }
            else {
                throw new Error(`No action available to transition from "${state}" to "${to}" state.`);
            }
            return false;
        });
    }
}
exports.default = FSM;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmluaXRlU3RhdGVNYWNoaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0Zpbml0ZVN0YXRlTWFjaGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkRBQTZDO0FBUzdDOztHQUVHO0FBQ0gsTUFBOEIsR0FBRztJQU8vQixZQUFtQixRQUFrQixFQUFZLFVBQTZCLEVBQUU7UUFBN0QsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFZLFlBQU8sR0FBUCxPQUFPLENBQXdCO1FBQzlFLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLDRCQUFNLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFlBQVksQ0FBQyxLQUFZO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsS0FBSztRQUNkLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNoRixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUE7U0FDbEU7YUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDckYsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUE7U0FDakU7YUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFB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RSxLQUFLLEdBQUUsQ0FBQztnQkFDbEQsTUFBTSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFFOUQsSUFBSSxFQUFFLEVBQUU7b0JBQ04sTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDakMsT0FBTyxJQUFJLENBQUM7aUJBQ2I7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEtBQUssU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUNuRTtnQkFDRCwwQkFBMEI7YUFDM0I7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsS0FBSyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDeEY7WUFFRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7S0FBQTtDQUNGO0FBbklELHNCQW1JQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgQWN0aW9uLCB7IFRyYW5zaXRpb25EYXRhIH0gZnJvbSBcIi4vQWN0aW9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRlNNT3B0aW9uczxTdGF0ZT4ge1xuICBzdGF0ZT86IFN0YXRlO1xuICBsb2dnZXI/OiBMb2dnZXI7XG4gIGFsbG93U2FtZVN0YXRlPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBUaGUgbWFpbiBGaW5pdGUgU3RhdGUgTWFjaGluZSBtYW5hZ2VyLCB0aGF0IGhvbGRzIGFsbCBhdmFpbGFibGUgYWN0aW9ucyBhbmQgcGVyZm9ybXMgdGhlIHN0YXRlIHRyYW5zaXRpb25zLlxuICovXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBGU008SW5zdGFuY2UsIFN0YXRlPiB7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhY3Rpb25zOiBBY3Rpb248SW5zdGFuY2UsIFN0YXRlPltdO1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgaW5pdGlhbFN0YXRlOiBTdGF0ZTtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHN0YXRlczogU3RhdGVbXTtcbiAgcHJvdGVjdGVkIGxvZ2dlcjogTG9nZ2VyO1xuICBwcm90ZWN0ZWQgX3N0YXRlOiBTdGF0ZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5zdGFuY2U6IEluc3RhbmNlLCBwcm90ZWN0ZWQgb3B0aW9uczogRlNNT3B0aW9uczxTdGF0ZT4gPSB7fSkge1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgbmV3IExvZ2dlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZXMgdGhlIHN0YXRlIGRlc2lyZWQgaXMgdmFsaWQgYW5kIHJlZ2lzdGVyZWQgaW4gdGhlIG1hY2hpbmUuXG4gICAqIFxuICAgKiBAcGFyYW0gc3RhdGUgVGhlIHN0YXRlIHRvIGJlIGNoZWNrZWRcbiAgICovXG4gIGlzVmFsaWRTdGF0ZShzdGF0ZTogU3RhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZXMuaW5kZXhPZihzdGF0ZSkgPj0gMFxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjdXJyZW50IG1hY2hpbmUgc3RhdGUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHN0YXRlKCk6IFN0YXRlIHtcbiAgICAvLyBFbnN1cmUgc3RhdGUgaXMgdmFsaWRcbiAgICBpZiAoIXRoaXMuX3N0YXRlICYmIHRoaXMub3B0aW9ucy5zdGF0ZSAmJiAhdGhpcy5pc1ZhbGlkU3RhdGUodGhpcy5vcHRpb25zLnN0YXRlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGluaXRpYWwgc3RhdGU6IFwiJHt0aGlzLm9wdGlvbnMuc3RhdGV9XCJgKVxuICAgIH0gZWxzZSBpZiAoIXRoaXMuX3N0YXRlICYmIHRoaXMuaW5pdGlhbFN0YXRlICYmICF0aGlzLmlzVmFsaWRTdGF0ZSh0aGlzLmluaXRpYWxTdGF0ZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBpbml0aWFsIHN0YXRlOiBcIiR7dGhpcy5pbml0aWFsU3RhdGV9XCJgKVxuICAgIH0gZWxzZSBpZiAoIXRoaXMuX3N0YXRlICYmIHRoaXMub3B0aW9ucy5zdGF0ZSkge1xuICAgICAgLy8gU2V0IHRoZSBpbml0aWFsIHN0YXRlIGxvY2FsbHlcbiAgICAgIHRoaXMuX3N0YXRlID0gdGhpcy5vcHRpb25zLnN0YXRlO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuX3N0YXRlKSB7XG4gICAgICAvLyBTZXQgdGhlIGluaXRpYWwgc3RhdGUgbG9jYWxseVxuICAgICAgdGhpcy5fc3RhdGUgPSB0aGlzLmluaXRpYWxTdGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgYXZhaWxhYmxlIGFjdGlvbnMgdG8gZ28gdG8gYSBkZXRlcm1pbmVkIHN0YXRlLlxuICAgKiBcbiAgICogQHBhcmFtIHRvIFRoZSBkZXNpcmVkIHN0YXRlXG4gICAqL1xuICBwdWJsaWMgcGF0aHNUbyh0bzogU3RhdGUpOiBmYWxzZSB8IEFjdGlvbjxJbnN0YW5jZSwgU3RhdGU+W10ge1xuICAgIGlmICh0byA9PT0gdGhpcy5zdGF0ZSAmJiAhdGhpcy5vcHRpb25zLmFsbG93U2FtZVN0YXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0byA9PT0gdGhpcy5zdGF0ZSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIC8vIEdldCBhbGwgYXZhaWxhYmxlIGFjdGlvbnMgZnJvbSB0aGUgY3VycmVudCBtYWNoaW5lXG4gICAgY29uc3QgYWN0aW9ucyA9IHRoaXMuYWN0aW9ucy5maWx0ZXIoYWN0aW9uID0+IGFjdGlvbi5tYXRjaGVzKHRoaXMuc3RhdGUsIHRvKSk7XG5cbiAgICBpZiAoYWN0aW9ucyAmJiBhY3Rpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGFjdGlvbnM7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBjYW4gZ28gdG8gZGVzaXJlZCBzdGF0ZS5cbiAgICogXG4gICAqIEBwYXJhbSB0byBUaGUgZGVzaXJlZCBzdGF0ZVxuICAgKi9cbiAgcHVibGljIGNhbkdvVG8odG86IFN0YXRlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5wYXRoc1RvKHRvKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyB0aGUgaW50ZXJuYWwgc3RhdGUgY2hhbmdlIGluIHRoZSBtYWNoaW5lLiBTaG91bGQgbm90IGJlIGNhbGxlZCBkaXJlY3RsLCB1c2UgXCJnb1RvXCIuXG4gICAqIFxuICAgKiBAcGFyYW0gdG8gVGhlIGRlc3RpbmF0aW9uIHN0YXRlXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgc2V0U3RhdGUodG86IFN0YXRlLCBhY3Rpb25zOiBBY3Rpb248SW5zdGFuY2UsIFN0YXRlPltdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gU2V0IHRoZSBuZXh0IHN0YXRlIGxvY2FsbHlcbiAgICB0aGlzLl9zdGF0ZSA9IHRvO1xuXG4gICAgLy8gTm90aWZ5IHdlJ3JlIGVudGVyZWQgdGhlIG5leHQgc3RhdGVcbiAgICBhd2FpdCBQcm9taXNlLmFsbChhY3Rpb25zLm1hcChhY3Rpb24gPT4gYWN0aW9uLmFmdGVyVHJhbnNpdGlvbih0aGlzLmluc3RhbmNlKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgbmV3IHRyYW5zaXRpb24gaW4gdGhlIG1hY2hpbmUuXG4gICAqIFxuICAgKiBAcGFyYW0gdG8gVGhlIGRlc2lyZWQgc3RhdGVcbiAgICogQHBhcmFtIGRhdGEgQW4gb3B0aW9uYWwgcGF5bG9hZCB0byBiZSBwYXNzZWQgdG8gdGhlIG1hY2hpbmUgYWN0aW9uc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIGdvVG8odG86IFN0YXRlLCBkYXRhPzogVHJhbnNpdGlvbkRhdGE8U3RhdGU+KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuXG4gICAgaWYgKHRvID09PSBzdGF0ZSAmJiAhdGhpcy5vcHRpb25zLmFsbG93U2FtZVN0YXRlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE1hY2hpbmUgaXMgYWxyZWFkeSBpbiBcIiR7c3RhdGV9XCIgc3RhdGVgKTtcbiAgICB9IGVsc2UgaWYgKHRvID09PSBzdGF0ZSkge1xuICAgICAgYXdhaXQgdGhpcy5zZXRTdGF0ZSh0bywgW10pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIHN0YXRlIGlzIHZhbGlkXG4gICAgaWYgKCF0aGlzLmlzVmFsaWRTdGF0ZSh0bykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBzdGF0ZTogXCIke3RvfVwiYClcbiAgICB9XG5cbiAgICAvLyBHZXQgYWxsIGF2YWlsYWJsZSBhY3Rpb25zIGZyb20gdGhlIGN1cnJlbnQgbWFjaGluZVxuICAgIGNvbnN0IGFjdGlvbnMgPSB0aGlzLnBhdGhzVG8odG8pO1xuXG4gICAgaWYgKGFjdGlvbnMpIHtcbiAgICAgIC8vIE5vdGlmeSB3ZSdyZSBsZWF2aW5nIHRoZSBjdXJyZW50IHN0YXRlXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChhY3Rpb25zLm1hcChhY3Rpb24gPT4gYWN0aW9uLmJlZm9yZVRyYW5zaXRpb24odGhpcy5pbnN0YW5jZSkpKTtcblxuICAgICAgLy8gVE9ETzogUnVuIHRoaXMgaXMgc2VyaWVzXG4gICAgICAvLyBDaGVjayBpZiB3ZSBjYW4gdHJhbnNpdGlvbiB0byB0aGUgbmV4dCBzdGF0ZVxuICAgICAgY29uc3QgY29tcHV0ZWREYXRhID0geyAuLi5kYXRhLCB0bywgZnJvbTogc3RhdGUgfTtcbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbChhY3Rpb25zLm1hcChhY3Rpb24gPT4gYWN0aW9uLm9uVHJhbnNpdGlvbih0aGlzLmluc3RhbmNlLCBjb21wdXRlZERhdGEpKSk7XG4gICAgICBjb25zdCBvayA9IHJlc3VsdHMucmVkdWNlKChhZ2dyLCBuZXh0KSA9PiBhZ2dyICYmIG5leHQsIHRydWUpO1xuXG4gICAgICBpZiAob2spIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zZXRTdGF0ZSh0bywgYWN0aW9ucyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgVHJhbnNpdGlvbiBpbnRlcnJ1cHRlZDogXCIke3N0YXRlfVwiID0+IFwiJHt0b31cImApO1xuICAgICAgfVxuICAgICAgLy8gTm8gdHJhbnNpdGlvbiBhdmFpbGFibGVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBhY3Rpb24gYXZhaWxhYmxlIHRvIHRyYW5zaXRpb24gZnJvbSBcIiR7c3RhdGV9XCIgdG8gXCIke3RvfVwiIHN0YXRlLmApO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19