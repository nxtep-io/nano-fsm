import { Logger } from "ts-framework-common";
import Action from "./Action";

export interface FSMOptions<State> {
  logger?: Logger;
  initialState?: State;
}

/**
 * The main Finite State Machine manager, that holds all available actions and performs the state transitions.
 */
export default abstract class FSM<Instance, State> {
  public state: State;
  protected abstract actions: Action<Instance, State>[];
  protected logger: Logger;

  constructor(public instance: Instance, protected options: FSMOptions<State> = {}) {
    this.state = options.initialState || this.state;
    this.logger = options.logger || new Logger();
    this.logger.silly("Initializing finite state machine", this.options);
  }

  /**
   * Gets all available actions to go to a determined state.
   * 
   * @param to The desired state
   */
  public pathsTo(to: State): false | Action<Instance, State>[] {
    if (to === this.state) {
      return false;
    }

    // Get all available actions from the current machine
    const actions = this.actions.filter(action => action.matches(this.state, to));

    if (actions && actions.length) {
      return actions;
    }

    return false;
  }

  /**
   * Checks if can go to desired state.
   * 
   * @param to The desired state
   */
  public canGoTo(to: State): boolean {
    return !!this.pathsTo(to);
  }

  /**
   * Performs a new transition in the machine.
   * 
   * @param to The desired state
   * @param data An optional payload to be passed to the machine actions
   */
  public async goTo(to: State, data?: any): Promise<boolean> {
    if (to === this.state) {
      throw new Error(`Machine is already in "${this.state}" state`);
    }

    // Get all available actions from the current machine
    const actions = this.pathsTo(to);

    if (actions) {
      // TODO: Run this is series
      // Notify we're leaving the current state
      await Promise.all(actions.map(action => action.beforeTransition(this.instance)));

      // TODO: Run this is series
      // Check if we can transition to the next state
      const computedData = { ...data, to, from: this.state };
      const results = await Promise.all(actions.map(action => action.onTransition(this.instance, computedData)));
      const ok = results.reduce((aggr, next) => aggr && next, true);

      if (ok) {
        // Set the next state locally
        this.state = to;

        // Notify we're entered the next state
        await Promise.all(actions.map(action => action.afterTransition(this.instance)));
        return true;
      } else {
        this.logger.info(`Transition interrupted: "${this.state}" => "${to}"`);
      }
      // No transition available
    } else {
      throw new Error(`No action available to transition from "${this.state}" to "${to}" state.`);
    }

    return false;
  }
}
