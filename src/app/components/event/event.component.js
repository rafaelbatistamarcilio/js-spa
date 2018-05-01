
import { BaseComponent } from '../../core/base.component';

export class EventComponent extends BaseComponent {

    constructor() {
        super('event');
    }

    async onInit(){
        this.mapActions();
    }

    mapActions(){
        $('#btn-send').click( ()=>  this.sedToElementById('my-form', 'FormComponent.onSubmit') );
        
        const form = document.getElementById('my-form');
        form.addEventListener('FormComponent.sendFormData', (event)=> {
            document.getElementById('form-data').innerHTML = 'Data from child component: ' + JSON.stringify(event.detail);
        });
    }
}