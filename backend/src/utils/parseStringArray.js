module.exports = function parseStringArray(stringArray){
    return stringArray.split(',').map(string => string.trim());
};