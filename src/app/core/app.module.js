import {
    RouterService
} from "./router.service";
import {
    AppComponents
} from "../app.components";
import {
    RouterComponent
} from "./router.component";

export class AppModule {

    constructor() {
        this.onInit();
    }

    onInit() {
        this.registerComponents();
    }

    registerComponents() {
        AppComponents.getComponents().forEach(component => {
            window.customElements.define(component.name, component.class);
        });
        window.customElements.define('app-router', RouterComponent);
    }
}