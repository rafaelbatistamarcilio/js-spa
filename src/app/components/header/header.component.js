import { BaseComponent } from "../../core/base.component";
import { RouterService } from "../../core/router.service";

export class HeaderComponent  extends BaseComponent {

    constructor() {
        super( 'header' );
        this.router = new RouterService();
    }

    onInit() {
        this.mapActions();
    }

    mapActions(){
        $('#btn-home').click( ()=> this.router.navigateTo('home') );
        $('#btn-events').click( ()=>  this.router.navigateTo('events') );
        $('#btn-list').click( ()=>  this.router.navigateTo('list') );
    }


}