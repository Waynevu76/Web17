// console.log("Hello world!!!");

// //const let var
// const constVariable = "ABC";
// //constVariable = "XYZ";

// let variable = "123456";
// console.log(typeof variable);
// variable = 5;
// console.log(typeof variable);
// variable = true;
// console.log(typeof variable)    

// let obj = {
//     name: "Quang",
//     age: 28
// };
// console.log(typeof obj);
// console.log(obj);

// console.log(obj.name);
// console.log(obj["age"]);

// obj.lastName = "Quang";
// obj["firstName"] = "Vu";
// console.log(obj)
// obj.age += 1;
// console.log(obj);
// console.log("Minh ten la " + obj.name);
// console.log(`Minh ten la ${obj.name}`);
// console.log(`let's
// dsapod
// go`);

// let arr = [1, 2, 3, 82, 93, "123", "12322"];
// console.log(arr);
// for(let i = 0; i < arr.length; i++) {
//     console.log(arr[i]);
// }

// arr.forEach(function(item, index, array) {
//     console.log(item, index, arr);
// });

// console.log(arr.map(function(item){
//     return item*2;
// }));

// function functionA(param1, param2) {
//     console.log(param1);
//     console.log(param2);
// }

// functionA("assaasdfdaf", 1243432);

// const functionB = function() {
//     console.log("Hello!");
// }

// functionB();

// const functionC = () => {
//     console.log("Hello!");
// }

// functionC();

// let now = new Date;
// function scope

// var a = 5;
// function print() {
//     var b = 10;
//     console.log(a);
//     console.log(b);
// }

// print();

// console.log(a); // 5
// //console.log(b); // underfined

// setTimeout(function() {
//     console.log("Abc");
// }, 5000);
function print(num, waitTime) {
    setTimeout(function() {
        console.log(num);
    }, waitTime*1000);
}

function countDown(count) {
    for(var i = count; i>= 0; i--) {
        print(i, count - i)
    }
}

countDown(5);