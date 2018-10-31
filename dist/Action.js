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
class Action {
    constructor(options = {}) {
        this.options = options;
        this.name = options.name || this.name || this.constructor.name;
        this.logger = options.logger || new ts_framework_common_1.Logger();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkRBQTZDO0FBa0I3QyxNQUE4QixNQUFNO0lBTWxDLFlBQXNCLFVBQXlCLEVBQUU7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDL0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLElBQUksNEJBQU0sRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRDs7O09BR0c7SUFDSSxnQkFBZ0IsQ0FBQyxRQUFrQjtRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLG9CQUFvQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVSxZQUFZLENBQUMsUUFBa0IsRUFBRSxJQUFvQzs7WUFDaEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSwyQkFBMkIsSUFBSSxDQUFDLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2pHLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNJLGVBQWUsQ0FBQyxRQUFrQjtRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLGVBQWUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksT0FBTyxDQUFDLElBQWlCLEVBQUUsRUFBZTtRQUMvQyxJQUFJLFdBQVcsR0FBWSxLQUFLLENBQUM7UUFDakMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRTtZQUNyQixXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQ3BCO2FBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNuQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBZSxDQUFDO1lBQ25DLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDO1NBQ25EO2FBQU07WUFDTCxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUM7U0FDbEM7UUFDRCxJQUFJLFNBQVMsR0FBWSxLQUFLLENBQUM7UUFDL0IsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLEdBQUcsRUFBRTtZQUNuQixTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO2FBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNqQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBYSxDQUFDO1lBQ2pDLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQy9DO2FBQU07WUFDTCxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDNUI7UUFFRCxPQUFPLFdBQVcsSUFBSSxTQUFTLENBQUM7SUFDbEMsQ0FBQztDQUNGO0FBbkVELHlCQW1FQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uT3B0aW9ucyB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGxvZ2dlcj86IExvZ2dlcjtcbn1cblxuZXhwb3J0IHR5cGUgVHJhbnNpdGlvbkJhc2ljRGF0YTxTdGF0ZT4gPSB7XG4gIGZyb206IFN0YXRlIHwgU3RhdGVbXTtcbiAgdG86IFN0YXRlIHwgU3RhdGVbXTtcbn1cblxuZXhwb3J0IHR5cGUgVHJhbnNpdGlvblBheWxvYWQ8UGF5bG9hZD4gPSB7XG4gIFtrZXkgaW4ga2V5b2YgUGF5bG9hZF06IFBheWxvYWRba2V5XTtcbn1cblxuZXhwb3J0IHR5cGUgVHJhbnNpdGlvbkRhdGE8U3RhdGUsIFBheWxvYWQgPSBhbnk+ID0gVHJhbnNpdGlvbkJhc2ljRGF0YTxTdGF0ZT4gJiBUcmFuc2l0aW9uUGF5bG9hZDxQYXlsb2FkPjtcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQWN0aW9uPEluc3RhbmNlLCBTdGF0ZSwgUGF5bG9hZCA9IGFueT4ge1xuICBwdWJsaWMgYWJzdHJhY3QgZnJvbTogU3RhdGUgfCBzdHJpbmcgfCAoU3RhdGUgfCBzdHJpbmcpW107XG4gIHB1YmxpYyBhYnN0cmFjdCB0bzogU3RhdGUgfCBzdHJpbmcgfCAoU3RhdGUgfCBzdHJpbmcpW107XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHByb3RlY3RlZCBsb2dnZXI7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG9wdGlvbnM6IEFjdGlvbk9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZSB8fCB0aGlzLm5hbWUgfHwgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgbmV3IExvZ2dlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0gaW5zdGFuY2UgVGhlIHN0YXRlIG1hY2hpbmUgaW5zdGFuY2VcbiAgICovXG4gIHB1YmxpYyBiZWZvcmVUcmFuc2l0aW9uKGluc3RhbmNlOiBJbnN0YW5jZSk6IHZvaWQge1xuICAgIHRoaXMubG9nZ2VyLnNpbGx5KGAke3RoaXMubmFtZX06IGxlYXZpbmcgc3RhdGUgXCIke3RoaXMuZnJvbX1cImApO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYSBzdGF0ZSB0cmFuc2l0aW9uXG4gICAqIFxuICAgKiBAcGFyYW0gaW5zdGFuY2UgVGhlIHN0YXRlIG1hY2hpbmUgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSBkYXRhIFRoZSB0cmFuc2l0aW9uIHBheWxvYWQgcGFzc2VkIHRvIHRoZSBmc20uZ29UbygpIG1ldGhvZC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBvblRyYW5zaXRpb24oaW5zdGFuY2U6IEluc3RhbmNlLCBkYXRhOiBUcmFuc2l0aW9uRGF0YTxTdGF0ZSwgUGF5bG9hZD4pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICB0aGlzLmxvZ2dlci5zaWxseShgJHt0aGlzLm5hbWV9OiB0cmFuc2l0aW9uaW5nIHN0YXRlcyBcIiR7dGhpcy5mcm9tfVwiID0+IFwiJHt0aGlzLnRvfVwiYCwgeyBkYXRhIH0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcG9zdCB0cmFuc2l0aW9uIHJlc3VsdHMuXG4gICAqIFxuICAgKiBAcGFyYW0gaW5zdGFuY2UgVGhlIHN0YXRlIG1hY2hpbmUgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgYWZ0ZXJUcmFuc2l0aW9uKGluc3RhbmNlOiBJbnN0YW5jZSk6IHZvaWQge1xuICAgIHRoaXMubG9nZ2VyLnNpbGx5KGAke3RoaXMubmFtZX06IGVudGVyaW5nIFwiJHt0aGlzLnRvfVwiYCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGFjdGlvbiBtYXRjaGVzIGZyb20vdG8gc3RhdGUgcGFpciBzcGVjaWZpZWQuXG4gICAqIFxuICAgKiBAcGFyYW0gZnJvbSBUaGUgb3JpZ2luYWwgc3RhdGUgdG8gYmUgY2hlY2tlZCBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gdG8gVGhlIGRlc3RpbmF0aW9uIHN0YXRlIHRvIGJlIGNoZWNrZWQgYWdhaW5zdC5cbiAgICovXG4gIHB1YmxpYyBtYXRjaGVzKGZyb206IFwiKlwiIHwgU3RhdGUsIHRvOiBcIipcIiB8IFN0YXRlKTogYm9vbGVhbiB7XG4gICAgbGV0IG1hdGNoZXNGcm9tOiBib29sZWFuID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuZnJvbSA9PT0gXCIqXCIpIHtcbiAgICAgIG1hdGNoZXNGcm9tID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5mcm9tKSkge1xuICAgICAgY29uc3QgYXJyYXkgPSB0aGlzLmZyb20gYXMgU3RhdGVbXTtcbiAgICAgIG1hdGNoZXNGcm9tID0gYXJyYXkuc29tZShzdGF0ZSA9PiBzdGF0ZSA9PT0gZnJvbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hdGNoZXNGcm9tID0gdGhpcy5mcm9tID09PSBmcm9tO1xuICAgIH1cbiAgICBsZXQgbWF0Y2hlc1RvOiBib29sZWFuID0gZmFsc2U7XG4gICAgaWYgKHRoaXMudG8gPT09IFwiKlwiKSB7XG4gICAgICBtYXRjaGVzVG8gPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnRvKSkge1xuICAgICAgY29uc3QgYXJyYXkgPSB0aGlzLnRvIGFzIFN0YXRlW107XG4gICAgICBtYXRjaGVzVG8gPSBhcnJheS5zb21lKHN0YXRlID0+IHN0YXRlID09PSB0byk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hdGNoZXNUbyA9IHRoaXMudG8gPT09IHRvO1xuICAgIH1cblxuICAgIHJldHVybiBtYXRjaGVzRnJvbSAmJiBtYXRjaGVzVG87XG4gIH1cbn1cbiJdfQ==