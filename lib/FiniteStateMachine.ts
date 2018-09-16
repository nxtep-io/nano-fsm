import { Logger } from "ts-framework-common";
import Action from "./Action";

export interface FSMOptions {
  logger?: Logger;
}

export default abstract class FSM<Instance, State> {
  public abstract state: State;
  protected abstract actions: Action<Instance, State>[];
  protected logger: Logger;

  constructor(public instance: Instance, protected options: FSMOptions = {}) {
    this.logger = options.logger || new Logger();
    this.logger.silly("Initializing new finite machine state", this.options);
  }

  public async goTo(to: State, data?: any) {
    // TODO: We should not enable more than one equal pair
    const action = this.actions.find(action => action.matchesFrom(this.state) && action.matchesTo(to));

    if (action) {
      // Notify we're leaving the current state
      await action.onLeave(this.instance);

      // Check if we can transition to the next state
      const ok = await action.onTransition(this.instance, data);

      if (ok) {
        // Set the next state locally
        this.state = to;

        // Notify we're entered the next state
        await action.onEnter(this.instance);
      }
    } else {
      throw new Error(`No action available to transition from "${this.state}" to "${to}" state.`);
    }
  }
}
