import { RouterComponent } from "./router.component";
import { AppComponents } from "../app.components";

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