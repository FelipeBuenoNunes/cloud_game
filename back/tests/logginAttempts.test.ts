import LoginAttempts from "../src/config/http/middleware/loginAttempt"

describe('testing', () => {
    test("wrong password 3 times", () => {
        const target = new LoginAttempts();
        for (let i = 0; i < 2; i++) {
            expect(target.couldTryAgain()).toBe(true);
            expect(target.incorrectPasswordIsLocked()).toBe(false);
        }
        expect(target.couldTryAgain()).toBe(true);
        expect(target.incorrectPasswordIsLocked()).toBe(true);
    });

    test("wrong password 4 times", () => {
        const target = new LoginAttempts();
        for (let i = 0; i < 2; i++) {
            expect(target.couldTryAgain()).toBe(true);
            expect(target.incorrectPasswordIsLocked()).toBe(false);
        }
        expect(target.couldTryAgain()).toBe(true);
        expect(target.incorrectPasswordIsLocked()).toBe(true);
        expect(target.couldTryAgain()).toBe(false);
    })
})
