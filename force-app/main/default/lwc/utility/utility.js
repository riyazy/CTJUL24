function isNullOrEmpty(value) {
    console.log('inside isNullOrEmpty fn declaration with ' + this);
    console.log(this);
    if (typeof(value) == "string")
        return (value.length == 0);
    else
        return (value == null);
}

const isTypeString = (value) => {
    console.log('inside isTypeString arrow fn with ' + this);
    console.log(this);
    if (typeof(value) == "string")
        return true;

    return false;
}
    
export { isNullOrEmpty, isTypeString };