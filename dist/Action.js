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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkNBQXFEO0FBa0JyRCxNQUE4QixNQUFNO0lBTWxDLFlBQXNCLFVBQXlCLEVBQUU7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDL0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLG9CQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGdCQUFnQixDQUFDLFFBQWtCO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksb0JBQW9CLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNVLFlBQVksQ0FBQyxRQUFrQixFQUFFLElBQW9DOztZQUNoRixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLDJCQUEyQixJQUFJLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDakcsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ0ksZUFBZSxDQUFDLFFBQWtCO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksZUFBZSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxPQUFPLENBQUMsSUFBaUIsRUFBRSxFQUFlO1FBQy9DLElBQUksV0FBVyxHQUFZLEtBQUssQ0FBQztRQUNqQyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFO1lBQ3JCLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDcEI7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ25DLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFlLENBQUM7WUFDbkMsV0FBVyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUM7U0FDbkQ7YUFBTTtZQUNMLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQztTQUNsQztRQUNELElBQUksU0FBUyxHQUFZLEtBQUssQ0FBQztRQUMvQixJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssR0FBRyxFQUFFO1lBQ25CLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDbEI7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2pDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFhLENBQUM7WUFDakMsU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDL0M7YUFBTTtZQUNMLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUM1QjtRQUVELE9BQU8sV0FBVyxJQUFJLFNBQVMsQ0FBQztJQUNsQyxDQUFDO0NBQ0Y7QUFuRUQseUJBbUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gXCJuYW5vLWVycm9yc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbk9wdGlvbnMge1xuICBuYW1lPzogc3RyaW5nO1xuICBsb2dnZXI/OiBMb2dnZXJJbnN0YW5jZTtcbn1cblxuZXhwb3J0IHR5cGUgVHJhbnNpdGlvbkJhc2ljRGF0YTxTdGF0ZT4gPSB7XG4gIGZyb206IFN0YXRlIHwgU3RhdGVbXTtcbiAgdG86IFN0YXRlIHwgU3RhdGVbXTtcbn1cblxuZXhwb3J0IHR5cGUgVHJhbnNpdGlvblBheWxvYWQ8UGF5bG9hZD4gPSB7XG4gIFtrZXkgaW4ga2V5b2YgUGF5bG9hZF06IFBheWxvYWRba2V5XTtcbn1cblxuZXhwb3J0IHR5cGUgVHJhbnNpdGlvbkRhdGE8U3RhdGUsIFBheWxvYWQgPSBhbnk+ID0gVHJhbnNpdGlvbkJhc2ljRGF0YTxTdGF0ZT4gJiBUcmFuc2l0aW9uUGF5bG9hZDxQYXlsb2FkPjtcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQWN0aW9uPEluc3RhbmNlLCBTdGF0ZSwgUGF5bG9hZCA9IGFueT4ge1xuICBwdWJsaWMgYWJzdHJhY3QgZnJvbTogU3RhdGUgfCBzdHJpbmcgfCAoU3RhdGUgfCBzdHJpbmcpW107XG4gIHB1YmxpYyBhYnN0cmFjdCB0bzogU3RhdGUgfCBzdHJpbmcgfCAoU3RhdGUgfCBzdHJpbmcpW107XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHByb3RlY3RlZCBsb2dnZXI7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG9wdGlvbnM6IEFjdGlvbk9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZSB8fCB0aGlzLm5hbWUgfHwgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgTG9nZ2VyLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogXG4gICAqIEBwYXJhbSBpbnN0YW5jZSBUaGUgc3RhdGUgbWFjaGluZSBpbnN0YW5jZVxuICAgKi9cbiAgcHVibGljIGJlZm9yZVRyYW5zaXRpb24oaW5zdGFuY2U6IEluc3RhbmNlKTogdm9pZCB7XG4gICAgdGhpcy5sb2dnZXIuc2lsbHkoYCR7dGhpcy5uYW1lfTogbGVhdmluZyBzdGF0ZSBcIiR7dGhpcy5mcm9tfVwiYCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhIHN0YXRlIHRyYW5zaXRpb25cbiAgICogXG4gICAqIEBwYXJhbSBpbnN0YW5jZSBUaGUgc3RhdGUgbWFjaGluZSBpbnN0YW5jZS5cbiAgICogQHBhcmFtIGRhdGEgVGhlIHRyYW5zaXRpb24gcGF5bG9hZCBwYXNzZWQgdG8gdGhlIGZzbS5nb1RvKCkgbWV0aG9kLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIG9uVHJhbnNpdGlvbihpbnN0YW5jZTogSW5zdGFuY2UsIGRhdGE6IFRyYW5zaXRpb25EYXRhPFN0YXRlLCBQYXlsb2FkPik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHRoaXMubG9nZ2VyLnNpbGx5KGAke3RoaXMubmFtZX06IHRyYW5zaXRpb25pbmcgc3RhdGVzIFwiJHt0aGlzLmZyb219XCIgPT4gXCIke3RoaXMudG99XCJgLCB7IGRhdGEgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwb3N0IHRyYW5zaXRpb24gcmVzdWx0cy5cbiAgICogXG4gICAqIEBwYXJhbSBpbnN0YW5jZSBUaGUgc3RhdGUgbWFjaGluZSBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBhZnRlclRyYW5zaXRpb24oaW5zdGFuY2U6IEluc3RhbmNlKTogdm9pZCB7XG4gICAgdGhpcy5sb2dnZXIuc2lsbHkoYCR7dGhpcy5uYW1lfTogZW50ZXJpbmcgXCIke3RoaXMudG99XCJgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYWN0aW9uIG1hdGNoZXMgZnJvbS90byBzdGF0ZSBwYWlyIHNwZWNpZmllZC5cbiAgICogXG4gICAqIEBwYXJhbSBmcm9tIFRoZSBvcmlnaW5hbCBzdGF0ZSB0byBiZSBjaGVja2VkIGFnYWluc3QuXG4gICAqIEBwYXJhbSB0byBUaGUgZGVzdGluYXRpb24gc3RhdGUgdG8gYmUgY2hlY2tlZCBhZ2FpbnN0LlxuICAgKi9cbiAgcHVibGljIG1hdGNoZXMoZnJvbTogXCIqXCIgfCBTdGF0ZSwgdG86IFwiKlwiIHwgU3RhdGUpOiBib29sZWFuIHtcbiAgICBsZXQgbWF0Y2hlc0Zyb206IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpZiAodGhpcy5mcm9tID09PSBcIipcIikge1xuICAgICAgbWF0Y2hlc0Zyb20gPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmZyb20pKSB7XG4gICAgICBjb25zdCBhcnJheSA9IHRoaXMuZnJvbSBhcyBTdGF0ZVtdO1xuICAgICAgbWF0Y2hlc0Zyb20gPSBhcnJheS5zb21lKHN0YXRlID0+IHN0YXRlID09PSBmcm9tKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWF0Y2hlc0Zyb20gPSB0aGlzLmZyb20gPT09IGZyb207XG4gICAgfVxuICAgIGxldCBtYXRjaGVzVG86IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpZiAodGhpcy50byA9PT0gXCIqXCIpIHtcbiAgICAgIG1hdGNoZXNUbyA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRoaXMudG8pKSB7XG4gICAgICBjb25zdCBhcnJheSA9IHRoaXMudG8gYXMgU3RhdGVbXTtcbiAgICAgIG1hdGNoZXNUbyA9IGFycmF5LnNvbWUoc3RhdGUgPT4gc3RhdGUgPT09IHRvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWF0Y2hlc1RvID0gdGhpcy50byA9PT0gdG87XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoZXNGcm9tICYmIG1hdGNoZXNUbztcbiAgfVxufVxuIl19