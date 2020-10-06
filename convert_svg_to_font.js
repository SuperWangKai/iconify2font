const fs = require('fs');

 var svg2font = require("svg2font");
 svg2font.generate("./copy/", "./final", {
   fileName: 'iconfont',
 });