
import template from './list-item.html';

export class ListItemComponent extends HTMLElement {

    constructor(){
        super();
        this.innerHTML = template;
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
        this.querySelector('#item_id').innerHTML = itemData.id;
        this.querySelector('#item_description').innerHTML = itemData.description;
    }
}