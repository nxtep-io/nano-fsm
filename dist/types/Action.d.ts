import { Logger } from "ts-framework-common";
export interface ActionOptions {
    name?: string;
    logger?: Logger;
}
export default abstract class Action<Instance, State> {
    protected options: ActionOptions;
    abstract from: State | string;
    abstract to: State | string;
    name: string;
    protected logger: any;
    constructor(options?: ActionOptions);
    onLeave(instance: Instance): void;
    onTransition(instance: Instance, data?: any): Promise<boolean>;
    onEnter(instance: Instance): void;
    matchesFrom(state: "*" | State): boolean;
    matchesTo(state: "*" | State): boolean;
}
