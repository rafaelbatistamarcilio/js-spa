
export class MaxSizeValidator {

    /**
     * validate if the given value is lower
     * @param { string } value 
     * @param { number } validator 
     * @returns { isValid: boolean, message: string }
     */
    static validate( value , validator ) {
        if(value.length < validator){
            return { 
                isValid: true, 
                message: ''
            }
        } 

        return {
            isValid: false,
            message: 'values must be lower than ' + validator
        }
    }
}