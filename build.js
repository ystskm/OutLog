const { readFileSync, writeFileSync, mkdirSync, unlinkSync } = require("fs"), { resolve } = require("path");
const ms = require("ms");
const pathTo = p => resolve(__dirname, p);

const inputFilePath = pathTo("index.js"), inputContent = readFileSync(inputFilePath).toString();
const outputDirectory = pathTo("dist");
const outputMinifyPath = pathTo(`${outputDirectory}/OutLog.min.js`);
try { unlinkSync(outputDirectory, { recursive: true }); } catch(e) { /*IGNORE*/ }
try { mkdirSync (outputDirectory, { recursive: true }); } catch(e) { /*IGNORE*/ }
ms({ 'OutLog.js': inputContent }, {
  outputOriginDirectory: outputDirectory,
  outputMinifyPath,
}).then(()=>{
  console.log(`✨ BUILD SUCCESSFULLY! Generated files at: ${outputDirectory}`)
});