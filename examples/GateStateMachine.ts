import FSM, { Action, TransitionData } from "../lib";

export interface Gate {
  name: string;
  password: string;
}

export enum GateState {
  OPENED = "opened", // Gate is opened for travelers
  CLOSED = "closed", // Gate is closed but unlocked, it may be opened by travelers
  LOCKED = "locked", // Gate is closed and locked, cannot unlock without a password
  EXPLODED = "exploded", // Gate is exploded and can't be acted upon anymore
}

export class OpenGateAction extends Action<Gate, GateState> {
  from = GateState.CLOSED;
  to = GateState.OPENED;
}

export class CloseGateAction extends Action<Gate, GateState> {
  from = GateState.OPENED;
  to = GateState.CLOSED;
}

export class LockGateAction extends Action<Gate, GateState> {
  from = GateState.CLOSED;
  to = GateState.LOCKED;
}

export class UnlockGateAction extends Action<Gate, GateState, GatePayload> {
  from = GateState.LOCKED;
  to = GateState.CLOSED;

  /**
   * Ensures the gate password is checked when unlocking.
   */
  async onTransition(instance: Gate, data: TransitionData<GateState, GatePayload>) {
    if (data && instance.password === data.password) {
      return true;
    }
    throw new Error("Invalid gate password, cannot unlock");
  }
}

export class LockedGateMessageAction extends Action<Gate, GateState, GatePayload> {
  from = '*';
  to = GateState.OPENED;

  async onTransition(instance: Gate, data: TransitionData<GateState, GatePayload>) {
    if (data.from === GateState.LOCKED) {
      this.logger.warn('Gate is locked! We need a password');
      return false;
    }
    return true;
  }
}

export class ExplodeGateAction extends Action<Gate, GateState> {
  from = [GateState.CLOSED, GateState.LOCKED];
  to = [GateState.EXPLODED];
}

export class AlreadyExplodedGateAction extends Action<Gate, GateState> {
  from = [GateState.EXPLODED];
  to = '*';
}

export interface GatePayload {
  password?: string;
}

export default class GateStateMachine extends FSM<Gate, GateState, GatePayload> {
  /* Sets the machine initial state */
  initialState: GateState = GateState.CLOSED;

  /* The available states */
  states: GateState[] = [
    GateState.OPENED,
    GateState.CLOSED,
    GateState.LOCKED,
    GateState.EXPLODED,
  ];

  /* Sets the machine available actions */
  actions = [
    new OpenGateAction(),
    new CloseGateAction(),
    new LockGateAction(),
    new UnlockGateAction(),
    new LockedGateMessageAction(),
    new ExplodeGateAction(),
    new AlreadyExplodedGateAction(),
  ];
}