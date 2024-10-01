import { LightningElement, api, wire } from 'lwc';
import getAddr from '@salesforce/apex/ContactAddressController.getAddress';

import StringUtility from 'c/utility';
import HospitalUtility from 'c/utility';

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

        console.log(StringUtility);
        if(StringUtility.IsNullOrEmpty(this.address['city'])) {
            this.address['city'] = 'Unknown';
        }
    }

    handleStateChange(event) {
        // Handle State change
        this.address['state'] = event.target.value;

        console.log(HospitalUtility);
        this.address['state'] = HospitalUtility.getREMSId();
    }

    handleCountryChange(event) {
        // Handle Country change
        this.address['country'] = event.target.value;
    }

    handleUpdateAddress(event) {
        // Verify Street
        this.validateEmpty(this.address['street'], 'handleUpdateAddress');
        // Update Address
        console.log('Updating Address');
    }
}