
import { BaseComponent } from '../../core/base.component';

import template from './event.html';

export class EventComponent extends BaseComponent {

    constructor() {
        super(template);
    }

    onInit(){
        this.mapActions();
    }

    mapActions(){
        $('#btn-send').click( ()=>  this.sendToElementById('my-form', 'FormComponent.onSubmit') );
        
        const form = document.getElementById('my-form');
        form.addEventListener('FormComponent.sendFormData', (event)=> {
            document.getElementById('form-data').innerHTML = 'Data from child component: ' + JSON.stringify(event.detail);
        });
    }
}