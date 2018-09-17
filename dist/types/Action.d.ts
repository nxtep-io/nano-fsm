import { Logger } from "ts-framework-common";
export interface ActionOptions {
    name?: string;
    logger?: Logger;
}
export interface TransitionData<State> {
    from: State;
    to: State;
    [key: string]: any;
}
export default abstract class Action<Instance, State> {
    protected options: ActionOptions;
    abstract from: State | string;
    abstract to: State | string;
    name: string;
    protected logger: any;
    constructor(options?: ActionOptions);
    beforeTransition(instance: Instance): void;
    onTransition(instance: Instance, data: TransitionData<State>): Promise<boolean>;
    afterTransition(instance: Instance): void;
    matches(from: "*" | State, to: "*" | State): boolean;
}
