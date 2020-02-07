import { GateStateMachine, GateState } from "../examples";
import { Logger } from "nano-errors";

describe("lib.samples.GateStateMachine", () => {
  let gate;
  Logger.initialize();

  beforeEach(async () => {
    gate = new GateStateMachine({
      name: "Test Gate",
      password: "test"
    });
  });

  it("should transition to a valid state properly", async () => {
    // Start by locking the gate, a valid transition
    expect(gate.canGoTo(GateState.LOCKED)).toBe(true);
    await gate.goTo(GateState.LOCKED);
    expect(gate.state).toBe(GateState.LOCKED);
    await expect(gate.goTo(GateState.LOCKED)).rejects.toThrow(/already in \"locked\" state/gi);

    // Should be able to go to OPEN, but never accomplish.
    expect(gate.canGoTo(GateState.OPENED)).toBe(true);
    expect(await gate.goTo(GateState.OPENED)).toBe(false);

    // Should not go to current state either
    expect(gate.canGoTo(GateState.LOCKED)).toBe(false);

    // Should be able to move to a state where the from and to are defined as arrays
    expect(gate.canGoTo(GateState.EXPLODED)).toBe(true);
  });

  it("should transition to a valid state with a valid payload", async () => {
    // Start by locking the gate, a valid transition
    await gate.goTo(GateState.LOCKED);
    expect(gate.state).toBe(GateState.LOCKED);

    // Now, unlock the gate properly
    expect(await gate.goTo(GateState.CLOSED, { password: "test" })).toBe(true);
    expect(gate.state).toBe(GateState.CLOSED);

    // Open the gate!
    await gate.goTo(GateState.OPENED);
    expect(gate.state).toBe(GateState.OPENED);

    // Try to explode the gate - an invalid transition
    await expect(gate.goTo(GateState.EXPLODED)).rejects.toThrow(/no action available/gi);
    expect(gate.state).toBe(GateState.OPENED);

    // Close the gate!
    await gate.goTo(GateState.CLOSED);
    expect(gate.state).toBe(GateState.CLOSED);

    // Explode the gate!
    expect(await gate.goTo(GateState.EXPLODED)).toBe(true);
    expect(gate.state).toBe(GateState.EXPLODED);

    // Try to open the exploded gate, it will not work.
    await expect(gate.goTo(GateState.OPENED)).rejects.toThrow(/gate has been exploded/gi);
    expect(gate.state).toBe(GateState.EXPLODED);
  });

  it("should not transition to a valid state without a valid payload", async () => {
    // Start by locking the gate, a valid transition
    await gate.goTo(GateState.LOCKED);
    expect(gate.state).toBe(GateState.LOCKED);

    // Now, an invalid transition
    await expect(gate.goTo(GateState.CLOSED, {})).rejects.toThrow(/invalid gate password/gi);
    expect(gate.state).toBe(GateState.LOCKED);
  });

  it("should not transition unknown state ", async () => {
    expect(gate.goTo("unknonwn")).rejects.toThrow(/Invalid state/gi);
  });

  it("render DOT graph from fsm", () => {
    console.log(gate.toDot());
    expect(true).toBe(true);
  });

  describe("allow same state", async () => {
    let gate;

    beforeEach(async () => {
      gate = new GateStateMachine(
        {
          name: "Test Gate",
          password: "test"
        },
        { state: GateState.OPENED, allowSameState: true }
      );
    });

    it("should transition to the initial state properly", async () => {
      // Should go to current state
      expect(gate.state).toBe(GateState.OPENED);
      expect(gate.canGoTo(GateState.OPENED)).toBe(true);
      expect(await gate.goTo(GateState.OPENED)).toBe(true);
    });
  });

  describe("invalid initial state", async () => {
    let gate;

    beforeEach(async () => {
      gate = new GateStateMachine({
        name: "Test Gate",
        password: "test"
      });

      gate.initialState = "unknown";
    });

    it("should transition to the initial state properly", async () => {
      // Should go to current state
      expect(() => gate.state).toThrow(/Invalid initial state/gi);
    });
  });

  describe("invalid initial state from constructor", async () => {
    let gate;

    beforeEach(async () => {
      gate = new GateStateMachine(
        {
          name: "Test Gate",
          password: "test"
        },
        { state: "unknown" as any }
      );
    });

    it("should transition to the initial state properly", async () => {
      // Should go to current state
      expect(() => gate.state).toThrow(/Invalid initial state/gi);
    });
  });
});
