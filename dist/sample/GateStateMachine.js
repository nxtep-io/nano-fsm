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
    GateState["LOCKED"] = "locked"; // Gate is closed and locked, cannot unlock without a password
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2F0ZVN0YXRlTWFjaGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zYW1wbGUvR2F0ZVN0YXRlTWFjaGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkJBQWtEO0FBT2xELElBQVksU0FJWDtBQUpELFdBQVksU0FBUztJQUNuQiw4QkFBaUIsQ0FBQTtJQUNqQiw4QkFBaUIsQ0FBQTtJQUNqQiw4QkFBaUIsQ0FBQSxDQUFDLDhEQUE4RDtBQUNsRixDQUFDLEVBSlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFJcEI7QUFFRCxNQUFhLGNBQWUsU0FBUSxVQUF1QjtJQUEzRDs7UUFDRSxTQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUN4QixPQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztJQUN4QixDQUFDO0NBQUE7QUFIRCx3Q0FHQztBQUVELE1BQWEsZUFBZ0IsU0FBUSxVQUF1QjtJQUE1RDs7UUFDRSxTQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUN4QixPQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztJQUN4QixDQUFDO0NBQUE7QUFIRCwwQ0FHQztBQUVELE1BQWEsY0FBZSxTQUFRLFVBQXVCO0lBQTNEOztRQUNFLFNBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ3hCLE9BQUUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO0lBQ3hCLENBQUM7Q0FBQTtBQUhELHdDQUdDO0FBRUQsTUFBYSxnQkFBaUIsU0FBUSxVQUF1QjtJQUE3RDs7UUFDRSxTQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUN4QixPQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztJQVd4QixDQUFDO0lBVEM7O09BRUc7SUFDRyxZQUFZLENBQUMsUUFBYyxFQUFFLElBQXNEOzs7WUFDdkYsSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUMvQyxPQUFPLHNCQUFrQixZQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUU7YUFDM0M7WUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDMUQsQ0FBQztLQUFBO0NBQ0Y7QUFiRCw0Q0FhQztBQUVELE1BQWEsdUJBQXdCLFNBQVEsVUFBdUI7SUFBcEU7O1FBQ0UsU0FBSSxHQUFHLEdBQUcsQ0FBQztRQUNYLE9BQUUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO0lBU3hCLENBQUM7SUFQTyxZQUFZLENBQUMsUUFBYyxFQUFFLElBQStCOztZQUNoRSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQztnQkFDdkQsT0FBTyxLQUFLLENBQUM7YUFDZDtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0NBQ0Y7QUFYRCwwREFXQztBQUVELE1BQXFCLGdCQUFpQixTQUFRLFdBQW9CO0lBQWxFOztRQUNFLG9DQUFvQztRQUNwQyxpQkFBWSxHQUFjLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFFM0Msd0NBQXdDO1FBQ3hDLFlBQU8sR0FBRztZQUNSLElBQUksY0FBYyxFQUFFO1lBQ3BCLElBQUksZUFBZSxFQUFFO1lBQ3JCLElBQUksY0FBYyxFQUFFO1lBQ3BCLElBQUksZ0JBQWdCLEVBQUU7WUFDdEIsSUFBSSx1QkFBdUIsRUFBRTtTQUM5QixDQUFDO0lBQ0osQ0FBQztDQUFBO0FBWkQsbUNBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRlNNLCB7IEFjdGlvbiwgVHJhbnNpdGlvbkRhdGEgfSBmcm9tIFwiLi4vXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2F0ZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgcGFzc3dvcmQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGVudW0gR2F0ZVN0YXRlIHtcbiAgT1BFTkVEID0gXCJvcGVuZWRcIiwgLy8gR2F0ZSBpcyBvcGVuZWQgZm9yIHRyYXZlbGVyc1xuICBDTE9TRUQgPSBcImNsb3NlZFwiLCAvLyBHYXRlIGlzIGNsb3NlZCBidXQgdW5sb2NrZWQsIGl0IG1heSBiZSBvcGVuZWQgYnkgdHJhdmVsZXJzXG4gIExPQ0tFRCA9IFwibG9ja2VkXCIgLy8gR2F0ZSBpcyBjbG9zZWQgYW5kIGxvY2tlZCwgY2Fubm90IHVubG9jayB3aXRob3V0IGEgcGFzc3dvcmRcbn1cblxuZXhwb3J0IGNsYXNzIE9wZW5HYXRlQWN0aW9uIGV4dGVuZHMgQWN0aW9uPEdhdGUsIEdhdGVTdGF0ZT4ge1xuICBmcm9tID0gR2F0ZVN0YXRlLkNMT1NFRDtcbiAgdG8gPSBHYXRlU3RhdGUuT1BFTkVEO1xufVxuXG5leHBvcnQgY2xhc3MgQ2xvc2VHYXRlQWN0aW9uIGV4dGVuZHMgQWN0aW9uPEdhdGUsIEdhdGVTdGF0ZT4ge1xuICBmcm9tID0gR2F0ZVN0YXRlLk9QRU5FRDtcbiAgdG8gPSBHYXRlU3RhdGUuQ0xPU0VEO1xufVxuXG5leHBvcnQgY2xhc3MgTG9ja0dhdGVBY3Rpb24gZXh0ZW5kcyBBY3Rpb248R2F0ZSwgR2F0ZVN0YXRlPiB7XG4gIGZyb20gPSBHYXRlU3RhdGUuQ0xPU0VEO1xuICB0byA9IEdhdGVTdGF0ZS5MT0NLRUQ7XG59XG5cbmV4cG9ydCBjbGFzcyBVbmxvY2tHYXRlQWN0aW9uIGV4dGVuZHMgQWN0aW9uPEdhdGUsIEdhdGVTdGF0ZT4ge1xuICBmcm9tID0gR2F0ZVN0YXRlLkxPQ0tFRDtcbiAgdG8gPSBHYXRlU3RhdGUuQ0xPU0VEO1xuXG4gIC8qKlxuICAgKiBFbnN1cmVzIHRoZSBnYXRlIHBhc3N3b3JkIGlzIGNoZWNrZWQgd2hlbiB1bmxvY2tpbmcuXG4gICAqL1xuICBhc3luYyBvblRyYW5zaXRpb24oaW5zdGFuY2U6IEdhdGUsIGRhdGE6IFRyYW5zaXRpb25EYXRhPEdhdGVTdGF0ZT4gJiB7IHBhc3N3b3JkOiBzdHJpbmcgfSkge1xuICAgIGlmIChkYXRhICYmIGluc3RhbmNlLnBhc3N3b3JkID09PSBkYXRhLnBhc3N3b3JkKSB7XG4gICAgICByZXR1cm4gc3VwZXIub25UcmFuc2l0aW9uKGluc3RhbmNlLCBkYXRhKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBnYXRlIHBhc3N3b3JkLCBjYW5ub3QgdW5sb2NrXCIpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2NrZWRHYXRlTWVzc2FnZUFjdGlvbiBleHRlbmRzIEFjdGlvbjxHYXRlLCBHYXRlU3RhdGU+IHtcbiAgZnJvbSA9ICcqJztcbiAgdG8gPSBHYXRlU3RhdGUuT1BFTkVEO1xuXG4gIGFzeW5jIG9uVHJhbnNpdGlvbihpbnN0YW5jZTogR2F0ZSwgZGF0YTogVHJhbnNpdGlvbkRhdGE8R2F0ZVN0YXRlPikge1xuICAgIGlmIChkYXRhLmZyb20gPT09IEdhdGVTdGF0ZS5MT0NLRUQpIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ0dhdGUgaXMgbG9ja2VkISBXZSBuZWVkIGEgcGFzc3dvcmQnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2F0ZVN0YXRlTWFjaGluZSBleHRlbmRzIEZTTTxHYXRlLCBHYXRlU3RhdGU+IHtcbiAgLyogU2V0cyB0aGUgbWFjaGluZSBpbml0aWFsIHN0YXRlICovXG4gIGluaXRpYWxTdGF0ZTogR2F0ZVN0YXRlID0gR2F0ZVN0YXRlLkNMT1NFRDtcblxuICAvKiBTZXRzIHRoZSBtYWNoaW5lIGF2YWlsYWJsZSBhY3Rpb25zICovXG4gIGFjdGlvbnMgPSBbXG4gICAgbmV3IE9wZW5HYXRlQWN0aW9uKCksXG4gICAgbmV3IENsb3NlR2F0ZUFjdGlvbigpLFxuICAgIG5ldyBMb2NrR2F0ZUFjdGlvbigpLFxuICAgIG5ldyBVbmxvY2tHYXRlQWN0aW9uKCksXG4gICAgbmV3IExvY2tlZEdhdGVNZXNzYWdlQWN0aW9uKCksXG4gIF07XG59XG4iXX0=