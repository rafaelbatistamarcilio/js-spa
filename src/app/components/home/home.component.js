import { BaseComponent } from "../../core/base.component";

export class HomeComponent  extends BaseComponent {

    constructor(){
        super('home');     
    }

    async onInit(){
        this.mapActions();
    }

    mapActions(){
        $('#btn-test').click( (event)=> alert('Alert called from component') );
    }
}