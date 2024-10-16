import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import MatchChannel from '@salesforce/messageChannel/MatchChannel__c';

export default class MatchSummary extends LightningElement {
    subscription = null;

    @wire(MessageContext)
    messageContext;

    matchData = {};

    matchDataText;

    connectedCallback() {
        console.log('subscriber component is started');
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        console.log('subscriber component is ended');
        this.unsubscribeToMessageChannel();
    }        

    handleMessage(message) {
        console.log('inside handleMessage');
        console.log(message);
        this.matchData = message;
        this.matchDataText = JSON.stringify(message);
    }

    subscribeToMessageChannel() {
        console.log('subscriber component creating subscription');
        if (!this.subscription) {
            console.log('subscriber component calling subscription');
            this.subscription = subscribe(
                this.messageContext,
                MatchChannel,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }
    
    unsubscribeToMessageChannel() {
        console.log('subscriber component unsubscribing');
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}