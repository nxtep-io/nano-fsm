import { Logger } from "ts-framework-common";
import Action from "./Action";
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
    instance: Instance;
    protected options: FSMOptions<State>;
    name: string;
    protected abstract actions: Action<Instance, State, Payload>[];
    protected abstract initialState: State;
    protected abstract states: State[];
    protected logger: Logger;
    protected _state: State;
    constructor(instance: Instance, options?: FSMOptions<State>);
    /**
     * Ensures the state desired is valid and registered in the machine.
     *
     * @param state The state to be checked
     */
    isValidState(state: State): boolean;
    /**
     * Get current machine state.
     */
    readonly state: State;
    /**
     * Handles a state transition preparation
     */
    beforeTransition(from: State | (State | string)[], to: State, data: Payload): void;
    /**
     * Handles a state transition
     *
     * @param data The transition payload passed to the fsm.goTo() method.
     */
    onTransition(from: State | (State | string)[], to: State, data: Payload): Promise<boolean>;
    /**
     * Handles post transition results.
     */
    afterTransition(from: State | (State | string)[], to: State, data: Payload): void;
    /**
     * Gets all available actions to go to a determined state.
     *
     * @param to The desired state
     */
    pathsTo(to: State): false | Action<Instance, State>[];
    /**
     * Checks if can go to desired state.
     *
     * @param to The desired state
     */
    canGoTo(to: State): boolean;
    /**
     * Performs the internal state change in the machine. Should not be called directl, use "goTo".
     *
     * @param to The destination state
     */
    protected setState(to: State): Promise<void>;
    /**
     * Performs a new transition in the machine.
     *
     * @param to The desired state
     * @param data An optional payload to be passed to the machine actions
     */
    goTo(to: State, data?: Payload): Promise<boolean>;
}
