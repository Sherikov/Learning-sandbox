import { capitalize, reverseString, calculator, caeserCipher, analyzeArray } from "./script";

describe('Capitalize', () =>{
    test('Firsr letter capitalize', () => {
    expect(capitalize('moscow')).toBe('Moscow');
});
});


describe('Reverse', () => {
    test('Reverse string', () => {
    expect(reverseString('apple')).toBe('elppa');
});
});

describe('Calculation', () => {
    test('Sum of two number', () => {
    expect(calculator.add(2,2)).toBe(4);
    });

    it('Subtract b from a', () => {
        expect(calculator.subtract(6,4)).toBe(2);
    });

    it('Multiply a to b', () => {
        expect(calculator.multiply(10,5)).toBe(50);
    });
    it('Divide a to b', () => {
        expect(calculator.divide(10,5)).toBe(2);
    });
})

describe('Caesar Cipher', () => {
    test('Simple shift', () => {
        expect(caeserCipher('abc', 1)).toBe('bcd');
    });

    test('Shift from z to a', () => {
        expect(caeserCipher('xyz', 3)).toBe('abc');
    });

    test('Case preservation', () => {
        expect(caeserCipher('HeLLo', 3)).toBe('KhOOr');
    });

    test('Punctuation', () => {
        expect(caeserCipher('Hello, World!', 3)).toBe('Khoor, Zruog!');
    });

    test('big shift', () => {
        expect(caeserCipher('abc', 27)).toBe('bcd'); 
    });
});

describe('Analyze Array', () =>{
    test('Analyze', () => {
        expect(analyzeArray([1, 2, 3, 4, 5])).toEqual({
        average: 3,
        min: 1,
        max: 5,
        length: 5
    });
    });
})