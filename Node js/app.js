const fs = require('fs');
const fileController = require("./fileCOntroller");

console.log(fileController);
console.log(fileController.readFile("hello.txt"));
const readFile = fileController.readFile;

const { readFile } = fileController;
readFile("hello.txt", (fileData) => {
    console.log("Hello", fileData);
})
const obj = {
    a: 20,
    b: 10,
    c: 25
}

console.log(readFile("hello.txt"));

const { a, b, c, d=10} = obj;
console.log(a, b, c, d);



// console.log('Begin');
// fs.writeFile('Hello.txt', 'Hello world', function(err) {
//     if(err) console.log(err);
//     else console.log('Write file success');
// })
// console.log('End');

// console.log('Begin');
// fs.readFile('Hello.txt', {encoding: 'utf-8'}, function(err, data) {
//     if(err) console.log(err);
// //     else console.log('File data: ', data);
// });
// const objectData = {
//     name: 'Quang',
//     age: 18
// }
// //convert object to string data using json
// fs.writeFileSync('hello.txt', JSON.stringify(objectData));
// console.log('begin read sync');
// const data = fs.readFileSync('hello.txt', {encoding: 'utf-8'});
// //convert string data to object using json
// const parseData = JSON.parse(data);
// console.log('file: ', parseData.name);
// console.log('file: ', parseData.age);

// console.log('end read sync');
