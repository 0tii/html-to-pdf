import converter from "./index.js";
import fs from 'fs';

const b64 = await converter('<h1>hi</h1>');

fs.writeFileSync('./file.txt', b64);