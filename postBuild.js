const fs = require('fs');
const path = require('path');
const glob = require('glob');
const assets = glob.sync(__dirname + '/build/static/media/*.ttf*')
  .map((assetPath) => {
    return path.relative(__dirname + '/build', assetPath);
  });


const svgs = glob.sync(__dirname + '/build/static/media/*.svg*')
  .map((assetPath) => {
    return path.relative(__dirname + '/build', assetPath);
  });

const webps = glob.sync(__dirname + '/build/static/media/*.webp*')
  .map((assetPath) => {
    return path.relative(__dirname + '/build', assetPath);
  });



const pathToEntry = './build/index.html';
const splitBy = '</title>';

const builtHTMLContent = fs.readFileSync(pathToEntry).toString();

const parts = builtHTMLContent.split(splitBy);

const fileWithPreload = [
  parts[0],
  splitBy
];

for (const link of assets) {
  fileWithPreload.push(`<link rel="preload" href="./${link}" as="font" crossOrigin="anonymous">`);
}

for (const link of svgs) {
  if (link.includes("record") || link.includes("logo")) {
    fileWithPreload.push(`<link rel="preload" href="./${link}" as="image" type="image/svg+xml">`);
  }
}

for (const link of webps) {
  if (link.includes("large"))
  fileWithPreload.push(`<link rel="preload" href="./${link}" as="image" type="image/webp">`);
}

fileWithPreload.push(parts[1]);

fs.writeFileSync(pathToEntry, fileWithPreload.join(''));
