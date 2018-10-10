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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkRBQTZDO0FBa0I3QyxNQUE4QixNQUFNO0lBTWxDLFlBQXNCLFVBQXlCLEVBQUU7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDL0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLElBQUksNEJBQU0sRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRDs7O09BR0c7SUFDSSxnQkFBZ0IsQ0FBQyxRQUFrQjtRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLG9CQUFvQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVSxZQUFZLENBQUMsUUFBa0IsRUFBRSxJQUFvQzs7WUFDaEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSwyQkFBMkIsSUFBSSxDQUFDLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2pHLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNJLGVBQWUsQ0FBQyxRQUFrQjtRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLGVBQWUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksT0FBTyxDQUFDLElBQWlCLEVBQUUsRUFBZTtRQUMvQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQztRQUM1RCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUNwRCxPQUFPLFdBQVcsSUFBSSxTQUFTLENBQUM7SUFDbEMsQ0FBQztDQUNGO0FBbERELHlCQWtEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uT3B0aW9ucyB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGxvZ2dlcj86IExvZ2dlcjtcbn1cblxuZXhwb3J0IHR5cGUgVHJhbnNpdGlvbkJhc2ljRGF0YTxTdGF0ZT4gPSB7XG4gIGZyb206IFN0YXRlO1xuICB0bzogU3RhdGU7XG59XG5cbmV4cG9ydCB0eXBlIFRyYW5zaXRpb25QYXlsb2FkPFBheWxvYWQ+ID0ge1xuICBba2V5IGluIGtleW9mIFBheWxvYWRdPzogUGF5bG9hZFtrZXldO1xufVxuXG5leHBvcnQgdHlwZSBUcmFuc2l0aW9uRGF0YTxTdGF0ZSwgUGF5bG9hZCA9IGFueT4gPSBUcmFuc2l0aW9uQmFzaWNEYXRhPFN0YXRlPiAmIFRyYW5zaXRpb25QYXlsb2FkPFBheWxvYWQ+O1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBBY3Rpb248SW5zdGFuY2UsIFN0YXRlLCBQYXlsb2FkID0gYW55PiB7XG4gIHB1YmxpYyBhYnN0cmFjdCBmcm9tOiBTdGF0ZSB8IHN0cmluZztcbiAgcHVibGljIGFic3RyYWN0IHRvOiBTdGF0ZSB8IHN0cmluZztcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHJvdGVjdGVkIGxvZ2dlcjtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgb3B0aW9uczogQWN0aW9uT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lIHx8IHRoaXMubmFtZSB8fCB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBuZXcgTG9nZ2VyKCk7XG4gIH1cblxuICAvKipcbiAgICogXG4gICAqIEBwYXJhbSBpbnN0YW5jZSBUaGUgc3RhdGUgbWFjaGluZSBpbnN0YW5jZVxuICAgKi9cbiAgcHVibGljIGJlZm9yZVRyYW5zaXRpb24oaW5zdGFuY2U6IEluc3RhbmNlKTogdm9pZCB7XG4gICAgdGhpcy5sb2dnZXIuc2lsbHkoYCR7dGhpcy5uYW1lfTogbGVhdmluZyBzdGF0ZSBcIiR7dGhpcy5mcm9tfVwiYCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhIHN0YXRlIHRyYW5zaXRpb25cbiAgICogXG4gICAqIEBwYXJhbSBpbnN0YW5jZSBUaGUgc3RhdGUgbWFjaGluZSBpbnN0YW5jZS5cbiAgICogQHBhcmFtIGRhdGEgVGhlIHRyYW5zaXRpb24gcGF5bG9hZCBwYXNzZWQgdG8gdGhlIGZzbS5nb1RvKCkgbWV0aG9kLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIG9uVHJhbnNpdGlvbihpbnN0YW5jZTogSW5zdGFuY2UsIGRhdGE6IFRyYW5zaXRpb25EYXRhPFN0YXRlLCBQYXlsb2FkPik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHRoaXMubG9nZ2VyLnNpbGx5KGAke3RoaXMubmFtZX06IHRyYW5zaXRpb25pbmcgc3RhdGVzIFwiJHt0aGlzLmZyb219XCIgPT4gXCIke3RoaXMudG99XCJgLCB7IGRhdGEgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwb3N0IHRyYW5zaXRpb24gcmVzdWx0cy5cbiAgICogXG4gICAqIEBwYXJhbSBpbnN0YW5jZSBUaGUgc3RhdGUgbWFjaGluZSBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBhZnRlclRyYW5zaXRpb24oaW5zdGFuY2U6IEluc3RhbmNlKTogdm9pZCB7XG4gICAgdGhpcy5sb2dnZXIuc2lsbHkoYCR7dGhpcy5uYW1lfTogZW50ZXJpbmcgXCIke3RoaXMudG99XCJgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYWN0aW9uIG1hdGNoZXMgZnJvbS90byBzdGF0ZSBwYWlyIHNwZWNpZmllZC5cbiAgICogXG4gICAqIEBwYXJhbSBmcm9tIFRoZSBvcmlnaW5hbCBzdGF0ZSB0byBiZSBjaGVja2VkIGFnYWluc3QuXG4gICAqIEBwYXJhbSB0byBUaGUgZGVzdGluYXRpb24gc3RhdGUgdG8gYmUgY2hlY2tlZCBhZ2FpbnN0LlxuICAgKi9cbiAgcHVibGljIG1hdGNoZXMoZnJvbTogXCIqXCIgfCBTdGF0ZSwgdG86IFwiKlwiIHwgU3RhdGUpOiBib29sZWFuIHtcbiAgICBjb25zdCBtYXRjaGVzRnJvbSA9IHRoaXMuZnJvbSA9PT0gXCIqXCIgfHwgdGhpcy5mcm9tID09PSBmcm9tO1xuICAgIGNvbnN0IG1hdGNoZXNUbyA9IHRoaXMudG8gPT09IFwiKlwiIHx8IHRoaXMudG8gPT09IHRvO1xuICAgIHJldHVybiBtYXRjaGVzRnJvbSAmJiBtYXRjaGVzVG87XG4gIH1cbn1cbiJdfQ==