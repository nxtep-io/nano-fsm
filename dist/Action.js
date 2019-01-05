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
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkRBQTZEO0FBa0I3RCxNQUE4QixNQUFNO0lBTWxDLFlBQXNCLFVBQXlCLEVBQUU7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDL0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLDRCQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGdCQUFnQixDQUFDLFFBQWtCO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksb0JBQW9CLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNVLFlBQVksQ0FBQyxRQUFrQixFQUFFLElBQW9DOztZQUNoRixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLDJCQUEyQixJQUFJLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDakcsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ0ksZUFBZSxDQUFDLFFBQWtCO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksZUFBZSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxPQUFPLENBQUMsSUFBaUIsRUFBRSxFQUFlO1FBQy9DLElBQUksV0FBVyxHQUFZLEtBQUssQ0FBQztRQUNqQyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFO1lBQ3JCLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDcEI7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ25DLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFlLENBQUM7WUFDbkMsV0FBVyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUM7U0FDbkQ7YUFBTTtZQUNMLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQztTQUNsQztRQUNELElBQUksU0FBUyxHQUFZLEtBQUssQ0FBQztRQUMvQixJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssR0FBRyxFQUFFO1lBQ25CLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDbEI7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2pDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFhLENBQUM7WUFDakMsU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDL0M7YUFBTTtZQUNMLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUM1QjtRQUVELE9BQU8sV0FBVyxJQUFJLFNBQVMsQ0FBQztJQUNsQyxDQUFDO0NBQ0Y7QUFuRUQseUJBbUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uT3B0aW9ucyB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGxvZ2dlcj86IExvZ2dlckluc3RhbmNlO1xufVxuXG5leHBvcnQgdHlwZSBUcmFuc2l0aW9uQmFzaWNEYXRhPFN0YXRlPiA9IHtcbiAgZnJvbTogU3RhdGUgfCBTdGF0ZVtdO1xuICB0bzogU3RhdGUgfCBTdGF0ZVtdO1xufVxuXG5leHBvcnQgdHlwZSBUcmFuc2l0aW9uUGF5bG9hZDxQYXlsb2FkPiA9IHtcbiAgW2tleSBpbiBrZXlvZiBQYXlsb2FkXTogUGF5bG9hZFtrZXldO1xufVxuXG5leHBvcnQgdHlwZSBUcmFuc2l0aW9uRGF0YTxTdGF0ZSwgUGF5bG9hZCA9IGFueT4gPSBUcmFuc2l0aW9uQmFzaWNEYXRhPFN0YXRlPiAmIFRyYW5zaXRpb25QYXlsb2FkPFBheWxvYWQ+O1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBBY3Rpb248SW5zdGFuY2UsIFN0YXRlLCBQYXlsb2FkID0gYW55PiB7XG4gIHB1YmxpYyBhYnN0cmFjdCBmcm9tOiBTdGF0ZSB8IHN0cmluZyB8IChTdGF0ZSB8IHN0cmluZylbXTtcbiAgcHVibGljIGFic3RyYWN0IHRvOiBTdGF0ZSB8IHN0cmluZyB8IChTdGF0ZSB8IHN0cmluZylbXTtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHJvdGVjdGVkIGxvZ2dlcjtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgb3B0aW9uczogQWN0aW9uT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lIHx8IHRoaXMubmFtZSB8fCB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIGluc3RhbmNlIFRoZSBzdGF0ZSBtYWNoaW5lIGluc3RhbmNlXG4gICAqL1xuICBwdWJsaWMgYmVmb3JlVHJhbnNpdGlvbihpbnN0YW5jZTogSW5zdGFuY2UpOiB2b2lkIHtcbiAgICB0aGlzLmxvZ2dlci5zaWxseShgJHt0aGlzLm5hbWV9OiBsZWF2aW5nIHN0YXRlIFwiJHt0aGlzLmZyb219XCJgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGEgc3RhdGUgdHJhbnNpdGlvblxuICAgKiBcbiAgICogQHBhcmFtIGluc3RhbmNlIFRoZSBzdGF0ZSBtYWNoaW5lIGluc3RhbmNlLlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgdHJhbnNpdGlvbiBwYXlsb2FkIHBhc3NlZCB0byB0aGUgZnNtLmdvVG8oKSBtZXRob2QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgb25UcmFuc2l0aW9uKGluc3RhbmNlOiBJbnN0YW5jZSwgZGF0YTogVHJhbnNpdGlvbkRhdGE8U3RhdGUsIFBheWxvYWQ+KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdGhpcy5sb2dnZXIuc2lsbHkoYCR7dGhpcy5uYW1lfTogdHJhbnNpdGlvbmluZyBzdGF0ZXMgXCIke3RoaXMuZnJvbX1cIiA9PiBcIiR7dGhpcy50b31cImAsIHsgZGF0YSB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHBvc3QgdHJhbnNpdGlvbiByZXN1bHRzLlxuICAgKiBcbiAgICogQHBhcmFtIGluc3RhbmNlIFRoZSBzdGF0ZSBtYWNoaW5lIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGFmdGVyVHJhbnNpdGlvbihpbnN0YW5jZTogSW5zdGFuY2UpOiB2b2lkIHtcbiAgICB0aGlzLmxvZ2dlci5zaWxseShgJHt0aGlzLm5hbWV9OiBlbnRlcmluZyBcIiR7dGhpcy50b31cImApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhY3Rpb24gbWF0Y2hlcyBmcm9tL3RvIHN0YXRlIHBhaXIgc3BlY2lmaWVkLlxuICAgKiBcbiAgICogQHBhcmFtIGZyb20gVGhlIG9yaWdpbmFsIHN0YXRlIHRvIGJlIGNoZWNrZWQgYWdhaW5zdC5cbiAgICogQHBhcmFtIHRvIFRoZSBkZXN0aW5hdGlvbiBzdGF0ZSB0byBiZSBjaGVja2VkIGFnYWluc3QuXG4gICAqL1xuICBwdWJsaWMgbWF0Y2hlcyhmcm9tOiBcIipcIiB8IFN0YXRlLCB0bzogXCIqXCIgfCBTdGF0ZSk6IGJvb2xlYW4ge1xuICAgIGxldCBtYXRjaGVzRnJvbTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmZyb20gPT09IFwiKlwiKSB7XG4gICAgICBtYXRjaGVzRnJvbSA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRoaXMuZnJvbSkpIHtcbiAgICAgIGNvbnN0IGFycmF5ID0gdGhpcy5mcm9tIGFzIFN0YXRlW107XG4gICAgICBtYXRjaGVzRnJvbSA9IGFycmF5LnNvbWUoc3RhdGUgPT4gc3RhdGUgPT09IGZyb20pO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXRjaGVzRnJvbSA9IHRoaXMuZnJvbSA9PT0gZnJvbTtcbiAgICB9XG4gICAgbGV0IG1hdGNoZXNUbzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlmICh0aGlzLnRvID09PSBcIipcIikge1xuICAgICAgbWF0Y2hlc1RvID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGhpcy50bykpIHtcbiAgICAgIGNvbnN0IGFycmF5ID0gdGhpcy50byBhcyBTdGF0ZVtdO1xuICAgICAgbWF0Y2hlc1RvID0gYXJyYXkuc29tZShzdGF0ZSA9PiBzdGF0ZSA9PT0gdG8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXRjaGVzVG8gPSB0aGlzLnRvID09PSB0bztcbiAgICB9XG5cbiAgICByZXR1cm4gbWF0Y2hlc0Zyb20gJiYgbWF0Y2hlc1RvO1xuICB9XG59XG4iXX0=