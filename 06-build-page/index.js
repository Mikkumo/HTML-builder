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

copyFile(oldWayImg, newWayImg);
copyFile(oldWayFonts, newWayFonts);
copyFile(oldWaySvg, newWaySvg);
  
function copyFile(oldWay, newWay) {  
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
  let templ = data;
  
  fs.readdir(path.join(__dirname, 'components'), (err, files) => {
    files.forEach((file, i) => {
      fs.readFile(path.join(path.join(__dirname, 'components'), file), 'utf-8', (err, data) => {
        templ = templ.replace(`{{${file.slice(0, file.lastIndexOf('.'))}}}`, data);
        if (i === files.length - 1) {
          setTimeout(() => fs.writeFile(path.join(newWay, 'template.html'), templ, () => {}), 100);
        }
      });
    });
  });
});
  
fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  let result = '';
  const cssFilesList = files.filter((file) => file.slice(file.lastIndexOf('.')) === '.css');

  cssFilesList.forEach((file) => {
    fs.readFile(path.join(path.join(__dirname, 'styles'), file), 'utf-8', (err, data) => {
      result += data;
      fs.writeFile(path.join(newWay, 'style.css'), result, (err) => {
        if (err) return err;
      });
    });
  });
});
  