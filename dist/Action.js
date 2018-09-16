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
    onLeave(instance) {
        this.logger.silly(`${this.name}: leaving state "${this.from}"`);
    }
    onTransition(instance, data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.silly(`${this.name}: transitioning states "${this.from}" => "${this.to}"`);
            return true;
        });
    }
    onEnter(instance) {
        this.logger.silly(`${this.name}: entering "${this.to}"`);
    }
    matchesFrom(state) {
        return this.from === "*" || this.from === state;
    }
    matchesTo(state) {
        return this.to === "*" || this.to === state;
    }
}
exports.default = Action;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkRBQTZDO0FBTzdDLE1BQThCLE1BQU07SUFNbEMsWUFBc0IsVUFBeUIsRUFBRTtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMvQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUMvRCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSw0QkFBTSxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVNLE9BQU8sQ0FBQyxRQUFrQjtRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLG9CQUFvQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRVksWUFBWSxDQUFDLFFBQWtCLEVBQUUsSUFBVTs7WUFDdEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSwyQkFBMkIsSUFBSSxDQUFDLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN2RixPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVNLE9BQU8sQ0FBQyxRQUFrQjtRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLGVBQWUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVNLFdBQVcsQ0FBQyxLQUFrQjtRQUNuQyxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDO0lBQ2xELENBQUM7SUFFTSxTQUFTLENBQUMsS0FBa0I7UUFDakMsT0FBTyxJQUFJLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLEtBQUssQ0FBQztJQUM5QyxDQUFDO0NBQ0Y7QUEvQkQseUJBK0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcblxuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25PcHRpb25zIHtcbiAgbmFtZT86IHN0cmluZztcbiAgbG9nZ2VyPzogTG9nZ2VyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBBY3Rpb248SW5zdGFuY2UsIFN0YXRlPiB7XG4gIHB1YmxpYyBhYnN0cmFjdCBmcm9tOiBTdGF0ZSB8IHN0cmluZztcbiAgcHVibGljIGFic3RyYWN0IHRvOiBTdGF0ZSB8IHN0cmluZztcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHJvdGVjdGVkIGxvZ2dlcjtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgb3B0aW9uczogQWN0aW9uT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lIHx8IHRoaXMubmFtZSB8fCB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBuZXcgTG9nZ2VyKCk7XG4gIH1cblxuICBwdWJsaWMgb25MZWF2ZShpbnN0YW5jZTogSW5zdGFuY2UpOiB2b2lkIHtcbiAgICB0aGlzLmxvZ2dlci5zaWxseShgJHt0aGlzLm5hbWV9OiBsZWF2aW5nIHN0YXRlIFwiJHt0aGlzLmZyb219XCJgKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvblRyYW5zaXRpb24oaW5zdGFuY2U6IEluc3RhbmNlLCBkYXRhPzogYW55KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdGhpcy5sb2dnZXIuc2lsbHkoYCR7dGhpcy5uYW1lfTogdHJhbnNpdGlvbmluZyBzdGF0ZXMgXCIke3RoaXMuZnJvbX1cIiA9PiBcIiR7dGhpcy50b31cImApO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIG9uRW50ZXIoaW5zdGFuY2U6IEluc3RhbmNlKTogdm9pZCB7XG4gICAgdGhpcy5sb2dnZXIuc2lsbHkoYCR7dGhpcy5uYW1lfTogZW50ZXJpbmcgXCIke3RoaXMudG99XCJgKTtcbiAgfVxuXG4gIHB1YmxpYyBtYXRjaGVzRnJvbShzdGF0ZTogXCIqXCIgfCBTdGF0ZSkge1xuICAgIHJldHVybiB0aGlzLmZyb20gPT09IFwiKlwiIHx8IHRoaXMuZnJvbSA9PT0gc3RhdGU7XG4gIH1cblxuICBwdWJsaWMgbWF0Y2hlc1RvKHN0YXRlOiBcIipcIiB8IFN0YXRlKSB7XG4gICAgcmV0dXJuIHRoaXMudG8gPT09IFwiKlwiIHx8IHRoaXMudG8gPT09IHN0YXRlO1xuICB9XG59XG4iXX0=