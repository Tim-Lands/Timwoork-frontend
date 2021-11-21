/*
|--------------------------------------------------------------------------
| User validation.
|--------------------------------------------------------------------------
|
| Validate the input of a user upon her login or registration.
|
*/
import validator from "validator";

export class UserValidator {
    /**
     *
     * @param {string} name
     *   The name of the new user.
     * @param {string} email
     *   The email of the new user.
     * @param {string} password
     *   The password of the new user.
     * @param {string} passwordConfirmed
     *   The password confirmation.
     * @param {number} minPassChars
     *   The minimum number of characters the password must have.
     *
     * @return {boolean}
     *   True if validation was successful.
     */
    public validateRegistrationInput(
        username: string,
        password: string,
        minPassChars: number
    ): { username: string; password: string } | boolean {
        let errorDetected = false;
        const errors = {
            username: "",
            password: "",
        };
        // Check name.
        const isNameValid = this.validateName(username);
        if (!isNameValid) {
            errors.username = "The name may only contain letters.";
            errorDetected = true;
        }
        // Return true if everythin is valid.
        if (!errorDetected) {
            return true;
        }
        return errors;
    }

    /**
     * Check if the name of the user only contains letters.
     *
     * @param {string} name
     *   The name of the user.
     */
    public validateName(name: string): boolean {
        // Removes spaces as validator does not count them as letters.
        const tmp = name.replace(" ", "");
        return validator.isAlpha(tmp);
    }

    /**
     * Confirm the users password when registering.
     *
     * @param {string} password
     *   The password.
     * @param {string} passwordConfirmed
     *   The password confirmation.
     * @param {number} minPasswordLength
     *   The minimum password length.
     *
     * @return {boolean}
     *   True if validation was successful.
     */
    public validatePassword(
        password: string,
        passwordConfirmed: string,
        minPasswordLength: number
    ): boolean {
        // Check password length:
        if (password.length < minPasswordLength) {
            return false;
        }

        // Check that password it not too soft:
        if (password.includes("passwor") || password.includes("123456")) {
            return false;
        }

        // Passwords must be equal.
        if (password !== passwordConfirmed) {
            return false;
        }

        // Return true if everything is fine.
        return true;
    }
}
