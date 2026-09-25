export function capitalize(word) {
    if(!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function reverseString(str) {
    let reverseString = str.split('').reverse().join('');
    return reverseString;
}

export const calculator = {
    add: (x , y) => x + y,
    divide: (x, y) => x / y,
    subtract: (x, y) => x - y,
    multiply: (x, y) => x * y
}

export function shiftChar (char, shift) {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90 ) {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
    }

    if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % 26) + 97 )
    }
    return  char;
}

export function caeserCipher(word, passNum){
    const shift =passNum % 26;
    return word.split('').map(char => shiftChar(char, shift)).join('');
}

export function analyzeArray(arrayNum){
    if (arrayNum.length == 0) return null;
    let sum = arrayNum.reduce((acc, curr) => acc + curr, 0);
    let average = sum / arrayNum.length;
    const min = Math.min(...arrayNum);
    const max = Math.max(...arrayNum);
    const object = {
        average: average,
        min    : min,
        max    : max,
        length : arrayNum.length
    }
    return object;
}