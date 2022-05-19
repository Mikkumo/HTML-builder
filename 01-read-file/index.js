const fs = require('fs');
const path = require('path');
const readText = fs.createReadStream(path.join(__dirname, 'text.txt'));

readText.on ('data', (elem) => {
  console.log(elem.toString());
});
