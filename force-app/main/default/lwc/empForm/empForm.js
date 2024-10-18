import { LightningElement } from 'lwc';
import createEmpApexFn from '@salesforce/apex/EmployeeController.createEmployee';
import readEmpApexfn from '@salesforce/apex/EmployeeController.readEmployees';

const columns = [
    { label: 'Id', fieldName: 'Name', type: 'text' },
    { label: 'Name', fieldName: 'Employee_Name__c' },
    { label: 'Mobile', fieldName: 'Mobile_Number__c', type: 'phone' }
];

export default class EmpForm extends LightningElement {
    eName;
    eMobile;

    columns = columns;
    empList = [];

    constructor() {
        super();
    }

    loadFn() {
        readEmpApexfn({})
            .then(result => {
                console.log(result);
                console.table(result);
                this.empList = result;
            })
            .catch(error => {
                console.log(error);
            })
    }

    connectedCallback() {
        this.loadFn();
    }

    renderedCallback() {

    }

    handleSubmit(e) {
        console.log('inside handleSubmit with ' + this.eName);

        this.eName = this.template.querySelector("lightning-input[data-id='nameinput']").value;
        this.eMobile = this.template.querySelector("lightning-input[data-id='mobileinput']").value;

        createEmpApexFn({name: this.eName})
            .then(result => {
                console.log('inside then');
                console.log(result);
                this.template.querySelector("lightning-input[data-id='nameinput']").value = '';
                this.loadFn();
            })
            .catch(error => {
                console.log('inside catch');
                console.log(error);
            })
    }
}