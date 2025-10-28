const { readFileSync, writeFileSync, mkdirSync, unlinkSync } = require("fs"), { resolve } = require("path");
const ms = require("@synquery/ms"), pkgj = require('./package.json');
const pathTo = p => resolve(__dirname, p);

const inputFilePath = pathTo("index.js"), inputContent = readFileSync(inputFilePath).toString();
const outputDirectory = pathTo("dist");
const outputMinifyPath = [ 
  pathTo(`${outputDirectory}/OutLog.min.js`),
  pathTo(`${outputDirectory}/OutLog-v${pkgj.version}.min.js`) 
];
try { unlinkSync(outputDirectory, { recursive: true }); } catch(e) { /*IGNORE*/ }
try { mkdirSync (outputDirectory, { recursive: true }); } catch(e) { /*IGNORE*/ }
ms({ 'OutLog.js': inputContent }, {
  outputOriginDirectory: outputDirectory,
  outputMinifyPath,
}).then(()=>{
  console.log(`✨ BUILD SUCCESSFULLY! Generated files at: ${outputDirectory}`)
});