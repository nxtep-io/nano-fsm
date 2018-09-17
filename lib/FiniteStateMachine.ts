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

  public async goTo(to: State, data?: any): Promise<boolean> {
    if (to === this.state) {
      throw new Error(`Machine is already in "${this.state}" state`);
    }

    // Get all available actions from the current machine
    const actions = this.actions.filter(action => action.matches(this.state, to));

    if (actions && actions.length) {
      // TODO: Run this is series
      // Notify we're leaving the current state
      await Promise.all(actions.map(action => action.beforeTransition(this.instance)));

      // TODO: Run this is series
      // Check if we can transition to the next state
      const results = await Promise.all(actions.map(action => action.onTransition(this.instance, data)));
      const ok = results.reduce((aggr, next) => aggr && next, true);

      if (ok) {
        // Set the next state locally
        this.state = to;

        // Notify we're entered the next state
        await Promise.all(actions.map(action => action.afterTransition(this.instance)));
        return true;
      }
      // No transition available
    } else {
      throw new Error(`No action available to transition from "${this.state}" to "${to}" state.`);
    }
  }
}
