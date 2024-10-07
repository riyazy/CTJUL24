import { LightningElement, api } from 'lwc';
const columns = [
    { label: 'Label', fieldName: 'name' },
];

export default class CtCombinationTable extends LightningElement {
    // Input of the Characters to get Permutation values
    @api inpList;
    // Input size of the characters to control the processing
    @api inpSize = 1;

    data = [];

    constructor() {
        super();
        console.log('inside CtCombinationTable constructor');
    }

    connectedCallback() {
        console.log('inside CtCombinationTable connectedCallback');
        console.table(this.inpList);
    }

    renderedCallback() {
        console.log('inside CtCombinationTable renderedCallback');
        console.table(this.inpList);
        
        if(this.inpList != null && this.inpList.length == this.inpSize) {
            // do the combination
            console.log('getPermutation to work');
            const outputList = this.getPermutation(this.inpList);
            console.log('outputList ' + JSON.stringify(outputList));
        }
    }

    // Function Declaration
    getPermutation(inputList) {
        console.log('inside getPermutation for ' + JSON.stringify(inputList));

        // Return
        var outputList = [];

        // Exit Conditions
        if(inputList.length == 0) return outputList;
        if(inputList.length == 1) return inputList;

        // Recursive Call - ANV
        // NV
        // AV
        // AN 
        for(var i = 0; i < inputList.length; i++) {
            const revInput = inputList.splice(i, 1);
            console.log(JSON.stringify(revInput));
            const outputListwithFirstCharacter = this.getPermutation(revInput);
            
            // output
            console.log(JSON.stringify(outputListwithFirstCharacter));

            outputList = [...outputList, ...outputListwithFirstCharacter];
        }

        // output
        return outputList;
    }
}