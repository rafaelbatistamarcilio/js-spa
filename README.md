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

<p> First create an html file that will be used as the component template</p>

```html
<!-- my-component-template.html -->
<div >
    <button id="my-btn"> Action from component </button>
</div>
<div >
    <p id="my-text"> </p>
</div>
```

<p> To create a new component you just need to create a ES6 JavaScript class extending BaseComponent </p>

```javascript
//my.component.js

import {BaseComponent} from './path/to/base.component'

export class MyComponent extends BaseComponent {

    constructor() {
        super('my-component-template'); // pass the template name on the super constructor
    }

    /** onInit is executed after template has been loaded */
    onInit(){
        this.mapActions();
    }

    mapActions(){
        document.getElementById('my-btn').addEventListener('click', ()=> this.myMethod() );
        //or using JQuery $('#my-btn').click( ()=> this.myMethod() );
    }
    
    myMethod(){
        document.getElementById('my-text').innerHTML = 'Hello World!';
        //or using JQuery $('#my-text').text( 'Hello World!' );
    }
}

```

<p>Then register MyComponent in the file</p>

```javascript
//app.components.js
export class AppComponents {
    static getComponents() {
        return [
            {
                name:'app-my-component',
                class: MyComponent
            }
        ]
    }
}
```

<h2><b>Comunication between Components</b></h2>

<p> Communication  between native web components are made via events </p>

```javascript
//parent.component.js
export class ParentComponent extends BaseComponent{
    constructor() {
        super('parent-template'); 
    }

    /** onInit is executed after template has been loaded */
    onInit(){
        this.mapActions();
    }

    mapActions() {
              
        //listem for event 'event-name-listened-by-parent-component'
        document.addEventListener('event-name-listened-by-parent-component' , (event)=> {
            const eventData = event.detail; 
            console.log(eventData.message); //print hello world
        });
        
        //send event to child component
        this.send( 'event-name-listened-by-child-component', {message:'hello'} );
    }
}

//child.component.js
export class ChildComponent extends BaseComponent {
    constructor() {
        super('child-template'); 
    }

    /** onInit is executed after template has been loaded */
    onInit(){
        this.mapActions();
    }

    mapActions() {
        //listem for event 'event-name-listened-by-child-component'
        document.addEventListener('event-name-listened-by-child-component' , (event)=>{
            console.log(event.message); // print hello
            const eventData = event.detail;
            eventData.message += ' world';
            
            //send data to parent component
            this.send( 'event-name-listened-by-parent-component', eventData );
        });
    }
}

```

<h2><b>Services</b></h2>

<p> Services are just pure ES6 JavaScript classes that holds some reusable logic </p>

```javascript
//my.service.js
export class MyService {
    someMethod() {
        const someVariable = // some logic
        return someVariable;
    }
}

//my.component.js

import {MyService} from './path/to/my.service';

export class MyComponent extends BaseComponent {

    constructor() {
        super('my-component-template'); 
        this.myService = new MyService();
    }

    onInit(){
        this.mapActions();
    }

    mapActions(){
        $('#my-btn').click( ()=> this.myMethod() );
    }
    
    myMethod(){
        const text = this.myService.someMethod();
        $('#my-text').text( text );
    }
}
```
