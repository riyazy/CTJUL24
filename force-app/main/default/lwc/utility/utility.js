function isNullOrEmpty(value) {
    console.log('inside isNullOrEmpty fn with ' + this);
    if (typeof(value) == "string")
        return (value.length == 0);
    else
        return (value == null);
}

const isTypeString = (value) => {
    console.log('inside isTypeString fn with ' + this);
    if (typeof(value) == "string")
        return true;

    return false;
}
    
export { isNullOrEmpty, isTypeString };