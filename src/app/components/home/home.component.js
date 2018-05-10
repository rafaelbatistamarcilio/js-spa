import { BaseComponent } from "../../core/base.component";

import template from './home.html';

export class HomeComponent  extends BaseComponent {

    constructor() {
        super(template);
    }

    onInit(){
        this.mapActions();
    }

    mapActions(){
        $('#btn-test').click( ()=> alert('Alert called from component') );
    }
}