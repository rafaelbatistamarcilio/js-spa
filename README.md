<h2><b>Example of a JavaScript SPA (Single Page Aplication)</b></h2>

<p>Created using Angular concepts</p>
<p>ES6 classes</p>
<p>Compatibility with old browsers using polyfill</p>

<h2><b>Instalation</b></h2>

<p> mkdir my-project  </p>
<p> cd my-project  </p>
<p> git pull https://github.com/rafaelbatistamarcilio/js-spa.git . </p>
<p> npm i </p>

<h2><b>Routing</b></h2>

<p> To add a new route to your project, just add a new entry on the AppRouting class </p>


```javascript
//app.routing.js

import {MyComponent} from './path/to/my/component'

export class AppRouting {
    static getRoutes() {
        return [
            {
                url: 'my-route',
                component: MyComponent
            }
        ]
    }
}

```


<h2><b>Components</b></h2>

<p> To add a new route to your project, just add a new entry on the AppRouting class </p>
