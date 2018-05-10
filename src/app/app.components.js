import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { MainComponent } from "./components/main/main.component";
import { ListComponent } from "./components/list/list.component";
import { ListItemComponent } from "./components/list/list-item/list-item.component";
import { EventComponent } from "./components/event/event.component";
import { FormComponent } from "./components/event/form/form.component";

/**
 * that class keep the components and tha names used on HTML to use than
 * ex:
 *  [{ name: app-header, class: HeaderComponent}]
 *
 * on the HTML file you can use
 *  <app-header></app-header>
 */
export class AppComponents {
    static getComponents() {
        return [
            {
                name:'app-main',
                class: MainComponent
            },
            {
                name:'app-header',
                class: HeaderComponent
            },
            {
                name:'app-home',
                class: HomeComponent
            },
            {
                name:'app-event',
                class: EventComponent
            },
            {
                name:'app-form',
                class: FormComponent
            },
            {
                name:'app-list',
                class: ListComponent
            },
            {
                name:'app-list-item',
                class: ListItemComponent
            }
        ]
    }
}