const fs = require('fs');
const path = require('path');
let oldWay = path.join(__dirname, 'files');
let newWay = path.join(__dirname, 'files-copy');

fs.access(newWay, (err) => {
  if (err) {
    copyDir(oldWay, newWay);
  }
  else { 
    delDir(newWay);
    copyDir(oldWay, newWay);
  }
});

function copyDir(oldDir, newDir) {
  fs.mkdir(newWay, (err) => {
    if (err) return err;
  });

  fs.readdir(oldDir, {withFileTypes: true}, (err, elements) => {
    elements.forEach(elem => {
      if (elem.isFile()) {
        fs.copyFile( path.join(oldDir, elem.name), path.join(newDir, elem.name), (err) => {
          if (err) return err;
        });
      } else {
        copyDir(path.join(oldDir, elem.name), path.join(newDir, elem.name));
      }
    });
  });
}

function delDir(way) {
  fs.readdir(way, (err, files) => {
    if (files) {
      files.forEach(elem => {
        fs.unlink(path.join(way, elem));
      });
    }
  });
}


