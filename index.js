const dns = require('dns');
const path = require('path');
const os = require('os');
const fs = require('fs');

const mypath = '/home/uysys/Developement/node-js-tutorial/index.js';
// console.log(path.extname(mypath));
// console.log(os.freemem());
// console.log(os.cpus());

// file write
// synchronous not recommended
fs.writeFileSync('myfile.txt', 'Hellow Programmers');
fs.writeFileSync('myfile.txt', 'Hellow Node Lover');

// append test
fs.appendFileSync('myfile.txt', ' Hellow Programmers');

// Read File
const data = fs.readFileSync('myfile.txt');
// console.log(data); // get Buffer formate
// console.log(data.toString()); // get string

// asynchronous highly recommended
fs.writeFile('myfileasyn.txt', 'Hellow Programmers', (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('File written successfully!');
    }
});
