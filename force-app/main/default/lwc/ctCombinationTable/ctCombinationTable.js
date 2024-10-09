import { LightningElement, api, track } from 'lwc';
const COLUMNS = [
    { label: 'Label', fieldName: 'name' },
    { label: 'Key', fieldName: 'key' }
];

export default class CtCombinationTable extends LightningElement {
    // Input of the Characters to get Permutation values
    @api inpList;
    // Input size of the characters to control the processing
    @api inpSize = 1;

    @track data = [];
    columns = COLUMNS;

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
        
        if(this.data.length == 0 && this.inpList != null && this.inpList.length == this.inpSize) {
            // do the combination
            console.log('getPermutation to work');
            const outputList = this.getPermutation(this.inpList);
            this.data = outputList.map((val, index) => { return { key: index, name: val }; });
            console.log('outputList ' + JSON.stringify(outputList));
            console.log('data ' + JSON.stringify(this.data));
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
            console.log(i + ' & ' + inputList.at(i));
            const tempInput = [...inputList];
            tempInput.splice(i, 1);
            console.log(JSON.stringify(tempInput));
            const tempOutput = this.getPermutation(tempInput);
            
            // output
            console.log('output of getPermutation ' + JSON.stringify(tempOutput));

            tempOutput.forEach(
                (value, key, map) => {
                    console.log('joining ' + inputList.at(i) + value);
                    outputList.push(inputList.at(i) + value);
                    console.log(JSON.stringify(outputList));
                }
            ) 
        }

        // output
        console.log('before exit from the function' + JSON.stringify(outputList));

        // output
        return outputList;
    }
}