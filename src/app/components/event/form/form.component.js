import { BaseComponent } from "../../../core/base.component";
import { FormValidationService } from "../../../core/form-validation.service";

export class FormComponent extends BaseComponent {

    constructor() {
        super('form');
        this.formValidatinService = new FormValidationService();
    }

    async onInit(){
        this.mapActions();
    }

    mapActions(){
        this.onSubmit();
    }

    onSubmit() {
        document.addEventListener('FormComponent.onSubmit', (event)=> {
            if( this.formValidatinService.isFormValid('event-form') ){
                this.sendFormData();
            }
        });
    }

    sendFormData() {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value
        }
        this.send('FormComponent.sendFormData', formData );    
    }
}