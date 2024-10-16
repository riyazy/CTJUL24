import { LightningElement, wire } from 'lwc';
import NAME from '@salesforce/schema/Match__c.Name';
import TEAM1 from '@salesforce/schema/Match__c.Team_1__c';
import TEAM2 from '@salesforce/schema/Match__c.Team_2__c';
import X100 from '@salesforce/schema/Match__c.X100s__c';
import X50 from '@salesforce/schema/Match__c.X50s__c';
import X5WKTS from '@salesforce/schema/Match__c.X5_WKTS__c';
import { publish, MessageContext } from 'lightning/messageService';
import MatchChannel from '@salesforce/messageChannel/MatchChannel__c';

export default class MatchEntry extends LightningElement {
    FIELDS = [NAME, TEAM1, TEAM2, X100, X50, X5WKTS];

    @wire(MessageContext)
    messageContext;

    handleSuccess(event) {
        console.log('Success', event);

        let match = {};
        match.recordId = event.detail.id;
        match.recordData = { };

        for (let field of this.FIELDS) {
            match.recordData[field.fieldApiName] = event.detail.fields[field.fieldApiName].value;
        }

        const payload = Object.assign({}, match);
        console.log('Payload for Publishing ' + JSON.stringify(payload));
        publish(this.messageContext, MatchChannel, payload);
    }
}