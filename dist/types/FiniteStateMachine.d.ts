import { Logger } from "ts-framework-common";
import Action from "./Action";
export interface FSMOptions {
    logger?: Logger;
}
export default abstract class FSM<Instance, State> {
    instance: Instance;
    protected options: FSMOptions;
    abstract state: State;
    protected abstract actions: Action<Instance, State>[];
    protected logger: Logger;
    constructor(instance: Instance, options?: FSMOptions);
    goTo(to: State, data?: any): Promise<void>;
}
