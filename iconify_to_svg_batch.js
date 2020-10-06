/// Extract from JSON collections and dump fonts as SVG files 
/// https://github.com/iconify/json-tools.js

const fs = require('fs');
const {SVG, Collection} = require('@iconify/json-tools');

let rawdata = fs.readFileSync("./node_modules/@iconify/json/collections.json");
let allCollections = JSON.parse(rawdata);
console.log(allCollections);

fs.mkdirSync('dump');

for (var key in allCollections) {
    console.log(key);

    path = 'dump/' + key;

    fs.mkdirSync(path);

    path += '/';

    let collection = new Collection();
    collection.loadIconifyCollection(key);
    collection.listIcons(true).forEach(icon => {
        let svg = new SVG(collection.getIconData(icon));
        fs.writeFileSync(path + icon + '.svg', svg.getSVG({
            height: 'auto'
        }));
    });
}

console.log('DONE!')
