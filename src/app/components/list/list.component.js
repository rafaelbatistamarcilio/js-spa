import {
    BaseComponent
} from "../../core/base.component";
import { ListItemComponent } from "./list-item/list-item.component";

export class ListComponent extends BaseComponent {
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
        $('#data-container').append( ListItemComponent.build(itemData) );
    }
}
