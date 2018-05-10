export class EmailValidator {

    /**
     * validate if the given value is lower
     * @param { string } value
     * @param { number } validator
     * @returns { isValid: boolean, message: string }
     */
    static validate(value, validator) {
        if (value &&
            value.length > 0 &&
            value.indexOf('@') == -1) {
            return {
                isValid: false,
                message: 'invalid e-mail'
            }
        }

        return {
            isValid: true,
            message: ''
        }
    }
}