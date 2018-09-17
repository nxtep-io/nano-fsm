import FSM, { Action, TransitionData } from "../";
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
    onTransition(instance: Gate, data: TransitionData<GateState> & {
        password: string;
    }): Promise<boolean>;
}
export declare class LockedGateMessageAction extends Action<Gate, GateState> {
    from: string;
    to: GateState;
    onTransition(instance: Gate, data: TransitionData<GateState>): Promise<boolean>;
}
export default class GateStateMachine extends FSM<Gate, GateState> {
    initialState: GateState;
    states: GateState[];
    actions: (OpenGateAction | CloseGateAction | LockGateAction | UnlockGateAction | LockedGateMessageAction)[];
}
