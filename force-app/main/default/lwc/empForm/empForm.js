import { LightningElement } from 'lwc';
import createEmpApexFn from '@salesforce/apex/EmployeeController.createEmployee';

export default class EmpForm extends LightningElement {
    eName;
    eMobile;

    handleSubmit(e) {
        console.log('inside handleSubmit');

        createEmpApexFn({name: this.eName})
            .then(result => {
                console.log('inside then');
                console.log(result);
            })
            .catch(error => {
                console.log('inside catch');
                console.log(error);
            })
    }
}