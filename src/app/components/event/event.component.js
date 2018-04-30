
import { BaseComponent } from '../../core/base.component';

export class EventComponent extends BaseComponent {

    constructor() {
        super('event');
    }

    async onInit(){
        this.mapActions();
    }

    mapActions(){
        $('#btn-send').click( ()=> this.send('FormComponent.onSubmit') );
        
        document.addEventListener('FormComponent.sendFormData', (event)=> {
            document.getElementById('form-data').innerHTML = 'Data from child component: ' + JSON.stringify(event.detail);
        });
    }
}