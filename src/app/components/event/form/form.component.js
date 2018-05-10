import {
    BaseComponent
} from "../../../core/base.component";
import {
    FormValidationService
} from "../../../core/form-validation.service";

import template from './form.html';

export class FormComponent extends BaseComponent {

    constructor() {
        super(template);
        this.formValidatinService = new FormValidationService();
    }

    onInit() {
        this.mapActions();
    }

    mapActions() {
        this.formValidatinService.whatchInputs('event-form');
        this.onSubmit();
    }

    onSubmit() {
        this.addEventListener('FormComponent.onSubmit', () => {
            if (this.formValidatinService.isFormValid('event-form')) {
                this.sendFormData();
            }
        });
    }

    sendFormData() {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value
        }

        this.send('FormComponent.sendFormData', formData);
    }
}