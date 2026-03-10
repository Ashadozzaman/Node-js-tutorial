const fs = require('fs');

const ourReadStream = fs.createReadStream(`${__dirname}/data.txt`, 'utf8');
const ourWriteStream = fs.createWriteStream(`${__dirname}/data2.txt`);

// ourReadStream.on('data', (chunk) => {
//     console.log(chunk);
// });
// ourReadStream.on('data', (chunk) => {
//     ourWriteStream.write(chunk);
// });
ourReadStream.pipe(ourWriteStream);
