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
const __1 = require("../");
var GateState;
(function (GateState) {
    GateState["OPENED"] = "opened";
    GateState["CLOSED"] = "closed";
    GateState["LOCKED"] = "locked";
})(GateState = exports.GateState || (exports.GateState = {}));
class OpenGateAction extends __1.Action {
    constructor() {
        super(...arguments);
        this.from = GateState.CLOSED;
        this.to = GateState.OPENED;
    }
}
exports.OpenGateAction = OpenGateAction;
class CloseGateAction extends __1.Action {
    constructor() {
        super(...arguments);
        this.from = GateState.OPENED;
        this.to = GateState.CLOSED;
    }
}
exports.CloseGateAction = CloseGateAction;
class LockGateAction extends __1.Action {
    constructor() {
        super(...arguments);
        this.from = GateState.CLOSED;
        this.to = GateState.LOCKED;
    }
}
exports.LockGateAction = LockGateAction;
class UnlockGateAction extends __1.Action {
    constructor() {
        super(...arguments);
        this.from = GateState.LOCKED;
        this.to = GateState.CLOSED;
    }
    /**
     * Ensures the gate password is checked when unlocking.
     */
    onTransition(instance, data) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            if (data && instance.password === data.password) {
                return _super("onTransition").call(this, instance, data);
            }
            throw new Error("Invalid gate password, cannot unlock");
        });
    }
}
exports.UnlockGateAction = UnlockGateAction;
class LockedGateMessageAction extends __1.Action {
    constructor() {
        super(...arguments);
        this.from = '*';
        this.to = GateState.OPENED;
    }
    onTransition(instance, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.from === GateState.LOCKED) {
                this.logger.warn('Gate is locked! We need a password');
                return false;
            }
            return true;
        });
    }
}
exports.LockedGateMessageAction = LockedGateMessageAction;
class GateStateMachine extends __1.default {
    constructor() {
        super(...arguments);
        /* Sets the machine initial state */
        this.initialState = GateState.CLOSED;
        /* The available states */
        this.states = [
            GateState.OPENED,
            GateState.CLOSED,
            GateState.LOCKED,
        ];
        /* Sets the machine available actions */
        this.actions = [
            new OpenGateAction(),
            new CloseGateAction(),
            new LockGateAction(),
            new UnlockGateAction(),
            new LockedGateMessageAction(),
        ];
    }
}
exports.default = GateStateMachine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2F0ZVN0YXRlTWFjaGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zYW1wbGUvR2F0ZVN0YXRlTWFjaGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkJBQWtEO0FBT2xELElBQVksU0FJWDtBQUpELFdBQVksU0FBUztJQUNuQiw4QkFBaUIsQ0FBQTtJQUNqQiw4QkFBaUIsQ0FBQTtJQUNqQiw4QkFBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFJcEI7QUFFRCxNQUFhLGNBQWUsU0FBUSxVQUF1QjtJQUEzRDs7UUFDRSxTQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUN4QixPQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztJQUN4QixDQUFDO0NBQUE7QUFIRCx3Q0FHQztBQUVELE1BQWEsZUFBZ0IsU0FBUSxVQUF1QjtJQUE1RDs7UUFDRSxTQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUN4QixPQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztJQUN4QixDQUFDO0NBQUE7QUFIRCwwQ0FHQztBQUVELE1BQWEsY0FBZSxTQUFRLFVBQXVCO0lBQTNEOztRQUNFLFNBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ3hCLE9BQUUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO0lBQ3hCLENBQUM7Q0FBQTtBQUhELHdDQUdDO0FBRUQsTUFBYSxnQkFBaUIsU0FBUSxVQUF1QjtJQUE3RDs7UUFDRSxTQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUN4QixPQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztJQVd4QixDQUFDO0lBVEM7O09BRUc7SUFDRyxZQUFZLENBQUMsUUFBYyxFQUFFLElBQXNEOzs7WUFDdkYsSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUMvQyxPQUFPLHNCQUFrQixZQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUU7YUFDM0M7WUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDMUQsQ0FBQztLQUFBO0NBQ0Y7QUFiRCw0Q0FhQztBQUVELE1BQWEsdUJBQXdCLFNBQVEsVUFBdUI7SUFBcEU7O1FBQ0UsU0FBSSxHQUFHLEdBQUcsQ0FBQztRQUNYLE9BQUUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO0lBU3hCLENBQUM7SUFQTyxZQUFZLENBQUMsUUFBYyxFQUFFLElBQStCOztZQUNoRSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQztnQkFDdkQsT0FBTyxLQUFLLENBQUM7YUFDZDtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0NBQ0Y7QUFYRCwwREFXQztBQUVELE1BQXFCLGdCQUFpQixTQUFRLFdBQW9CO0lBQWxFOztRQUNFLG9DQUFvQztRQUNwQyxpQkFBWSxHQUFjLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFFM0MsMEJBQTBCO1FBQzFCLFdBQU0sR0FBZ0I7WUFDcEIsU0FBUyxDQUFDLE1BQU07WUFDaEIsU0FBUyxDQUFDLE1BQU07WUFDaEIsU0FBUyxDQUFDLE1BQU07U0FDakIsQ0FBQztRQUVGLHdDQUF3QztRQUN4QyxZQUFPLEdBQUc7WUFDUixJQUFJLGNBQWMsRUFBRTtZQUNwQixJQUFJLGVBQWUsRUFBRTtZQUNyQixJQUFJLGNBQWMsRUFBRTtZQUNwQixJQUFJLGdCQUFnQixFQUFFO1lBQ3RCLElBQUksdUJBQXVCLEVBQUU7U0FDOUIsQ0FBQztJQUNKLENBQUM7Q0FBQTtBQW5CRCxtQ0FtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRlNNLCB7IEFjdGlvbiwgVHJhbnNpdGlvbkRhdGEgfSBmcm9tIFwiLi4vXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2F0ZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgcGFzc3dvcmQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGVudW0gR2F0ZVN0YXRlIHtcbiAgT1BFTkVEID0gXCJvcGVuZWRcIiwgLy8gR2F0ZSBpcyBvcGVuZWQgZm9yIHRyYXZlbGVyc1xuICBDTE9TRUQgPSBcImNsb3NlZFwiLCAvLyBHYXRlIGlzIGNsb3NlZCBidXQgdW5sb2NrZWQsIGl0IG1heSBiZSBvcGVuZWQgYnkgdHJhdmVsZXJzXG4gIExPQ0tFRCA9IFwibG9ja2VkXCIsIC8vIEdhdGUgaXMgY2xvc2VkIGFuZCBsb2NrZWQsIGNhbm5vdCB1bmxvY2sgd2l0aG91dCBhIHBhc3N3b3JkXG59XG5cbmV4cG9ydCBjbGFzcyBPcGVuR2F0ZUFjdGlvbiBleHRlbmRzIEFjdGlvbjxHYXRlLCBHYXRlU3RhdGU+IHtcbiAgZnJvbSA9IEdhdGVTdGF0ZS5DTE9TRUQ7XG4gIHRvID0gR2F0ZVN0YXRlLk9QRU5FRDtcbn1cblxuZXhwb3J0IGNsYXNzIENsb3NlR2F0ZUFjdGlvbiBleHRlbmRzIEFjdGlvbjxHYXRlLCBHYXRlU3RhdGU+IHtcbiAgZnJvbSA9IEdhdGVTdGF0ZS5PUEVORUQ7XG4gIHRvID0gR2F0ZVN0YXRlLkNMT1NFRDtcbn1cblxuZXhwb3J0IGNsYXNzIExvY2tHYXRlQWN0aW9uIGV4dGVuZHMgQWN0aW9uPEdhdGUsIEdhdGVTdGF0ZT4ge1xuICBmcm9tID0gR2F0ZVN0YXRlLkNMT1NFRDtcbiAgdG8gPSBHYXRlU3RhdGUuTE9DS0VEO1xufVxuXG5leHBvcnQgY2xhc3MgVW5sb2NrR2F0ZUFjdGlvbiBleHRlbmRzIEFjdGlvbjxHYXRlLCBHYXRlU3RhdGU+IHtcbiAgZnJvbSA9IEdhdGVTdGF0ZS5MT0NLRUQ7XG4gIHRvID0gR2F0ZVN0YXRlLkNMT1NFRDtcblxuICAvKipcbiAgICogRW5zdXJlcyB0aGUgZ2F0ZSBwYXNzd29yZCBpcyBjaGVja2VkIHdoZW4gdW5sb2NraW5nLlxuICAgKi9cbiAgYXN5bmMgb25UcmFuc2l0aW9uKGluc3RhbmNlOiBHYXRlLCBkYXRhOiBUcmFuc2l0aW9uRGF0YTxHYXRlU3RhdGU+ICYgeyBwYXNzd29yZDogc3RyaW5nIH0pIHtcbiAgICBpZiAoZGF0YSAmJiBpbnN0YW5jZS5wYXNzd29yZCA9PT0gZGF0YS5wYXNzd29yZCkge1xuICAgICAgcmV0dXJuIHN1cGVyLm9uVHJhbnNpdGlvbihpbnN0YW5jZSwgZGF0YSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZ2F0ZSBwYXNzd29yZCwgY2Fubm90IHVubG9ja1wiKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTG9ja2VkR2F0ZU1lc3NhZ2VBY3Rpb24gZXh0ZW5kcyBBY3Rpb248R2F0ZSwgR2F0ZVN0YXRlPiB7XG4gIGZyb20gPSAnKic7XG4gIHRvID0gR2F0ZVN0YXRlLk9QRU5FRDtcblxuICBhc3luYyBvblRyYW5zaXRpb24oaW5zdGFuY2U6IEdhdGUsIGRhdGE6IFRyYW5zaXRpb25EYXRhPEdhdGVTdGF0ZT4pIHtcbiAgICBpZiAoZGF0YS5mcm9tID09PSBHYXRlU3RhdGUuTE9DS0VEKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKCdHYXRlIGlzIGxvY2tlZCEgV2UgbmVlZCBhIHBhc3N3b3JkJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhdGVTdGF0ZU1hY2hpbmUgZXh0ZW5kcyBGU008R2F0ZSwgR2F0ZVN0YXRlPiB7XG4gIC8qIFNldHMgdGhlIG1hY2hpbmUgaW5pdGlhbCBzdGF0ZSAqL1xuICBpbml0aWFsU3RhdGU6IEdhdGVTdGF0ZSA9IEdhdGVTdGF0ZS5DTE9TRUQ7XG5cbiAgLyogVGhlIGF2YWlsYWJsZSBzdGF0ZXMgKi9cbiAgc3RhdGVzOiBHYXRlU3RhdGVbXSA9IFtcbiAgICBHYXRlU3RhdGUuT1BFTkVELFxuICAgIEdhdGVTdGF0ZS5DTE9TRUQsXG4gICAgR2F0ZVN0YXRlLkxPQ0tFRCxcbiAgXTtcblxuICAvKiBTZXRzIHRoZSBtYWNoaW5lIGF2YWlsYWJsZSBhY3Rpb25zICovXG4gIGFjdGlvbnMgPSBbXG4gICAgbmV3IE9wZW5HYXRlQWN0aW9uKCksXG4gICAgbmV3IENsb3NlR2F0ZUFjdGlvbigpLFxuICAgIG5ldyBMb2NrR2F0ZUFjdGlvbigpLFxuICAgIG5ldyBVbmxvY2tHYXRlQWN0aW9uKCksXG4gICAgbmV3IExvY2tlZEdhdGVNZXNzYWdlQWN0aW9uKCksXG4gIF07XG59XG4iXX0=