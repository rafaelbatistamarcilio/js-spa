<h2><b>Example of a JavaScript SPA (Single Page Aplication)</b></h2>

<p>Created using Angular concepts</p>
<p>ES6 classes</p>

<h2><b>Instalation</b></h2>

<p> mkdir my-project  </p>
<p> cd my-project  </p>
<p> git pull https://github.com/rafaelbatistamarcilio/js-spa.git . </p>
<p> npm i </p>
<p> npm start </p>

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
import temmplate from './path/to/my-component-template.html';

export class MyComponent extends BaseComponent {

    constructor() {
        super(temmplate); // pass the template to super constructor
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


<h2><b>Use a component in another component template</b></h2>

<p> If you want to use a component on another component template, just add the component tag on the parent component template </p>

```html
<!-- parent-template.html -->
<div>
    <button id="my-btn"> Action from component </button>
</div>
<div>
    <!-- THE TEMPLATE OF MyCustomComponent WILL BE RENDERED HERE -->
    <app-my-component></app-my-component>
</div>
```


<h2><b>Communication  between Components</b></h2>

<p> Communication  between native web components are made via events </p>

```javascript
//parent.component.js
export class ParentComponent extends BaseComponent{
    constructor() {
        super(temmplate); 
    }

    /** onInit is executed after template has been loaded */
    onInit(){
        this.mapActions();
    }

    mapActions() {
              
        //listem for event 'event-name-listened-by-parent-component'
        const childComponentElement = document.getElementById('child-component-id-on-parent-template');
        childComponentElement.addEventListener('event-name-listened-by-parent-component' , (event)=> {
            const eventData = event.detail; 
            console.log(eventData.message); //print hello world
        });
        
        //send event to child component
        this.sedToElementById('child-component-id-on-parent-template', 'event-name-listened-by-child-component', {message:'hello'} );
    }
}

//child.component.js
export class ChildComponent extends BaseComponent {
    constructor() {
        super(temmplate); 
    }

    /** onInit is executed after template has been loaded */
    onInit(){
        this.mapActions();
    }

    mapActions() {
        //listem for event 'event-name-listened-by-child-component'
        this.addEventListener('event-name-listened-by-child-component' , (event)=>{
            const eventData = event.detail;
            console.log(eventData.message); // print hello
            eventData.message += ' world';
            
            //send data to parent component
            this.send( 'event-name-listened-by-parent-component', eventData );
        });
    }
}

```

<h2><b>Loop a component to show some data </b></h2>

<p> To make easier declare properties on loop template, do not extends BaseComponent and declare the component template via HTML string like in the next example:</p>

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
     * create a instance of the compoent with them properties filled
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

<h2><b>Form validation</b></h2>

<p> To make easy validate forms dynamically, use the FormValidationService </p>

<p> If you have a form like that </p>

```html
<!-- my-component-template.html -->
<form id="my-form">
    <div class="form-group">
        <label> Field 1: </label>
        <input app-input app-required type="text" id="field-1" class="form-control"/>
    </div>
    <div class="form-group">
        <label> Field 2: </label>
        <input app-input app-max-size="5" type="text" id="field-2" class="form-control"/>
    </div>
    <div class="form-controll">
        <button type="button" id="my-btn" > send </button>
    </div>
</form>
```

<p> Then you can validate your form easely like that :</p>

```javascript

//my.component.js

import {FormValidationService} from './path/to/core/form-validation.service';

export class MyComponent extends BaseComponent {

    constructor() {
        super('my-template'); 
        this.formValidationService = new FormValidationService();
    }

    onInit(){
        this.mapActions();
    }

    mapActions(){
        $('#my-btn').click( ()=> this.validateForm() );
    }
    
    validateForm() {
        
        if(!this.formValidationService.isFormValid('my-form')) {
            console.log('FORM IS INVALID');
            // if that happens, invalid fields will be marked as red
        }
    }
}
```

<p> <b> IMPORTANT! </b>: just fields with the attribute "app-input" will be validated </p>

<p> <b> IMPORTANT! </b>: just fields with some validator attribute like "app-required" will be validated. Don't worry, we will see more about validators on next section </p>

<p> <b> IMPORTANT! </b>: to trigger form inputs validatin on blur event just call the method watchInputs like follow</p>

```javascript

//my.component.js

import {FormValidationService} from './path/to/core/form-validation.service';

export class MyComponent extends BaseComponent {

    constructor() {
        super('my-template'); 
        this.formValidationService = new FormValidationService();
    }

    onInit(){
        this.mapActions();
    }

    mapActions(){
        //trigger input validation when input blur event is triggered
        this.formValidationService.whatchInputs('my-form');
        
        $('#my-btn').click( ()=> this.validateForm() );
    }
    
    validateForm() {
        
        if(!this.formValidationService.isFormValid('my-form')) {
            console.log('FORM IS INVALID');
            // if that happens, invalid fields will be marked as red
        }
    }
}
```

<h2><b>Validators</b></h2>

<p> Validators are classes that hold some input validation logic and returns a object with a flag that say if the input is valid or not and a feedback message </p>

```javascript
//max-size.validator.js
export class MaxSizeValidator {

    /**
     * validate if the given value is lower
     * @param { string } value 
     * @param { number } validator 
     * @returns { isValid: boolean, message: string }
     */
    static validate( value , validator ) {
        if(value.length < validator){
            return { 
                isValid: true, 
                message: ''
            }
        } 

        return {
            isValid: false,
            message: 'values must be lower than ' + validator
        }
    }
}
```

<p> To register your custom validator, create a ES6 class like the MaxSizeValidator and register it on ValidatorRepository </p>

```javascript
//validator.repository.js
import { MaxSizeValidator } from "./max-size.validator";
import { MyCustomValidator } from "./path/to/my-custom.validator";

export class ValidatorRepository {
    /**
     * @returns { Map< string, { validate: (value:string, validator:string) => { isValid: boolean, message: string }} > }
     */
    static getValidators() {
        const validators = new Map();
        validators.set('app-max-size', MaxSizeValidator);
        
        // app-my-validator is like you can call the validator on a form input
        // <input app-input app-my-validator />
        validators.set('app-my-validator', MyCustomValidator);
        return validators;
    }
}
```
<p> <b> IMPORTANT! </b>: your custom validator must have the method validate that receives 2 params, first the input value, second the validator value </p>



<h2><b> Communication with backend or external API via HTTP calls</b></h2>

<p> To communicate with with backend or some external API via HTTP calls just use the HttpService </p>

```javascript
//my.component.js

import {HttpService} from './path/to/core/http.service';

export class MyComponent extends BaseComponent {

    constructor() {
        super('my-template'); 
        this.http = new HttpService();
    }

    onInit(){
        this.someAsyncMethod();
    }
    
    // IMPORTANT: await just works on async methods
    async someAsyncMethod() {
    
        //use await to avoid then chais
        //data
        const responseData =  await this.http.get('some-api-url');
                
    }
}
```
