const fs = require('fs');

const dataPath = 'e:/GERENWW/ww/src/data.ts';
let content = fs.readFileSync(dataPath, 'utf8');

// Use regex or string replacement to inject `details` into each project.
// Wait, actually I can just recreate the projects array and replace it in the file.
// Let's do a simple regex or AST. 
