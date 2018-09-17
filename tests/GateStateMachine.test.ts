import { GateStateMachine, GateState } from '../lib/sample';

describe("lib.smaples.GateStateMachine", () => {
  let gate;

  beforeEach(async () => {
    gate = new GateStateMachine({
      name: 'Test Gate',
      password: 'test',
    });
  })

  it("should transition to a valid state properly", async () => {
    // Start by locking the gate, a valid transition
    await gate.goTo(GateState.LOCKED);
    expect(gate.state).toBe(GateState.LOCKED);
    await expect(gate.goTo(GateState.LOCKED)).rejects.toThrow(/already in \"locked\" state/ig);
  });

  it("should transition to a valid state with a valid payload", async () => {
    // Start by locking the gate, a valid transition
    await gate.goTo(GateState.LOCKED);
    expect(gate.state).toBe(GateState.LOCKED);

    // Now, unlock the gate properly
    expect(await gate.goTo(GateState.CLOSED, { password: 'test' })).toBe(true);
    expect(gate.state).toBe(GateState.CLOSED);

    // Open the gate!
    await gate.goTo(GateState.OPENED);
    expect(gate.state).toBe(GateState.OPENED);

    // Now, an invalid transition
    await expect(gate.goTo(GateState.LOCKED)).rejects.toThrow(/no action available/ig);
    expect(gate.state).toBe(GateState.OPENED);
  });


  it("should not transition to a valid state without a valid payload", async () => {
    // Start by locking the gate, a valid transition
    await gate.goTo(GateState.LOCKED);
    expect(gate.state).toBe(GateState.LOCKED);

    // Now, an invalid transition
    await expect(gate.goTo(GateState.CLOSED, {})).rejects.toThrow(/invalid gate password/ig);
    expect(gate.state).toBe(GateState.LOCKED);
  });
});
