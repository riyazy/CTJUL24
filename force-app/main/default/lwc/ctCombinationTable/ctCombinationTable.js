import { LightningElement, api } from 'lwc';
const columns = [
    { label: 'Label', fieldName: 'name' },
];

export default class CtCombinationTable extends LightningElement {
    @api inpList;

    data = [];

    constructor() {
        super();
        console.log('inside CtCombinationTable constructor');
    }

    connectedCallback() {
        console.log('inside CtCombinationTable connectedCallback');
        console.table(this.inpList);
    }

    renderedCallback() {
        console.log('inside CtCombinationTable renderedCallback');
        // console.table(this.inpList);
        
        if(this.inpList.length = 4) {
            // do the combination
        }
    }
}