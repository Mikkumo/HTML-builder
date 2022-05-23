const fs = require('fs');
const path = require('path');
const newWay = path.join(__dirname, 'project-dist');
const newWayAssets = path.join(__dirname, 'project-dist', 'assets');
const oldWayFonts = path.join(path.join(__dirname, 'assets', 'fonts'));
const newWayFonts = path.join(__dirname, 'project-dist', 'assets', 'fonts');
const oldWayImg = path.join(path.join(__dirname, 'assets', 'img'));
const newWayImg = path.join(__dirname, 'project-dist', 'assets', 'img');
const oldWaySvg = path.join(path.join(__dirname, 'assets', 'svg'));
const newWaySvg = path.join(__dirname, 'project-dist', 'assets', 'svg');

fs.mkdir(newWay, () => {
  fs.mkdir(newWayAssets, () => {
    fs.mkdir(newWayFonts, () => {});
    fs.mkdir(newWayImg, () => {});
    fs.mkdir(newWaySvg, () => {});
  });
});

copyDir(oldWayImg, newWayImg);
copyDir(oldWayFonts, newWayFonts);
copyDir(oldWaySvg, newWaySvg);
  
function copyDir(oldWay, newWay) {  
  delDir(newWay);
  
  fs.readdir(oldWay, (err, files) => {
    files.forEach((file) => {
      fs.readFile(path.join(oldWay, file), (err, data) => {
        if (err) return err;
        fs.mkdir(newWay, {recursive: true}, () => {
          fs.writeFile(path.join(newWay, file), data, (err) => {
            if (err) return err;
          });
        });
      });
    });
  });
}

function delDir(way) {
  fs.readdir(way, (err, files) => {
    if (files) {
      files.forEach(file => {
        fs.unlink(path.join(way, file), () => {});
      });
    }
  });
}

fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
  if (err) return err;
  let templ = data;
  
  fs.readdir(path.join(__dirname, 'components'), (err, files) => {
    if (err) return err;
    files.forEach((file, i) => {
      fs.readFile(path.join(path.join(__dirname, 'components'), file), 'utf-8', (err, data) => {
        if (err) return err;
        templ = templ.replace(`{{${file.slice(0, file.lastIndexOf('.'))}}}`, data);
        if (i === files.length - 1) {
          fs.writeFile(path.join(newWay, 'template.html'), templ, () => {});
        }
      });
    });
  });
});

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) return err;
  fs.writeFile(path.join(newWay, 'style.css'), '', (err) => {
    if (err) return err;
  });

  files.forEach((file) => {
    let fileWay = path.join(path.join(__dirname, 'styles'), file);

    if (path.parse(fileWay).ext === '.css') {
      fs.createReadStream(fileWay).on('data', (data) => {
        fs.appendFile(path.join(newWay, 'style.css'), data, (err) => {
          if (err) return err;
        });
      });
    }
  });
});
