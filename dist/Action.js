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
class Action {
    constructor(options = {}) {
        this.options = options;
        this.name = options.name || this.name || this.constructor.name;
        this.logger = options.logger || nano_errors_1.Logger.getInstance();
    }
    /**
     *
     * @param instance The state machine instance
     */
    beforeTransition(instance) {
        this.logger.silly(`${this.name}: leaving state "${this.from}"`);
    }
    /**
     * Handles a state transition
     *
     * @param instance The state machine instance.
     * @param data The transition payload passed to the fsm.goTo() method.
     */
    onTransition(instance, data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.silly(`${this.name}: transitioning states "${this.from}" => "${this.to}"`, { data });
            return true;
        });
    }
    /**
     * Handles post transition results.
     *
     * @param instance The state machine instance.
     */
    afterTransition(instance) {
        this.logger.silly(`${this.name}: entering "${this.to}"`);
    }
    /**
     * Checks if action matches from/to state pair specified.
     *
     * @param from The original state to be checked against.
     * @param to The destination state to be checked against.
     */
    matches(from, to) {
        let matchesFrom = false;
        if (this.from === "*") {
            matchesFrom = true;
        }
        else if (Array.isArray(this.from)) {
            const array = this.from;
            matchesFrom = array.some(state => state === from);
        }
        else {
            matchesFrom = this.from === from;
        }
        let matchesTo = false;
        if (this.to === "*") {
            matchesTo = true;
        }
        else if (Array.isArray(this.to)) {
            const array = this.to;
            matchesTo = array.some(state => state === to);
        }
        else {
            matchesTo = this.to === to;
        }
        return matchesFrom && matchesTo;
    }
}
exports.default = Action;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkNBQXFEO0FBY3JELE1BQThCLE1BQU07SUFNbEMsWUFBc0IsVUFBeUIsRUFBRTtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMvQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUMvRCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksb0JBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksZ0JBQWdCLENBQUMsUUFBa0I7UUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxvQkFBb0IsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1UsWUFBWSxDQUFDLFFBQWtCLEVBQUUsSUFBb0M7O1lBQ2hGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksMkJBQTJCLElBQUksQ0FBQyxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNqRyxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDSSxlQUFlLENBQUMsUUFBa0I7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxlQUFlLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE9BQU8sQ0FBQyxJQUFpQixFQUFFLEVBQWU7UUFDL0MsSUFBSSxXQUFXLEdBQVksS0FBSyxDQUFDO1FBQ2pDLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUU7WUFDckIsV0FBVyxHQUFHLElBQUksQ0FBQztTQUNwQjthQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQWUsQ0FBQztZQUNuQyxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQztTQUNuRDthQUFNO1lBQ0wsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDO1NBQ2xDO1FBQ0QsSUFBSSxTQUFTLEdBQVksS0FBSyxDQUFDO1FBQy9CLElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxHQUFHLEVBQUU7WUFDbkIsU0FBUyxHQUFHLElBQUksQ0FBQztTQUNsQjthQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDakMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQWEsQ0FBQztZQUNqQyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQztTQUMvQzthQUFNO1lBQ0wsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQzVCO1FBRUQsT0FBTyxXQUFXLElBQUksU0FBUyxDQUFDO0lBQ2xDLENBQUM7Q0FDRjtBQW5FRCx5QkFtRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIsIExvZ2dlckluc3RhbmNlIH0gZnJvbSBcIm5hbm8tZXJyb3JzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uT3B0aW9ucyB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGxvZ2dlcj86IExvZ2dlckluc3RhbmNlO1xufVxuXG5leHBvcnQgdHlwZSBUcmFuc2l0aW9uQmFzaWNEYXRhPFN0YXRlPiA9IHtcbiAgZnJvbTogU3RhdGUgfCBTdGF0ZVtdO1xuICB0bzogU3RhdGUgfCBTdGF0ZVtdO1xufVxuXG5leHBvcnQgdHlwZSBUcmFuc2l0aW9uRGF0YTxTdGF0ZSwgUGF5bG9hZCA9IGFueT4gPSBUcmFuc2l0aW9uQmFzaWNEYXRhPFN0YXRlPiAmIFBheWxvYWQ7XG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEFjdGlvbjxJbnN0YW5jZSwgU3RhdGUsIFBheWxvYWQgPSBhbnk+IHtcbiAgcHVibGljIGFic3RyYWN0IGZyb206IFN0YXRlIHwgc3RyaW5nIHwgKFN0YXRlIHwgc3RyaW5nKVtdO1xuICBwdWJsaWMgYWJzdHJhY3QgdG86IFN0YXRlIHwgc3RyaW5nIHwgKFN0YXRlIHwgc3RyaW5nKVtdO1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBwcm90ZWN0ZWQgbG9nZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBvcHRpb25zOiBBY3Rpb25PcHRpb25zID0ge30pIHtcbiAgICB0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWUgfHwgdGhpcy5uYW1lIHx8IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0gaW5zdGFuY2UgVGhlIHN0YXRlIG1hY2hpbmUgaW5zdGFuY2VcbiAgICovXG4gIHB1YmxpYyBiZWZvcmVUcmFuc2l0aW9uKGluc3RhbmNlOiBJbnN0YW5jZSk6IHZvaWQge1xuICAgIHRoaXMubG9nZ2VyLnNpbGx5KGAke3RoaXMubmFtZX06IGxlYXZpbmcgc3RhdGUgXCIke3RoaXMuZnJvbX1cImApO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYSBzdGF0ZSB0cmFuc2l0aW9uXG4gICAqIFxuICAgKiBAcGFyYW0gaW5zdGFuY2UgVGhlIHN0YXRlIG1hY2hpbmUgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSBkYXRhIFRoZSB0cmFuc2l0aW9uIHBheWxvYWQgcGFzc2VkIHRvIHRoZSBmc20uZ29UbygpIG1ldGhvZC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBvblRyYW5zaXRpb24oaW5zdGFuY2U6IEluc3RhbmNlLCBkYXRhOiBUcmFuc2l0aW9uRGF0YTxTdGF0ZSwgUGF5bG9hZD4pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICB0aGlzLmxvZ2dlci5zaWxseShgJHt0aGlzLm5hbWV9OiB0cmFuc2l0aW9uaW5nIHN0YXRlcyBcIiR7dGhpcy5mcm9tfVwiID0+IFwiJHt0aGlzLnRvfVwiYCwgeyBkYXRhIH0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcG9zdCB0cmFuc2l0aW9uIHJlc3VsdHMuXG4gICAqIFxuICAgKiBAcGFyYW0gaW5zdGFuY2UgVGhlIHN0YXRlIG1hY2hpbmUgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgYWZ0ZXJUcmFuc2l0aW9uKGluc3RhbmNlOiBJbnN0YW5jZSk6IHZvaWQge1xuICAgIHRoaXMubG9nZ2VyLnNpbGx5KGAke3RoaXMubmFtZX06IGVudGVyaW5nIFwiJHt0aGlzLnRvfVwiYCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGFjdGlvbiBtYXRjaGVzIGZyb20vdG8gc3RhdGUgcGFpciBzcGVjaWZpZWQuXG4gICAqIFxuICAgKiBAcGFyYW0gZnJvbSBUaGUgb3JpZ2luYWwgc3RhdGUgdG8gYmUgY2hlY2tlZCBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gdG8gVGhlIGRlc3RpbmF0aW9uIHN0YXRlIHRvIGJlIGNoZWNrZWQgYWdhaW5zdC5cbiAgICovXG4gIHB1YmxpYyBtYXRjaGVzKGZyb206IFwiKlwiIHwgU3RhdGUsIHRvOiBcIipcIiB8IFN0YXRlKTogYm9vbGVhbiB7XG4gICAgbGV0IG1hdGNoZXNGcm9tOiBib29sZWFuID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuZnJvbSA9PT0gXCIqXCIpIHtcbiAgICAgIG1hdGNoZXNGcm9tID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5mcm9tKSkge1xuICAgICAgY29uc3QgYXJyYXkgPSB0aGlzLmZyb20gYXMgU3RhdGVbXTtcbiAgICAgIG1hdGNoZXNGcm9tID0gYXJyYXkuc29tZShzdGF0ZSA9PiBzdGF0ZSA9PT0gZnJvbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hdGNoZXNGcm9tID0gdGhpcy5mcm9tID09PSBmcm9tO1xuICAgIH1cbiAgICBsZXQgbWF0Y2hlc1RvOiBib29sZWFuID0gZmFsc2U7XG4gICAgaWYgKHRoaXMudG8gPT09IFwiKlwiKSB7XG4gICAgICBtYXRjaGVzVG8gPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnRvKSkge1xuICAgICAgY29uc3QgYXJyYXkgPSB0aGlzLnRvIGFzIFN0YXRlW107XG4gICAgICBtYXRjaGVzVG8gPSBhcnJheS5zb21lKHN0YXRlID0+IHN0YXRlID09PSB0byk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hdGNoZXNUbyA9IHRoaXMudG8gPT09IHRvO1xuICAgIH1cblxuICAgIHJldHVybiBtYXRjaGVzRnJvbSAmJiBtYXRjaGVzVG87XG4gIH1cbn1cbiJdfQ==