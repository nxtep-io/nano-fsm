import FSM, { Action } from "../";
export interface Gate {
    name: string;
    password: string;
}
export declare enum GateState {
    OPENED = "opened",
    CLOSED = "closed",
    LOCKED = "locked"
}
export declare class OpenGateAction extends Action<Gate, GateState> {
    from: GateState;
    to: GateState;
}
export declare class CloseGateAction extends Action<Gate, GateState> {
    from: GateState;
    to: GateState;
}
export declare class LockGateAction extends Action<Gate, GateState> {
    from: GateState;
    to: GateState;
}
export declare class UnlockGateAction extends Action<Gate, GateState> {
    from: GateState;
    to: GateState;
    /**
     * Ensures the gate password is checked when unlocking.
     */
    onTransition(instance: Gate, data?: {
        password: string;
    }): Promise<boolean>;
}
export default class GateStateMachine extends FSM<Gate, GateState> {
    state: GateState;
    actions: (OpenGateAction | CloseGateAction | LockGateAction | UnlockGateAction)[];
}
