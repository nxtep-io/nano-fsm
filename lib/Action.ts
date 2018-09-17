import { Logger } from "ts-framework-common";

export interface ActionOptions {
  name?: string;
  logger?: Logger;
}

export default abstract class Action<Instance, State> {
  public abstract from: State | string;
  public abstract to: State | string;
  public name: string;
  protected logger;

  constructor(protected options: ActionOptions = {}) {
    this.name = options.name || this.name || this.constructor.name;
    this.logger = options.logger || new Logger();
  }

  public beforeTransition(instance: Instance): void {
    this.logger.silly(`${this.name}: leaving state "${this.from}"`);
  }

  public async onTransition(instance: Instance, data?: any): Promise<boolean> {
    this.logger.silly(`${this.name}: transitioning states "${this.from}" => "${this.to}"`);
    return true;
  }

  public afterTransition(instance: Instance): void {
    this.logger.silly(`${this.name}: entering "${this.to}"`);
  }

  public matches(from: "*" | State, to: "*" | State) {
    const matchesFrom = this.from === "*" || this.from === from;
    const matchesTo = this.to === "*" || this.to === to;
    return matchesFrom && matchesTo;
  }
}
