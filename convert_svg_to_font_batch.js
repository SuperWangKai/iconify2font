/// https://github.com/jaywcjlove/svgtofont

const fs = require('fs');
let rawdata = fs.readFileSync("./node_modules/@iconify/json/collections.json");
let allCollections = JSON.parse(rawdata);
//console.log(allCollections);

//fs.mkdirSync('ttf');

const svgtofont = require('svgtofont');

index = 0;
fonts = []
for (var key in allCollections) {
    fonts.push(key)
}

for (i = 0; i < fonts.length; i++) {
    if (fonts[i] == "cib") {
        index = i + 2; // FIXME! skip cib, simple-icons, they lead crash
        break;
    }
}

function process_one() {
    font = fonts[index];

    srcPath = 'dump/' + font;
    dstPath = 'ttf/' + font;

    console.log('converting: ' + srcPath + '->' + dstPath);

    svgtofont({
        src: srcPath,   // svg path
        dist: dstPath,  // output path
        fontName: font, // font name
        css: false,     // create CSS files
        svgicons2svgfont: {
            fontHeight: 1000,
            normalize: true
          },
      }).then(() => {
        console.log(font + ' done!');
        index++;
        if (index < fonts.length)
        {
            process_one();
        }
      });
}

process_one()
