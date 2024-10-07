import { LightningElement, api } from 'lwc';

export default class SimpleForm extends LightningElement {
    @api nameMap = new Map();
    initials = [];
    combination = [];

    constructor() {
        super();
    }

    addName(event) {
        // console.log(JSON.stringify(event.detail));
        const inp = event.detail;
        this.nameMap.set(inp.label, inp.value);
        console.log('inside addName from ' + inp.label + ' with value ' + inp.value);
        this.initials = [];
        this.nameMap.forEach(
            (value, key, map) => {
                // console.log('including ' + value.substring(0, 1));
                this.initials.push(value.substring(0, 1));
                // console.log(JSON.stringify(this.initials));
            }
        );

        console.log(JSON.stringify(this.initials));
    }
}