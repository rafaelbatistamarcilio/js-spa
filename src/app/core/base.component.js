export class BaseComponent extends HTMLElement {
    constructor(template) {
        super();
        this.template = template;
    }

    connectedCallback() {
        this.innerHTML = this.template;
        this.onInit();
    }

    /**
     * send a custom event with some data
     * @param {string} eventName
     * @param {any} data
     * @returns {void}
     */
    send(eventName, data) {
        const event = new CustomEvent(eventName, {
            detail: data
        });
        this.dispatchEvent(event);
    }

    /**
     * dispatch an event to a element identifyed by given id
     * @param {string} elementId
     * @param {string} eventName
     * @param {any} data
     */
    sendToElementById(elementId, eventName, data) {
        const element = document.getElementById(elementId);

        if (!element) throw new Error('Element id: ' + elementId + ' not found!');

        const event = new CustomEvent(eventName, {
            detail: data
        });
        element.dispatchEvent(event);
    }
}