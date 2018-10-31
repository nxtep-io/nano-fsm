import { Logger } from "ts-framework-common";
import Action, { TransitionData } from "./Action";

export interface FSMOptions<State> {
  name?: string;
  state?: State;
  logger?: Logger;
  allowSameState?: boolean;
}

/**
 * The main Finite State Machine manager, that holds all available actions and performs the state transitions.
 */
export default abstract class FSM<Instance, State, Payload = any> {
  public name: string;
  protected abstract actions: Action<Instance, State, Payload>[];
  protected abstract initialState: State;
  protected abstract states: State[];
  protected logger: Logger;
  protected _state: State;

  constructor(public instance: Instance, protected options: FSMOptions<State> = {}) {
    this.name = options.name || this.name || this.constructor.name;
    this.logger = options.logger || new Logger();
  }

  /**
   * Ensures the state desired is valid and registered in the machine.
   *
   * @param state The state to be checked
   */
  isValidState(state: State) {
    return this.states.indexOf(state) >= 0;
  }

  /**
   * Get current machine state.
   */
  public get state(): State {
    // Ensure state is valid
    if (!this._state && this.options.state && !this.isValidState(this.options.state)) {
      throw new Error(`Invalid initial state: "${this.options.state}"`);
    } else if (!this._state && this.initialState && !this.isValidState(this.initialState)) {
      throw new Error(`Invalid initial state: "${this.initialState}"`);
    } else if (!this._state && this.options.state) {
      // Set the initial state locally
      this._state = this.options.state;
    } else if (!this._state) {
      // Set the initial state locally
      this._state = this.initialState;
    }

    return this._state;
  }

  /**
   * Handles a state transition preparation
   */
  public beforeTransition(from: State | (State | string)[], to: State): void {
    this.logger.silly(`${this.name}: leaving states "${Array.isArray(from) ? from.join(`", "`) : from}"`);
  }

  /**
   * Handles a state transition
   *
   * @param data The transition payload passed to the fsm.goTo() method.
   */
  public async onTransition(from: State | (State | string)[], to: State, data: Payload): Promise<boolean> {
    this.logger.silly(
      `${this.name}: transitioning states "${Array.isArray(from) ? from.join(`", "`) : from}" => "${to}"`,
      { data }
    );
    return true;
  }

  /**
   * Handles post transition results.
   */
  public afterTransition(from: State | (State | string)[], to: State): void {
    this.logger.silly(`${this.name}: entering "${to}"`);
  }

  /**
   * Gets all available actions to go to a determined state.
   *
   * @param to The desired state
   */
  public pathsTo(to: State): false | Action<Instance, State>[] {
    if (to === this.state && !this.options.allowSameState) {
      return false;
    }

    if (to === this.state) {
      return [];
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
   * Performs the internal state change in the machine. Should not be called directl, use "goTo".
   *
   * @param to The destination state
   */
  protected async setState(
    from: State | (State | string)[],
    to: State,
    actions: Action<Instance, State>[]
  ): Promise<void> {
    // Set the next state locally
    this._state = to;

    // Notify we're entered the next state
    await Promise.all(actions.map(action => action.afterTransition(this.instance)));
    await this.afterTransition(from, to);
  }

  /**
   * Performs a new transition in the machine.
   *
   * @param to The desired state
   * @param data An optional payload to be passed to the machine actions
   */
  public async goTo(to: State, data?: Payload): Promise<boolean> {
    const state = this.state;

    if (to === state && !this.options.allowSameState) {
      throw new Error(`Machine is already in "${state}" state`);
    } else if (to === state) {
      await this.setState(state, to, []);
      return true;
    }

    // Ensure state is valid
    if (!this.isValidState(to)) {
      throw new Error(`Invalid state: "${to}"`);
    }

    // Get all available actions from the current machine
    const actions = this.pathsTo(to);

    if (actions) {
      const froms = actions.reduce(
        (states, action) => {
          if (Array.isArray(action.from)) {
            (action.from as State[]).forEach(state => states.push(state));
          } else {
            states.push(action.from);
          }

          return states;
        },
        [] as (State | string)[]
      );

      // Notify we're leaving the current state
      await Promise.all(actions.map(action => action.beforeTransition(this.instance)));

      // Run own beforeTranstion
      await this.beforeTransition(froms, to);

      // TODO: Run this is series
      // Check if we can transition to the next state
      const computedData = { ...(data || {}), to, from: state };
      const results = await Promise.all(actions.map(action => action.onTransition(this.instance, computedData)));

      // Run own onTranstion
      results.push(await this.onTransition(froms, to, data));

      const ok = results.reduce((aggr, next) => aggr && next, true);

      if (ok) {
        await this.setState(froms, to, actions);

        return true;
      }

      this.logger.info(`Transition interrupted: "${state}" => "${to}"`);
    } else {
      throw new Error(`No action available to transition from "${state}" to "${to}" state.`);
    }

    return false;
  }
}
