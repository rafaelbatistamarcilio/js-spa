import {
    ValidatorRepository
} from "./validators/validator.repository";

/**
 * Validation service to use with the following structure
 *
 *  <form id="someId">
 *      <div >
 *          <input app-input app-some-validator  id="someInputId">
 *          <div> feedback containner </div>
 *      </div>
 *  </form>
 *
 * OBS: the input to be validated can be a select with app-input propertie
 */
export class FormValidationService {

    /**
     * add a event listner for every form input with the propertie app-input
     * when the user key up on the input that will be validated
     * be shure that every form input have the needed validator anothation
     * @see {ValidatorRepository}
     * @param {string} formId
     * @returns {void}
     */
    whatchInputs(formId) {
        const inputs = this.getFormInputs(formId);
        inputs.forEach(input => input.addEventListener('keyup', (event) => this.isInputValid(event.target)));
    }

    /**
     * @param {string} formId
     * @return { HTMLInputElement[] }
     */
    getFormInputs(formId) {
        const form = document.getElementById(formId);

        if (!form) {
            throw new Error("Form id: " + formId + " not found");
        }

        const inputs = Array.from(form.querySelectorAll('[app-input]'));
        return inputs;
    }

    /**
     * @param { string } formId
     * @returns { boolean }
     */
    isFormValid(formId) {
        let isValid = true;
        const inputs = this.getFormInputs(formId);

        inputs.forEach(input => {
            if (!this.isInputValid(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * @param { HTMLInputElement } input
     * @return { boolean }
     */
    isInputValid(input) {
        let inputState = true;
        let message = '';
        const results = this.validateAttributes(input);

        results.forEach(result => {
            if (!result.isValid) {
                inputState = false;
                message = result.message;
            }
        })

        if (inputState) {
            this.setAsValid(input, message);
        } else {
            this.setAsInvalid(input, message);
        }

        return inputState;
    }

    /**
     * @param {HTMLInputElement} input
     */
    validateAttributes(input) {
        const results = [];
        for (let index = 0; index < input.attributes.length; index++) {

            const attribute = input.attributes.item(index);

            if (ValidatorRepository.getValidators().has(attribute.name)) {
                const validator = ValidatorRepository.getValidators().get(attribute.name);
                const result = validator.validate(input.value, attribute.value);
                results.push(result);
            }
        }

        return results;
    }

    /**
     * set the class is-invalid on the input and set the feedback message on nest input
     * @param { HTMLInputElement } input
     * @param { string } message
     */
    setAsInvalid(input, message) {
        input.classList.add('is-invalid');
        this.setMessage(input, message);
    }

    /**
     *
     * @param { HTMLInputElement } input
     * @param { string } message
     */
    setAsValid(input, message) {
        input.classList.remove('is-invalid');
        this.setMessage(input, message);
    }

    /**
     *
     * @param { HTMLInputElement } input
     * @param { string } message
     */
    setMessage(input, message) {
        const parent = input.parentElement;
        let feedbackDiv = parent.querySelector('div');

        if (!feedbackDiv) {
            feedbackDiv = document.createElement('div');
            parent.appendChild(feedbackDiv);
        }

        feedbackDiv.innerHTML = message;
    }
}