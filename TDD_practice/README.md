# JS Testing & Jest Playground 🧪

This project is a practical introduction to **JavaScript unit testing** using the **Jest** framework. It focuses on writing clean, modular functions and ensuring their reliability through automated tests.

## 🚀 Included Features

The project consists of several utility functions designed to solve common programming tasks:

* **String Manipulation**: 
    * `capitalize(word)`: Capitalizes the first letter of a string.
    * `reverseString(str)`: Reverses the characters in a string.
* **Calculator**: An object containing methods for basic arithmetic: `add`, `subtract`, `multiply`, and `divide`.
* **Caesar Cipher**: A `caeserCipher(word, shift)` function that encrypts text by shifting characters while preserving case and punctuation.
* **Array Analysis**: An `analyzeArray(array)` function that returns an object containing the average, minimum, maximum, and length of a numeric array.

## 🧪 Testing Suite

The `script.test.js` file contains a comprehensive suite of tests to verify the logic of each function:

* **Logical Validation**: Ensures arithmetic and string operations return the correct outputs.
* **Edge Case Handling**: Tests the Caesar Cipher for shifting from 'z' to 'a' and handling punctuation/capitalization.
* **Object Structure**: Uses Jest's `toEqual()` to verify the structure and data returned by the array analysis utility.

## 🛠 Getting Started

### Prerequisites
You need to have [Node.js](https://nodejs.org/) installed on your system.

### Installation
1. Clone this repository.
2. Install the **Jest** testing framework as a development dependency:
   ```bash
   npm install --save-dev jest