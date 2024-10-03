import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import STREET_FIELD from '@salesforce/schema/Contact.MailingStreet';

export default class LightningRecordFormDemo extends LightningElement {
    fields = [NAME_FIELD, STREET_FIELD];

    @api recordId;
    @api objectApiName;
}