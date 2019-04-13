import { Logger, LoggerInstance } from "nano-errors";

export interface ActionOptions {
  name?: string;
  logger?: LoggerInstance;
}

export type TransitionBasicData<State> = {
  from: State | State[];
  to: State | State[];
}

export type TransitionPayload<Payload> = {
  [key in keyof Payload]: Payload[key];
}

export type TransitionData<State, Payload = any> = TransitionBasicData<State> & TransitionPayload<Payload>;

export default abstract class Action<Instance, State, Payload = any> {
  public abstract from: State | string | (State | string)[];
  public abstract to: State | string | (State | string)[];
  public name: string;
  protected logger: LoggerInstance;

  constructor(protected options: ActionOptions = {}) {
    this.name = options.name || this.name || this.constructor.name;
    this.logger = options.logger || Logger.initialize();
  }

  /**
   * 
   * @param instance The state machine instance
   */
  public beforeTransition(instance: Instance): void {
    this.logger.silly(`${this.name}: leaving state "${this.from}"`);
  }

  /**
   * Handles a state transition
   * 
   * @param instance The state machine instance.
   * @param data The transition payload passed to the fsm.goTo() method.
   */
  public async onTransition(instance: Instance, data: TransitionData<State, Payload>): Promise<boolean> {
    this.logger.silly(`${this.name}: transitioning states "${this.from}" => "${this.to}"`, { data });
    return true;
  }

  /**
   * Handles post transition results.
   * 
   * @param instance The state machine instance.
   */
  public afterTransition(instance: Instance): void {
    this.logger.silly(`${this.name}: entering "${this.to}"`);
  }

  /**
   * Checks if action matches from/to state pair specified.
   * 
   * @param from The original state to be checked against.
   * @param to The destination state to be checked against.
   */
  public matches(from: "*" | State, to: "*" | State): boolean {
    let matchesFrom: boolean = false;
    if (this.from === "*") {
      matchesFrom = true;
    } else if (Array.isArray(this.from)) {
      const array = this.from as State[];
      matchesFrom = array.some(state => state === from);
    } else {
      matchesFrom = this.from === from;
    }
    let matchesTo: boolean = false;
    if (this.to === "*") {
      matchesTo = true;
    } else if (Array.isArray(this.to)) {
      const array = this.to as State[];
      matchesTo = array.some(state => state === to);
    } else {
      matchesTo = this.to === to;
    }

    return matchesFrom && matchesTo;
  }
}
