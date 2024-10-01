export default class StringUtility {
    DEFAULT_STRING = 'ABC';

    IsNullOrEmpty = (value) => {
        if (typeof(value) == "string")
            return (value.length == 0);
        else
            return (value == null);
    }
}