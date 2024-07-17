import { LightningElement, api } from 'lwc';

export default class CtInput extends LightningElement {
    @api ctLabel;

    changeHandler(event) {
        console.log('inside changeHandler');

        // Creates the event with label and input value as data.
        let data = { label: this.ctLabel, value: event.detail.value };
        const selectedEvent = new CustomEvent("ctinput", { detail: data } );

        // Dispatches the event.
        this.dispatchEvent(selectedEvent);

        console.log('event dispatched with ' + JSON.stringify(data));
    }
}