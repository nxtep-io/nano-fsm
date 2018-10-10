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
        const matchesFrom = this.from === "*" || this.from === from;
        const matchesTo = this.to === "*" || this.to === to;
        return matchesFrom && matchesTo;
    }
}
exports.default = Action;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkRBQTZDO0FBa0I3QyxNQUE4QixNQUFNO0lBTWxDLFlBQXNCLFVBQXlCLEVBQUU7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDL0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLElBQUksNEJBQU0sRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRDs7O09BR0c7SUFDSSxnQkFBZ0IsQ0FBQyxRQUFrQjtRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLG9CQUFvQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVSxZQUFZLENBQUMsUUFBa0IsRUFBRSxJQUFvQzs7WUFDaEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSwyQkFBMkIsSUFBSSxDQUFDLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2pHLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNJLGVBQWUsQ0FBQyxRQUFrQjtRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLGVBQWUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksT0FBTyxDQUFDLElBQWlCLEVBQUUsRUFBZTtRQUMvQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQztRQUM1RCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUNwRCxPQUFPLFdBQVcsSUFBSSxTQUFTLENBQUM7SUFDbEMsQ0FBQztDQUNGO0FBbERELHlCQWtEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uT3B0aW9ucyB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGxvZ2dlcj86IExvZ2dlcjtcbn1cblxuZXhwb3J0IHR5cGUgVHJhbnNpdGlvbkJhc2ljRGF0YTxTdGF0ZT4gPSB7XG4gIGZyb206IFN0YXRlO1xuICB0bzogU3RhdGU7XG59XG5cbmV4cG9ydCB0eXBlIFRyYW5zaXRpb25QYXlsb2FkPFBheWxvYWQ+ID0ge1xuICBba2V5IGluIGtleW9mIFBheWxvYWRdOiBQYXlsb2FkW2tleV07XG59XG5cbmV4cG9ydCB0eXBlIFRyYW5zaXRpb25EYXRhPFN0YXRlLCBQYXlsb2FkID0gYW55PiA9IFRyYW5zaXRpb25CYXNpY0RhdGE8U3RhdGU+ICYgVHJhbnNpdGlvblBheWxvYWQ8UGF5bG9hZD47XG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEFjdGlvbjxJbnN0YW5jZSwgU3RhdGUsIFBheWxvYWQgPSBhbnk+IHtcbiAgcHVibGljIGFic3RyYWN0IGZyb206IFN0YXRlIHwgc3RyaW5nO1xuICBwdWJsaWMgYWJzdHJhY3QgdG86IFN0YXRlIHwgc3RyaW5nO1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBwcm90ZWN0ZWQgbG9nZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBvcHRpb25zOiBBY3Rpb25PcHRpb25zID0ge30pIHtcbiAgICB0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWUgfHwgdGhpcy5uYW1lIHx8IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IG5ldyBMb2dnZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIGluc3RhbmNlIFRoZSBzdGF0ZSBtYWNoaW5lIGluc3RhbmNlXG4gICAqL1xuICBwdWJsaWMgYmVmb3JlVHJhbnNpdGlvbihpbnN0YW5jZTogSW5zdGFuY2UpOiB2b2lkIHtcbiAgICB0aGlzLmxvZ2dlci5zaWxseShgJHt0aGlzLm5hbWV9OiBsZWF2aW5nIHN0YXRlIFwiJHt0aGlzLmZyb219XCJgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGEgc3RhdGUgdHJhbnNpdGlvblxuICAgKiBcbiAgICogQHBhcmFtIGluc3RhbmNlIFRoZSBzdGF0ZSBtYWNoaW5lIGluc3RhbmNlLlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgdHJhbnNpdGlvbiBwYXlsb2FkIHBhc3NlZCB0byB0aGUgZnNtLmdvVG8oKSBtZXRob2QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgb25UcmFuc2l0aW9uKGluc3RhbmNlOiBJbnN0YW5jZSwgZGF0YTogVHJhbnNpdGlvbkRhdGE8U3RhdGUsIFBheWxvYWQ+KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdGhpcy5sb2dnZXIuc2lsbHkoYCR7dGhpcy5uYW1lfTogdHJhbnNpdGlvbmluZyBzdGF0ZXMgXCIke3RoaXMuZnJvbX1cIiA9PiBcIiR7dGhpcy50b31cImAsIHsgZGF0YSB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHBvc3QgdHJhbnNpdGlvbiByZXN1bHRzLlxuICAgKiBcbiAgICogQHBhcmFtIGluc3RhbmNlIFRoZSBzdGF0ZSBtYWNoaW5lIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGFmdGVyVHJhbnNpdGlvbihpbnN0YW5jZTogSW5zdGFuY2UpOiB2b2lkIHtcbiAgICB0aGlzLmxvZ2dlci5zaWxseShgJHt0aGlzLm5hbWV9OiBlbnRlcmluZyBcIiR7dGhpcy50b31cImApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhY3Rpb24gbWF0Y2hlcyBmcm9tL3RvIHN0YXRlIHBhaXIgc3BlY2lmaWVkLlxuICAgKiBcbiAgICogQHBhcmFtIGZyb20gVGhlIG9yaWdpbmFsIHN0YXRlIHRvIGJlIGNoZWNrZWQgYWdhaW5zdC5cbiAgICogQHBhcmFtIHRvIFRoZSBkZXN0aW5hdGlvbiBzdGF0ZSB0byBiZSBjaGVja2VkIGFnYWluc3QuXG4gICAqL1xuICBwdWJsaWMgbWF0Y2hlcyhmcm9tOiBcIipcIiB8IFN0YXRlLCB0bzogXCIqXCIgfCBTdGF0ZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG1hdGNoZXNGcm9tID0gdGhpcy5mcm9tID09PSBcIipcIiB8fCB0aGlzLmZyb20gPT09IGZyb207XG4gICAgY29uc3QgbWF0Y2hlc1RvID0gdGhpcy50byA9PT0gXCIqXCIgfHwgdGhpcy50byA9PT0gdG87XG4gICAgcmV0dXJuIG1hdGNoZXNGcm9tICYmIG1hdGNoZXNUbztcbiAgfVxufVxuIl19