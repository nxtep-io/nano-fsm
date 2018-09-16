import { GateStateMachine, GateState } from '../lib/sample';

describe("lib.smaples.GateStateMachine", () => {
  it("should instantiate a GateStateMachine properly", async () => {
    const gate = new GateStateMachine({
      name: 'Test Gate',
      password: 'test',
    });

    // Start by locking the gate
    await gate.goTo(GateState.LOCKED);

    try {
      // Tries to open the gate
      await gate.goTo(GateState.OPENED);
      throw new Error('Should not be here');
    } catch (exception) {
      // Accepts only action exception
      if (!exception.message.match(/No action available/gi)) {
        throw exception;
      }
    }

    try {
      // Tries to unlocks the gate without password
      await gate.goTo(GateState.CLOSED);
      throw new Error('Should not be here');
    } catch (exception) {
      // Accepts only action exception
      if (!exception.message.match(/Invalid gate password/gi)) {
        throw exception;
      }
    }

    // Unlock gate
    await gate.goTo(GateState.CLOSED, { password: "test" });

    // Open gate
    await gate.goTo(GateState.OPENED);
  });
});
