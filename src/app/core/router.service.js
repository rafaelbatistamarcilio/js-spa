import {
    AppRouting
} from "../app.routing";


export class RouterService {

    constructor() {}

    getCurrentRoute() {

        const url = this.getUrl();
        const current = AppRouting.getRoutes().find(route => url.split('/')[0] == route.url);

        if (current) {
            return current;
        }

        return AppRouting.getRoutes()[0];
    }

    getRouteParam() {
        const url = this.getUrl();
        const param = url.split('/')[1];
        return param ? param : '';
    }

    getUrl() {
        const url = location.hash.replace("#", '');
        return url;
    }

    navigateTo(url, param) {
        const find = AppRouting.getRoutes().find(route => route.url === url);

        if (!find) {
            throw Error("Route " + url + ' not found!');
        }

        location.hash = "#" + url + '/' + (param ? param : '');
    }
}