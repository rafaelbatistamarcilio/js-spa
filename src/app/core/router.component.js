import { RouterService } from "./router.service";

export class RouterComponent  extends HTMLElement {
    constructor( ) {
        super();
        this.router = new RouterService();
    }

    connectedCallback() {
        this.onInit();
    }

    onInit() {
        window.onhashchange = (currentHash) => this.onHasChange(currentHash);
        this.renderView();
    }

    onHasChange(currentHash){
        this.updateHistory(currentHash);
        this.renderView();
    }

    updateHistory(curr) {

        if (!window.location.lasthash) {
            window.location.lasthash = [];
        }

        if (window.location.lasthash.length == 0 ||
            window.location.lasthash[window.location.lasthash.length - 1] != window.location.hash) {
            window.location.lasthash.push(window.location.hash);
        }
    }

    renderView() {
        const route = this.router.getCurrentRoute();
        this.innerHTML ='';
        this.appendChild( new route.component() );
    }
}