import configureStore from './configureStore'

describe("Application Store", () => {

    it('should initialize', () => {
        const store = configureStore();
        const state = store.getState();
        // expect(state.auth.loggedIn).toBe(false);
    })

});
