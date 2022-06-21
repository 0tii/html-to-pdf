import converter from "./index.js";

console.log(await converter('<h1>hi</h1>', {fileType: 'buffer'}));