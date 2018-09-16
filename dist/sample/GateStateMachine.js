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
class GateStateMachine extends __1.default {
    constructor() {
        super(...arguments);
        /* Sets the machine initial state */
        this.state = GateState.CLOSED;
        /* Sets the machine available actions */
        this.actions = [new OpenGateAction(), new CloseGateAction(), new LockGateAction(), new UnlockGateAction()];
    }
}
exports.default = GateStateMachine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2F0ZVN0YXRlTWFjaGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zYW1wbGUvR2F0ZVN0YXRlTWFjaGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkJBQWtDO0FBT2xDLElBQVksU0FJWDtBQUpELFdBQVksU0FBUztJQUNuQiw4QkFBaUIsQ0FBQTtJQUNqQiw4QkFBaUIsQ0FBQTtJQUNqQiw4QkFBaUIsQ0FBQSxDQUFDLDhEQUE4RDtBQUNsRixDQUFDLEVBSlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFJcEI7QUFFRCxNQUFhLGNBQWUsU0FBUSxVQUF1QjtJQUEzRDs7UUFDRSxTQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUN4QixPQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztJQUN4QixDQUFDO0NBQUE7QUFIRCx3Q0FHQztBQUVELE1BQWEsZUFBZ0IsU0FBUSxVQUF1QjtJQUE1RDs7UUFDRSxTQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUN4QixPQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztJQUN4QixDQUFDO0NBQUE7QUFIRCwwQ0FHQztBQUVELE1BQWEsY0FBZSxTQUFRLFVBQXVCO0lBQTNEOztRQUNFLFNBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ3hCLE9BQUUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO0lBQ3hCLENBQUM7Q0FBQTtBQUhELHdDQUdDO0FBRUQsTUFBYSxnQkFBaUIsU0FBUSxVQUF1QjtJQUE3RDs7UUFDRSxTQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUN4QixPQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztJQVd4QixDQUFDO0lBVEM7O09BRUc7SUFDRyxZQUFZLENBQUMsUUFBYyxFQUFFLElBQTJCOzs7WUFDNUQsSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUMvQyxPQUFPLHNCQUFrQixZQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUU7YUFDM0M7WUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDMUQsQ0FBQztLQUFBO0NBQ0Y7QUFiRCw0Q0FhQztBQUVELE1BQXFCLGdCQUFpQixTQUFRLFdBQW9CO0lBQWxFOztRQUNFLG9DQUFvQztRQUNwQyxVQUFLLEdBQWMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUVwQyx3Q0FBd0M7UUFDeEMsWUFBTyxHQUFHLENBQUMsSUFBSSxjQUFjLEVBQUUsRUFBRSxJQUFJLGVBQWUsRUFBRSxFQUFFLElBQUksY0FBYyxFQUFFLEVBQUUsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDeEcsQ0FBQztDQUFBO0FBTkQsbUNBTUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRlNNLCB7IEFjdGlvbiB9IGZyb20gXCIuLi9cIjtcblxuZXhwb3J0IGludGVyZmFjZSBHYXRlIHtcbiAgbmFtZTogc3RyaW5nO1xuICBwYXNzd29yZDogc3RyaW5nO1xufVxuXG5leHBvcnQgZW51bSBHYXRlU3RhdGUge1xuICBPUEVORUQgPSBcIm9wZW5lZFwiLCAvLyBHYXRlIGlzIG9wZW5lZCBmb3IgdHJhdmVsZXJzXG4gIENMT1NFRCA9IFwiY2xvc2VkXCIsIC8vIEdhdGUgaXMgY2xvc2VkIGJ1dCB1bmxvY2tlZCwgaXQgbWF5IGJlIG9wZW5lZCBieSB0cmF2ZWxlcnNcbiAgTE9DS0VEID0gXCJsb2NrZWRcIiAvLyBHYXRlIGlzIGNsb3NlZCBhbmQgbG9ja2VkLCBjYW5ub3QgdW5sb2NrIHdpdGhvdXQgYSBwYXNzd29yZFxufVxuXG5leHBvcnQgY2xhc3MgT3BlbkdhdGVBY3Rpb24gZXh0ZW5kcyBBY3Rpb248R2F0ZSwgR2F0ZVN0YXRlPiB7XG4gIGZyb20gPSBHYXRlU3RhdGUuQ0xPU0VEO1xuICB0byA9IEdhdGVTdGF0ZS5PUEVORUQ7XG59XG5cbmV4cG9ydCBjbGFzcyBDbG9zZUdhdGVBY3Rpb24gZXh0ZW5kcyBBY3Rpb248R2F0ZSwgR2F0ZVN0YXRlPiB7XG4gIGZyb20gPSBHYXRlU3RhdGUuT1BFTkVEO1xuICB0byA9IEdhdGVTdGF0ZS5DTE9TRUQ7XG59XG5cbmV4cG9ydCBjbGFzcyBMb2NrR2F0ZUFjdGlvbiBleHRlbmRzIEFjdGlvbjxHYXRlLCBHYXRlU3RhdGU+IHtcbiAgZnJvbSA9IEdhdGVTdGF0ZS5DTE9TRUQ7XG4gIHRvID0gR2F0ZVN0YXRlLkxPQ0tFRDtcbn1cblxuZXhwb3J0IGNsYXNzIFVubG9ja0dhdGVBY3Rpb24gZXh0ZW5kcyBBY3Rpb248R2F0ZSwgR2F0ZVN0YXRlPiB7XG4gIGZyb20gPSBHYXRlU3RhdGUuTE9DS0VEO1xuICB0byA9IEdhdGVTdGF0ZS5DTE9TRUQ7XG5cbiAgLyoqXG4gICAqIEVuc3VyZXMgdGhlIGdhdGUgcGFzc3dvcmQgaXMgY2hlY2tlZCB3aGVuIHVubG9ja2luZy5cbiAgICovXG4gIGFzeW5jIG9uVHJhbnNpdGlvbihpbnN0YW5jZTogR2F0ZSwgZGF0YT86IHsgcGFzc3dvcmQ6IHN0cmluZyB9KSB7XG4gICAgaWYgKGRhdGEgJiYgaW5zdGFuY2UucGFzc3dvcmQgPT09IGRhdGEucGFzc3dvcmQpIHtcbiAgICAgIHJldHVybiBzdXBlci5vblRyYW5zaXRpb24oaW5zdGFuY2UsIGRhdGEpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGdhdGUgcGFzc3dvcmQsIGNhbm5vdCB1bmxvY2tcIik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2F0ZVN0YXRlTWFjaGluZSBleHRlbmRzIEZTTTxHYXRlLCBHYXRlU3RhdGU+IHtcbiAgLyogU2V0cyB0aGUgbWFjaGluZSBpbml0aWFsIHN0YXRlICovXG4gIHN0YXRlOiBHYXRlU3RhdGUgPSBHYXRlU3RhdGUuQ0xPU0VEO1xuXG4gIC8qIFNldHMgdGhlIG1hY2hpbmUgYXZhaWxhYmxlIGFjdGlvbnMgKi9cbiAgYWN0aW9ucyA9IFtuZXcgT3BlbkdhdGVBY3Rpb24oKSwgbmV3IENsb3NlR2F0ZUFjdGlvbigpLCBuZXcgTG9ja0dhdGVBY3Rpb24oKSwgbmV3IFVubG9ja0dhdGVBY3Rpb24oKV07XG59XG4iXX0=