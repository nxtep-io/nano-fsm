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

  public onLeave(instance: Instance): void {
    this.logger.silly(`${this.name}: leaving state "${this.from}"`);
  }

  public async onTransition(instance: Instance, data?: any): Promise<boolean> {
    this.logger.silly(`${this.name}: transitioning states "${this.from}" => "${this.to}"`);
    return true;
  }

  public onEnter(instance: Instance): void {
    this.logger.silly(`${this.name}: entering "${this.to}"`);
  }

  public matchesFrom(state: "*" | State) {
    return this.from === "*" || this.from === state;
  }

  public matchesTo(state: "*" | State) {
    return this.to === "*" || this.to === state;
  }
}
