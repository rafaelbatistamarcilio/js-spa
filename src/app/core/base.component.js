

export class BaseComponent  extends HTMLElement {
    constructor( templateName ) {
        super();
        this.templateName = templateName;
    }

    connectedCallback() {
        this.loadTemplate('components/'+this.templateName + '.html').then( html => {
            this.innerHTML = html;
            this.onInit();
        });
    }

    async loadTemplate(templateUrl) {
        return await fetch( templateUrl ).then( response => response.text() );
    }

    /**
     * send a custom event with some data
     * @param {string} eventName 
     * @param {any} data 
     * @returns {void}
     */
    send(eventName, data){
        const event = new CustomEvent(eventName, {detail: data});
        document.dispatchEvent(event);
    }
}