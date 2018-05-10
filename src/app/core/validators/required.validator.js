export class RequiredValidator {

    /**
     * validate if the given value is lower
     * @param { string } value
     * @param { number } validator
     * @returns { isValid: boolean, message: string }
     */
    static validate(value, validator) {
        if (value == null || value == undefined || value == '') {
            return {
                isValid: false,
                message: 'required field'
            }
        }

        return {
            isValid: true,
            message: ''
        }
    }
}