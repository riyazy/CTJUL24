import { LightningElement, api } from 'lwc';

export default class CtInput extends LightningElement {
    @api ctLabel;

    // Event Handler
    changeHandler(event) {
        console.log('inside changeHandler');

        // Creates the event with label and input value as data.
        let data = { label: this.ctLabel, value: event.detail.value };
        // Event Definition
        const selectedEvent = new CustomEvent("ctinput", { detail: data } );

        // Dispatches the event.
        this.dispatchEvent(selectedEvent);

        // console.log('event dispatched with ' + JSON.stringify(data));
    }

    processInput() {
        console.log('inside processInput with' + this.template.querySelector('lightning-input').value);
        let data = { label: this.ctLabel, value: this.template.querySelector('lightning-input').value };
        const selectedEvent = new CustomEvent("ctinput", { detail: data } );

        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }
}