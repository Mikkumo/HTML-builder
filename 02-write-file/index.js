const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = require('process');
const way = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('    Enter text: \n');

stdin.on('data', (data) => {
  if (data.toString().trim().toLowerCase() === 'exit') {
    closeFunc();
  } 
  way.write(data);
});

process.on('SIGINT', closeFunc);

function closeFunc() {
  stdout.write('    Goodbay!');
  exit();
}
