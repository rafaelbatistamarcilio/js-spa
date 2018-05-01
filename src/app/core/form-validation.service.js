
import { ValidatorRepository } from "./validators/validator.repository";

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
     * when the user leave the input that will be validated
     * be shure that every form input have the needed validator anothation 
     * @see {ValidatorRepository}
     * @param {string} formId 
     * @returns {void}
     */
    whatchInputs(formId){
        const form = document.getElementById(formId);

        if(!form){
            throw new Error("Form id: "+formId+" not found");
        }

        const inputs = form.querySelectorAll('[app-input]');

        for(let index = 0; index < inputs.length; index++) {
            const input = inputs.item(index);
            input.addEventListener('blur', (event)=> this.isInputValid(event.target) );
        }
    }

    /**
     * @param { string } formId 
     * @returns { boolean }
     */
    isFormValid(formId) {
        let isValid = true;
        const inputs = document.getElementById(formId).querySelectorAll('[app-input]');

        for(let index = 0; index < inputs.length ; index++){
            if( !this.isInputValid( inputs.item(index) ) ){
                isValid = false;
            }
        }
        return isValid;
    }

    /**
     * @param { HTMLInputElement } input 
     * @return { boolean }
     */
    isInputValid( input ) {
        for( let index = 0; index < input.attributes.length ; index++ ){
            const attribute = input.attributes.item(index);
            if( ValidatorRepository.getValidators().has( attribute.name ) ) {

                const validator = ValidatorRepository.getValidators().get( attribute.name );
                const result = validator.validate( input.value, attribute.value );

                if( result.isValid ) {
                    this.setAsValid(input, result.message );
                    return true;
                } else{
                    this.setAsInvalid(input, result.message );
                    return false;
                }
            }
        }
    }

    /**
     * set the class is-invalid on the input and set the feedback message on nest input 
     * @param { HTMLInputElement } input 
     * @param { string } message 
     */
    setAsInvalid( input, message ){
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        this.setMessage( input, message );
    }

    /**
     * 
     * @param { HTMLInputElement } input 
     * @param { string } message 
     */
    setAsValid(input, message){
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        this.setMessage( input, message );
    }

    /**
     * 
     * @param { HTMLInputElement } input 
     * @param { string } message 
     */
    setMessage( input, message ){
        const parent = input.parentElement;
        let feedbackDiv = parent.querySelector('div');
        
        if(!feedbackDiv){
            feedbackDiv = document.createElement('div');
            parent.appendChild(feedbackDiv);
        }

        feedbackDiv.innerHTML = message ;
    }
}