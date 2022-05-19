const fs = require('fs');
const path = require('path');
let way = path.join(__dirname, 'secret-folder');

fs.readdir(way, {withFileTypes: true}, (err, files) => {
  files.forEach(elem => {
    if (elem.isFile() === true) {
      let name;
      (elem.name[0] !== '.') ? name = elem.name.slice(0, elem.name.lastIndexOf('.')) : name = elem.name;
      
      let ext = elem.name.slice(elem.name.lastIndexOf('.') + 1);

      fs.stat(path.join(way, elem.name), (err, stats) => {
        console.log(`${name} - ${ext} - ${stats.size / 1000}'`);
      });
    }
  });
});