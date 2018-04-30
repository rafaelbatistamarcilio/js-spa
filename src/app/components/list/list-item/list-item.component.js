
export class ListItemComponent extends HTMLElement {

    constructor(){
        super();
    }

    connectedCallback() {
        this.loadtemplate();
    }

    /**
     * how that component must to be iterated, fetch the template HTML
     * is to lower, than we need to define the template via HTML string
     */
    loadtemplate(){

        this.innerHTML =`
        <div class="card vs-1">
            <div class="card-header"> Item: ${ this.item_id } </div>
            <div class="card-body"> Description: ${ this.description }</div>
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