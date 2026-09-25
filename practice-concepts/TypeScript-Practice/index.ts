function getString<T>(args: Array<T>): string {
     
    return args.join("-");
}
 
let result = getString<number>( [1,2,6,5,7]);
let result = getString<number>( ['Mike', 'John', 'Tom', 'Jerry']);
console.log(result);