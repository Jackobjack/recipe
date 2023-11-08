const arr = [23, 45, 12];
const arr2 = [...arr, 44, 1223];

let myFunc = a => {
    console.log('too : ${a}');
}
myFunc(arr2[1]);

