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

<h2><b>Communication  between Components</b></h2>

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

<h2><b>Loop a component to show some data </b></h2>

<p> If you take a look at BaseComponent you will see that all components that extends BaseComponent need to pass the template name for the BaseComponent constructor. That occurs because the template are loaded via HTTP request. </p>

p> Components made to be iterated in a loop can't have your template loaded via http because that demands too much time. </p>

<p> So what you need to do is not extends BaseComponent and declare the component template via HTML string like in the next example: </p>

```javascript
//loop-item.component.js
export class LoopItemComponent extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback() {
        this.loadtemplate();
    }
    
    loadtemplate(){

        this.innerHTML =`
        <div >
            <div > Item: ${ this.item_id } </div>
            <div > Description: ${ this.description } </div>
        </div>`;
    }

    /**
     * create a instance of the compoent with them properties filed
     * @param {{id:number, description: string}} itemData 
     * @returns {ListItemComponent}
     */
    static build(itemData){
        const item = new ListItemComponent();
        item.setInfo(itemData);
        return item;
    }

    setInfo(itemData){        
        this.item_id = itemData.id;
        this.description = itemData.description;
    }

    get item_id(){
        return this.getAttribute('item_id');
    }

    set item_id(item_id){
        this.setAttribute('item_id', item_id);
    }

    get description(){
        return this.getAttribute('description');
    }

    set description(description){
        this.setAttribute('description', description);
    }
}

```

<p>And to use the LoopItemComponent you can do the following<p>

```javascript
//list.component.js
import { BaseComponent } from "./path/to/base.component";
import { LoopItemComponent } from "./path/to/loop-item.component";

export class LoopItemComponent extends BaseComponent {
    constructor() {
        super('list');
        this.itens = [
            {
                id: 1,
                description: "test item 1"
            },
            {
                id: 2,
                description: "test item 2"
            },
            {
                id: 3,
                description: "test item 3"
            }
        ]
    }

    onInit() {
        this.itens.forEach( item => this.appendItem(item) );
    }

    appendItem( itemData ) {
        // data-container is the id of the element that will hold the ListItemComponent elements
        $('#data-container').append( ListItemComponent.build(itemData) );
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
