import { createSagaAction, createFluxAction, FSA, isFSA, isErrorFSA, isSagaAction } from "../actions";

jest.mock("../helpers", () => ({
    ...jest.requireActual("../helpers"),
    generateRandomString: () => "RANDOM"
}));

class TestSagaAction {}

interface TestFSA extends FSA {
    type: "TEST";
}

it("creates saga action from class payload", () => {
    expect(createSagaAction(TestSagaAction)).toMatchSnapshot();
});

it("throw when creating saga action from object payload", () => {
    const invalidClassAction = {};

    expect(() => createSagaAction(invalidClassAction)).toThrow();
});

it("creates FSA action", () => {
    const fluxAction = createFluxAction<TestFSA>("TEST", undefined);

    expect(fluxAction).toMatchSnapshot();
});

it("check if FSA object is FSA", () => {
    const fluxAction = createFluxAction<TestFSA>("TEST", undefined);

    expect(isFSA(fluxAction)).toBe(true);
});

it("check if FSA object is Error FSA", () => {
    const actionPayload = new Error("Test Error");
    const fluxAction = createFluxAction<TestFSA>("TEST", actionPayload);

    expect(isErrorFSA(fluxAction)).toBe(true);
});

it("check if empty object is FSA", () => {
    const action = {};

    expect(isFSA(action)).toBe(false);
});

it("check if Saga Action is Saga action", () => {
    const sagaAction = createSagaAction(new TestSagaAction());

    expect(isSagaAction(sagaAction)).toBe(true);
});

it("check if object is Saga action", () => {
    const invalidSagaAction = {};

    expect(isSagaAction(invalidSagaAction)).toBe(false);
});
