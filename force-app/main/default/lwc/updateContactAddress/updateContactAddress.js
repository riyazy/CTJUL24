import { LightningElement, api, wire, track } from 'lwc';
import getAddr from '@salesforce/apex/ContactAddressController.getAddress';
import updateAddr from '@salesforce/apex/ContactAddressController.updateAddress';
import updateAddrAfterValidation from '@salesforce/apex/ContactAddressController.updateAddressAfterValidation';

import { refreshApex } from '@salesforce/apex';
import { notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';

import { isNullOrEmpty, isTypeString } from 'c/utility';
//import getREMSId from 'c/utilityREMS';

export default class UpdateContactAddress extends LightningElement {
    @api recordId;

    address = {};

    // Arrow
    validateEmpty = (str, calledFrom) => { 
        console.log('inside validateEmpty from ' + calledFrom);
        console.log(this);
        console.log(JSON.stringify(this.address));
        if(str == '') {
            return false;
        }

        return true;
    }

    @wire (getAddr, { contactId: '$recordId' })
    getAddr({ error, data }) {
        if (data) {
            this.address = Object.assign({}, data); // data;
            this.validateEmpty(this.address['street'], 'getAddr');
            // this.address = {...data};
        } else if (error) {
            console.error(error);
        }
    }

    handleNameChange(event) {
        // Handle Name change
        this.address['name'] = event.target.value;
    }

    handleStreetChange(event) {
        // Handle Street change
        this.address['street'] = event.target.value;
        this.validateEmpty(this.address['street'], 'handleStreetChange');
    }

    handleCityChange(event) {
        // Handle City change
        this.address['city'] = event.target.value;

        if(isNullOrEmpty(this.address['city'])) {
            this.address['city'] = 'Unknown';
        }
    }

    handleStateChange(event) {
        // Handle State change
        this.address['state'] = event.target.value;
        if(isTypeString(this.address['state'])) {
            this.address['state'] = '';
        }
    }

    handleCountryChange(event) {
        // Handle Country change
        this.address['country'] = event.target.value;
    }

    handleUpdateAddress(event) {
        // Verify Street
        this.validateEmpty(this.address['street'], 'handleUpdateAddress');
        // Update Address
        updateAddr(JSON.stringify(this.address))
            .then(result => {
                console.log('Update Address Result: ' + result);
                refreshApex(this.address);
                notifyRecordUpdateAvailable([this.address.id]); // Refresh the Lightning Data Service cache
            })
            .catch(error => { 
                console.log('Update Address Error: ' + error);
            });
    }

    handleUpdateAddressAfterValidation(event) {
        // Update Address after validation - Continuation
        updateAddrAfterValidation(JSON.stringify(this.address))
            .then(result => {
                console.log('Update Address after validation Result: ' + result);
                refreshApex(this.address);
                notifyRecordUpdateAvailable([this.address.id]); // Refresh the Lightning Data Service cache
            })
            .catch(error => { 
                console.log('Update Address Error: ' + error);
            });
    }
}