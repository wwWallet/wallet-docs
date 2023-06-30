var nomnoml = require('nomnoml')
var fs = require('fs');
var path = require('path')


const dirPath = path.join(__dirname, "nomnoml-diagrams");
const fileNames = fs.readdirSync(dirPath);

fileNames.map((fileName) => {
    const filePath = path.join(dirPath, fileName);
    const fileData = fs.readFileSync(filePath);
    const destPath = path.join(__dirname, "static/img/diagrams/"+fileName.replace('.noml', '.svg'))
    fs.writeFileSync(destPath, nomnoml.renderSvg(fileData.toString()))
})

