## Node.js Stream & Buffer

```
const fs = require('fs');

const ourReadStream = fs.createReadStream(`${__dirname}/data.txt`, 'utf8');

ourReadStream.on('data', (chunk) => {
    console.log(chunk);
});

```
