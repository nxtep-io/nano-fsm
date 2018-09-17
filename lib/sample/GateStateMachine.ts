import FSM, { Action } from "../";

export interface Gate {
  name: string;
  password: string;
}

export enum GateState {
  OPENED = "opened", // Gate is opened for travelers
  CLOSED = "closed", // Gate is closed but unlocked, it may be opened by travelers
  LOCKED = "locked" // Gate is closed and locked, cannot unlock without a password
}

export class OpenGateAction extends Action<Gate, GateState> {
  from = GateState.CLOSED;
  to = GateState.OPENED;
}

export class WelcomeMessageGateAction extends Action<Gate, GateState> {
  from = '*';
  to = GateState.OPENED;

  beforeTransition() {
    this.logger.info('Hello stranger, welcome to my gate');
  }
}

export class CloseGateAction extends Action<Gate, GateState> {
  from = GateState.OPENED;
  to = GateState.CLOSED;
}

export class LockGateAction extends Action<Gate, GateState> {
  from = GateState.CLOSED;
  to = GateState.LOCKED;
}

export class UnlockGateAction extends Action<Gate, GateState> {
  from = GateState.LOCKED;
  to = GateState.CLOSED;

  /**
   * Ensures the gate password is checked when unlocking.
   */
  async onTransition(instance: Gate, data?: { password: string }) {
    if (data && instance.password === data.password) {
      return super.onTransition(instance, data);
    }
    throw new Error("Invalid gate password, cannot unlock");
  }
}

export default class GateStateMachine extends FSM<Gate, GateState> {
  /* Sets the machine initial state */
  state: GateState = GateState.CLOSED;

  /* Sets the machine available actions */
  actions = [
    new WelcomeMessageGateAction(),
    new OpenGateAction(),
    new CloseGateAction(),
    new LockGateAction(),
    new UnlockGateAction()
  ];
}
