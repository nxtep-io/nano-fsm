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
    beforeTransition(instance) {
        this.logger.silly(`${this.name}: leaving state "${this.from}"`);
    }
    onTransition(instance, data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.silly(`${this.name}: transitioning states "${this.from}" => "${this.to}"`);
            return true;
        });
    }
    afterTransition(instance) {
        this.logger.silly(`${this.name}: entering "${this.to}"`);
    }
    matches(from, to) {
        const matchesFrom = this.from === "*" || this.from === from;
        const matchesTo = this.to === "*" || this.to === to;
        return matchesFrom && matchesTo;
    }
}
exports.default = Action;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkRBQTZDO0FBYTdDLE1BQThCLE1BQU07SUFNbEMsWUFBc0IsVUFBeUIsRUFBRTtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMvQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUMvRCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSw0QkFBTSxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVNLGdCQUFnQixDQUFDLFFBQWtCO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksb0JBQW9CLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFWSxZQUFZLENBQUMsUUFBa0IsRUFBRSxJQUEyQjs7WUFDdkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSwyQkFBMkIsSUFBSSxDQUFDLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN2RixPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVNLGVBQWUsQ0FBQyxRQUFrQjtRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLGVBQWUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVNLE9BQU8sQ0FBQyxJQUFpQixFQUFFLEVBQWU7UUFDL0MsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUM7UUFDNUQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDcEQsT0FBTyxXQUFXLElBQUksU0FBUyxDQUFDO0lBQ2xDLENBQUM7Q0FDRjtBQTdCRCx5QkE2QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbk9wdGlvbnMge1xuICBuYW1lPzogc3RyaW5nO1xuICBsb2dnZXI/OiBMb2dnZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNpdGlvbkRhdGE8U3RhdGU+IHtcbiAgZnJvbTogU3RhdGU7XG4gIHRvOiBTdGF0ZTtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBBY3Rpb248SW5zdGFuY2UsIFN0YXRlPiB7XG4gIHB1YmxpYyBhYnN0cmFjdCBmcm9tOiBTdGF0ZSB8IHN0cmluZztcbiAgcHVibGljIGFic3RyYWN0IHRvOiBTdGF0ZSB8IHN0cmluZztcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHJvdGVjdGVkIGxvZ2dlcjtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgb3B0aW9uczogQWN0aW9uT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lIHx8IHRoaXMubmFtZSB8fCB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBuZXcgTG9nZ2VyKCk7XG4gIH1cblxuICBwdWJsaWMgYmVmb3JlVHJhbnNpdGlvbihpbnN0YW5jZTogSW5zdGFuY2UpOiB2b2lkIHtcbiAgICB0aGlzLmxvZ2dlci5zaWxseShgJHt0aGlzLm5hbWV9OiBsZWF2aW5nIHN0YXRlIFwiJHt0aGlzLmZyb219XCJgKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvblRyYW5zaXRpb24oaW5zdGFuY2U6IEluc3RhbmNlLCBkYXRhOiBUcmFuc2l0aW9uRGF0YTxTdGF0ZT4pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICB0aGlzLmxvZ2dlci5zaWxseShgJHt0aGlzLm5hbWV9OiB0cmFuc2l0aW9uaW5nIHN0YXRlcyBcIiR7dGhpcy5mcm9tfVwiID0+IFwiJHt0aGlzLnRvfVwiYCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgYWZ0ZXJUcmFuc2l0aW9uKGluc3RhbmNlOiBJbnN0YW5jZSk6IHZvaWQge1xuICAgIHRoaXMubG9nZ2VyLnNpbGx5KGAke3RoaXMubmFtZX06IGVudGVyaW5nIFwiJHt0aGlzLnRvfVwiYCk7XG4gIH1cblxuICBwdWJsaWMgbWF0Y2hlcyhmcm9tOiBcIipcIiB8IFN0YXRlLCB0bzogXCIqXCIgfCBTdGF0ZSkge1xuICAgIGNvbnN0IG1hdGNoZXNGcm9tID0gdGhpcy5mcm9tID09PSBcIipcIiB8fCB0aGlzLmZyb20gPT09IGZyb207XG4gICAgY29uc3QgbWF0Y2hlc1RvID0gdGhpcy50byA9PT0gXCIqXCIgfHwgdGhpcy50byA9PT0gdG87XG4gICAgcmV0dXJuIG1hdGNoZXNGcm9tICYmIG1hdGNoZXNUbztcbiAgfVxufVxuIl19