nano-fsm
========

A minimalistic finite state machine for typescript based applications, with async/await and decorators support.

## Getting started

```bash
# Add to your dependencies using yarn
yarn add "nxtep-io/nano-fsm#master";

# Or, using NPM
npm install "github:nxtep-io/nano-fsm#master";
```

## Example: A simple Gate fsm

Let's define a Gate, with a simple unlocking password and 3 states: `opened`, `closed` and `locked`.

```typescript
/**
 * The Gate interface, for mapping database models for example.
 */
export interface Gate {
  name: string;
  password: string;
}

/**
 * The available states for a Gate in the machine.
 */
export enum GateState {
  OPENED = "opened", // Gate is opened for travelers
  CLOSED = "closed", // Gate is closed but unlocked, it may be opened by travelers
  LOCKED = "locked" // Gate is closed and locked, cannot unlock without a password
}
```

Now, we can define the available transitions between these states.

```typescript
export class OpenGateAction extends Action<Gate, GateState> {
  from = GateState.CLOSED;
  to = GateState.OPENED;
}

export class CloseGateAction extends Action<Gate, GateState> {
  from = GateState.OPENED;
  to = GateState.CLOSED;
}

export class LockGateAction extends Action<Gate, GateState> {
  from = GateState.CLOSED;
  to = GateState.LOCKED;
}
```

For the unlocking mechanism, we need a password validation inside the transition.

```typescript
export class UnlockGateAction extends Action<Gate, GateState> {
  from = GateState.LOCKED;
  to = GateState.CLOSED;

  /**
   * Ensures the gate password is checked when unlocking.
   */
  async onTransition(instance: Gate, data?: { password: string }) {
    if (data && instance.password === data.password) {
      return super.onTransition(instance, data);
    }
    throw new Error("Invalid gate password, cannot unlock");
  }
}
```

Finally, our Gate State Machine can be created.

```typescript
export default class GateStateMachine extends FSM<Gate, GateState> {
  /* Sets the machine initial state */
  state: GateState = GateState.CLOSED;

  /* Sets the machine available actions */
  actions = [
    new OpenGateAction(), 
    new CloseGateAction(), 
    new LockGateAction(), 
    new UnlockGateAction()
  ];
}
```

To interact with it, instantiate a new machine mapping your models.

```typescript
const gate = new GateStateMachine({
  name: 'Mines of Moria',
  password: 'friend',
});

// You shall not pass
await gate.goTo(GateState.LOCKED);

// Unlocks the gate passing a transition payload
await gate.goTo(GateState.CLOSED, { password: 'friend' });

// Now, you shall pass
await gate.goTo(GateState.OPENED);
```

## License

The project is licensed under the [MIT License](./LICENSE.md).
