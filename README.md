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

## Lifecycle

To allow a higher degree of control over your state transitions, every action and state machine has a lifecycle you can use to meet your needs.  
The lifecycle is run as follows:
- `Action.beforeTransition` (In parallel)
- `FiniteStateMachine.beforeTransition`
- `Action.onTransition` (In parallel)
- `FiniteStateMachine.onTransition`
- `Action.afterTransition` (In parallel)
- `FiniteStateMachine.afterTransition`

You can access the instance in the state machine lifecycle in `this.instance`

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
  from = [GateState.CLOSED]; // Array of States also works!
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

Wildcard is supported (regex coming soon)

```typescript
export class LockedMessageGateAction extends Action<Gate, GateState> {
  from = '*';
  to = GateState.CLOSED;

  /**
   * Sends info log after any transition to "CLOSED" state 
   */
  afterTransition() {
    // Be careful with widcards, they enable any state transition with a matching pair!
    this.logger.info('Gate is closed!');
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
    new UnlockGateAction(),
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

**Interrupting a transition**

There are two ways of interrupting a transition: `soft interruption` and `hard interruption`.

A soft interruption does not throw any exception, but the state never changes in the machine.

```typescript
export class LockedGateMessageAction extends Action<Gate, GateState> {
  from = '*';
  to = GateState.OPENED;

  async onTransition(instance: Gate, data: TransitionData<GateState>) {
    
    if (data.from === GateState.LOCKED) {
      this.logger.warn('Gate is locked! We need a password');

      // Interrupts the transition without throwing any exception
      return false;
    }

    return true;
  }
}
```

A hard interruption stops the transition and throws an error to the caller.

```typescript
export class LockedGateMessageAction extends Action<Gate, GateState> {
  from = '*';
  to = GateState.OPENED;

  async onTransition(instance: Gate, data: TransitionData<GateState>) {
    
    if (data.from === GateState.LOCKED) {
      // Interrupts the transition with exception
      throw new Error('Gate is locked! We need a password');
    }

    return true;
  }
}
```

## API Reference

The full library reference is available in the `docs/` directory or published in https://nxtep-io.github.io/nano-fsm.

## Changelog

* **v0.0.2**: Array of states in Action definition

* **v0.0.1**: Initial version


## License

The project is licensed under the [MIT License](./LICENSE.md).
