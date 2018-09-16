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
class FSM {
    constructor(instance, options = {}) {
        this.instance = instance;
        this.options = options;
        this.logger = options.logger || new ts_framework_common_1.Logger();
        this.logger.silly("Initializing new finite machine state", this.options);
    }
    goTo(to, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: We should not enable more than one equal pair
            const action = this.actions.find(action => action.matchesFrom(this.state) && action.matchesTo(to));
            if (action) {
                // Notify we're leaving the current state
                yield action.onLeave(this.instance);
                // Check if we can transition to the next state
                const ok = yield action.onTransition(this.instance, data);
                if (ok) {
                    // Set the next state locally
                    this.state = to;
                    // Notify we're entered the next state
                    yield action.onEnter(this.instance);
                }
            }
            else {
                throw new Error(`No action available to transition from "${this.state}" to "${to}" state.`);
            }
        });
    }
}
exports.default = FSM;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmluaXRlU3RhdGVNYWNoaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0Zpbml0ZVN0YXRlTWFjaGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkRBQTZDO0FBTzdDLE1BQThCLEdBQUc7SUFLL0IsWUFBbUIsUUFBa0IsRUFBWSxVQUFzQixFQUFFO1FBQXRELGFBQVEsR0FBUixRQUFRLENBQVU7UUFBWSxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUN2RSxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSw0QkFBTSxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsdUNBQXVDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFWSxJQUFJLENBQUMsRUFBUyxFQUFFLElBQVU7O1lBQ3JDLHNEQUFzRDtZQUN0RCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVuRyxJQUFJLE1BQU0sRUFBRTtnQkFDVix5Q0FBeUM7Z0JBQ3pDLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRXBDLCtDQUErQztnQkFDL0MsTUFBTSxFQUFFLEdBQUcsTUFBTSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRTFELElBQUksRUFBRSxFQUFFO29CQUNOLDZCQUE2QjtvQkFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7b0JBRWhCLHNDQUFzQztvQkFDdEMsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDckM7YUFDRjtpQkFBTTtnQkFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDN0Y7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQWhDRCxzQkFnQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IEFjdGlvbiBmcm9tIFwiLi9BY3Rpb25cIjtcblxuZXhwb3J0IGludGVyZmFjZSBGU01PcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBGU008SW5zdGFuY2UsIFN0YXRlPiB7XG4gIHB1YmxpYyBhYnN0cmFjdCBzdGF0ZTogU3RhdGU7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhY3Rpb25zOiBBY3Rpb248SW5zdGFuY2UsIFN0YXRlPltdO1xuICBwcm90ZWN0ZWQgbG9nZ2VyOiBMb2dnZXI7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGluc3RhbmNlOiBJbnN0YW5jZSwgcHJvdGVjdGVkIG9wdGlvbnM6IEZTTU9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgbmV3IExvZ2dlcigpO1xuICAgIHRoaXMubG9nZ2VyLnNpbGx5KFwiSW5pdGlhbGl6aW5nIG5ldyBmaW5pdGUgbWFjaGluZSBzdGF0ZVwiLCB0aGlzLm9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdvVG8odG86IFN0YXRlLCBkYXRhPzogYW55KSB7XG4gICAgLy8gVE9ETzogV2Ugc2hvdWxkIG5vdCBlbmFibGUgbW9yZSB0aGFuIG9uZSBlcXVhbCBwYWlyXG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5hY3Rpb25zLmZpbmQoYWN0aW9uID0+IGFjdGlvbi5tYXRjaGVzRnJvbSh0aGlzLnN0YXRlKSAmJiBhY3Rpb24ubWF0Y2hlc1RvKHRvKSk7XG5cbiAgICBpZiAoYWN0aW9uKSB7XG4gICAgICAvLyBOb3RpZnkgd2UncmUgbGVhdmluZyB0aGUgY3VycmVudCBzdGF0ZVxuICAgICAgYXdhaXQgYWN0aW9uLm9uTGVhdmUodGhpcy5pbnN0YW5jZSk7XG5cbiAgICAgIC8vIENoZWNrIGlmIHdlIGNhbiB0cmFuc2l0aW9uIHRvIHRoZSBuZXh0IHN0YXRlXG4gICAgICBjb25zdCBvayA9IGF3YWl0IGFjdGlvbi5vblRyYW5zaXRpb24odGhpcy5pbnN0YW5jZSwgZGF0YSk7XG5cbiAgICAgIGlmIChvaykge1xuICAgICAgICAvLyBTZXQgdGhlIG5leHQgc3RhdGUgbG9jYWxseVxuICAgICAgICB0aGlzLnN0YXRlID0gdG87XG5cbiAgICAgICAgLy8gTm90aWZ5IHdlJ3JlIGVudGVyZWQgdGhlIG5leHQgc3RhdGVcbiAgICAgICAgYXdhaXQgYWN0aW9uLm9uRW50ZXIodGhpcy5pbnN0YW5jZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gYWN0aW9uIGF2YWlsYWJsZSB0byB0cmFuc2l0aW9uIGZyb20gXCIke3RoaXMuc3RhdGV9XCIgdG8gXCIke3RvfVwiIHN0YXRlLmApO1xuICAgIH1cbiAgfVxufVxuIl19