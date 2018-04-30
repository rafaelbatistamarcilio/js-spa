import { HomeComponent } from "./components/home/home.component";
import { ListComponent } from "./components/list/list.component";
import { EventComponent } from "./components/event/event.component";

/**
 * define on that class the routes that will be accessed via browser URL
 * every URL mus be maped to a component
 * ex:
 *  [ {url: 'home', component:'HomeComponent' } ]
 */
export class AppRouting {
    static getRoutes() {
        return [
            {
                url: 'home',
                component: HomeComponent
            },
            {
                url: 'events',
                component: EventComponent
            },
            {
                url: 'list',
                component: ListComponent
            }
        ]
    }
}