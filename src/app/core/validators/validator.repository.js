import { MaxSizeValidator } from "./max-size.validator";
import { EmailValidator } from "./email.validator";
import { RequiredValidator } from "./required.validator";

export class ValidatorRepository {
    /**
     * @returns { Map< string, { validate: (value:string, validator:string) => { isValid: boolean, message: string }} > }
     */
    static getValidators() {
        const validators = new Map();
        validators.set('app-required', RequiredValidator);
        validators.set('app-max-size', MaxSizeValidator);
        validators.set('app-email', EmailValidator);
        return validators;
    }
}