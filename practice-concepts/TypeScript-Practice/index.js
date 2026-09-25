"use strict";
function example() {
    let x;
    x = Math.random() < 0.5;
    console.log(x);
    if (Math.random() < 0.5) {
        x = "Hello, world!";
        console.log(x);
    }
    else {
        x = 100;
        console.log(x);
    }
    return x;
}
example();
//# sourceMappingURL=index.js.map