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
            matchesFrom = this.from.some(state => state === from);
        }
        else {
            matchesFrom = this.from === from;
        }
        let matchesTo = false;
        if (this.to === "*") {
            matchesTo = true;
        }
        else if (Array.isArray(this.to)) {
            matchesTo = this.to.some(state => state === to);
        }
        else {
            matchesTo = this.to === to;
        }
        return matchesFrom && matchesTo;
    }
}
exports.default = Action;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkRBQTZDO0FBa0I3QyxNQUE4QixNQUFNO0lBTWxDLFlBQXNCLFVBQXlCLEVBQUU7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDL0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLElBQUksNEJBQU0sRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRDs7O09BR0c7SUFDSSxnQkFBZ0IsQ0FBQyxRQUFrQjtRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLG9CQUFvQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVSxZQUFZLENBQUMsUUFBa0IsRUFBRSxJQUFvQzs7WUFDaEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSwyQkFBMkIsSUFBSSxDQUFDLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2pHLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNJLGVBQWUsQ0FBQyxRQUFrQjtRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLGVBQWUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksT0FBTyxDQUFDLElBQWlCLEVBQUUsRUFBZTtRQUcvQyxJQUFJLFdBQVcsR0FBWSxLQUFLLENBQUM7UUFDakMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRTtZQUNyQixXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQ3BCO2FBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNuQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUM7U0FDdkQ7YUFBTTtZQUNMLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQztTQUNsQztRQUVELElBQUksU0FBUyxHQUFZLEtBQUssQ0FBQztRQUMvQixJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssR0FBRyxFQUFFO1lBQ25CLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDbEI7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2pDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQztTQUNqRDthQUFNO1lBQ0wsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQzVCO1FBRUQsT0FBTyxXQUFXLElBQUksU0FBUyxDQUFDO0lBQ2xDLENBQUM7Q0FDRjtBQXBFRCx5QkFvRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbk9wdGlvbnMge1xuICBuYW1lPzogc3RyaW5nO1xuICBsb2dnZXI/OiBMb2dnZXI7XG59XG5cbmV4cG9ydCB0eXBlIFRyYW5zaXRpb25CYXNpY0RhdGE8U3RhdGU+ID0ge1xuICBmcm9tOiBTdGF0ZSB8IFN0YXRlW107XG4gIHRvOiBTdGF0ZSB8IFN0YXRlW107XG59XG5cbmV4cG9ydCB0eXBlIFRyYW5zaXRpb25QYXlsb2FkPFBheWxvYWQ+ID0ge1xuICBba2V5IGluIGtleW9mIFBheWxvYWRdOiBQYXlsb2FkW2tleV07XG59XG5cbmV4cG9ydCB0eXBlIFRyYW5zaXRpb25EYXRhPFN0YXRlLCBQYXlsb2FkID0gYW55PiA9IFRyYW5zaXRpb25CYXNpY0RhdGE8U3RhdGU+ICYgVHJhbnNpdGlvblBheWxvYWQ8UGF5bG9hZD47XG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEFjdGlvbjxJbnN0YW5jZSwgU3RhdGUsIFBheWxvYWQgPSBhbnk+IHtcbiAgcHVibGljIGFic3RyYWN0IGZyb206IFN0YXRlIHwgc3RyaW5nO1xuICBwdWJsaWMgYWJzdHJhY3QgdG86IFN0YXRlIHwgc3RyaW5nO1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBwcm90ZWN0ZWQgbG9nZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBvcHRpb25zOiBBY3Rpb25PcHRpb25zID0ge30pIHtcbiAgICB0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWUgfHwgdGhpcy5uYW1lIHx8IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IG5ldyBMb2dnZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIGluc3RhbmNlIFRoZSBzdGF0ZSBtYWNoaW5lIGluc3RhbmNlXG4gICAqL1xuICBwdWJsaWMgYmVmb3JlVHJhbnNpdGlvbihpbnN0YW5jZTogSW5zdGFuY2UpOiB2b2lkIHtcbiAgICB0aGlzLmxvZ2dlci5zaWxseShgJHt0aGlzLm5hbWV9OiBsZWF2aW5nIHN0YXRlIFwiJHt0aGlzLmZyb219XCJgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGEgc3RhdGUgdHJhbnNpdGlvblxuICAgKiBcbiAgICogQHBhcmFtIGluc3RhbmNlIFRoZSBzdGF0ZSBtYWNoaW5lIGluc3RhbmNlLlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgdHJhbnNpdGlvbiBwYXlsb2FkIHBhc3NlZCB0byB0aGUgZnNtLmdvVG8oKSBtZXRob2QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgb25UcmFuc2l0aW9uKGluc3RhbmNlOiBJbnN0YW5jZSwgZGF0YTogVHJhbnNpdGlvbkRhdGE8U3RhdGUsIFBheWxvYWQ+KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdGhpcy5sb2dnZXIuc2lsbHkoYCR7dGhpcy5uYW1lfTogdHJhbnNpdGlvbmluZyBzdGF0ZXMgXCIke3RoaXMuZnJvbX1cIiA9PiBcIiR7dGhpcy50b31cImAsIHsgZGF0YSB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHBvc3QgdHJhbnNpdGlvbiByZXN1bHRzLlxuICAgKiBcbiAgICogQHBhcmFtIGluc3RhbmNlIFRoZSBzdGF0ZSBtYWNoaW5lIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGFmdGVyVHJhbnNpdGlvbihpbnN0YW5jZTogSW5zdGFuY2UpOiB2b2lkIHtcbiAgICB0aGlzLmxvZ2dlci5zaWxseShgJHt0aGlzLm5hbWV9OiBlbnRlcmluZyBcIiR7dGhpcy50b31cImApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhY3Rpb24gbWF0Y2hlcyBmcm9tL3RvIHN0YXRlIHBhaXIgc3BlY2lmaWVkLlxuICAgKiBcbiAgICogQHBhcmFtIGZyb20gVGhlIG9yaWdpbmFsIHN0YXRlIHRvIGJlIGNoZWNrZWQgYWdhaW5zdC5cbiAgICogQHBhcmFtIHRvIFRoZSBkZXN0aW5hdGlvbiBzdGF0ZSB0byBiZSBjaGVja2VkIGFnYWluc3QuXG4gICAqL1xuICBwdWJsaWMgbWF0Y2hlcyhmcm9tOiBcIipcIiB8IFN0YXRlLCB0bzogXCIqXCIgfCBTdGF0ZSk6IGJvb2xlYW4ge1xuXG5cbiAgICBsZXQgbWF0Y2hlc0Zyb206IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpZiAodGhpcy5mcm9tID09PSBcIipcIikge1xuICAgICAgbWF0Y2hlc0Zyb20gPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmZyb20pKSB7XG4gICAgICBtYXRjaGVzRnJvbSA9IHRoaXMuZnJvbS5zb21lKHN0YXRlID0+IHN0YXRlID09PSBmcm9tKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWF0Y2hlc0Zyb20gPSB0aGlzLmZyb20gPT09IGZyb207XG4gICAgfVxuXG4gICAgbGV0IG1hdGNoZXNUbzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlmICh0aGlzLnRvID09PSBcIipcIikge1xuICAgICAgbWF0Y2hlc1RvID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGhpcy50bykpIHtcbiAgICAgIG1hdGNoZXNUbyA9IHRoaXMudG8uc29tZShzdGF0ZSA9PiBzdGF0ZSA9PT0gdG8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXRjaGVzVG8gPSB0aGlzLnRvID09PSB0bztcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG1hdGNoZXNGcm9tICYmIG1hdGNoZXNUbztcbiAgfVxufVxuIl19