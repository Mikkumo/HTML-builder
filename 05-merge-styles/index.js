const fs = require('fs');
const path = require('path');
let oldWay = path.join(__dirname, 'styles');
let newWay = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(oldWay, (err, files) => {
  if (err) return err;
  fs.writeFile(newWay, '', (err) => {
    if (err) return err;
  });

  files.forEach((file) => {
    let fileWay = path.join(oldWay, file);

    if (path.parse(fileWay).ext === '.css') {
      fs.createReadStream(fileWay).on('data', (data) => {
        fs.appendFile(newWay, data, (err) => {
          if (err) return err;
        });
      });
    }
  });
});


