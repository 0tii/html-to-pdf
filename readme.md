# 🖥️ HTML2PDF
An easy-to-use but reliable asynchronous library to create highly customizable PDFs from HTML or URL as ``buffer``, ``base64 string`` and ``.pdf file``. Other than most npm-solutions for html-to-pdf conversion, this one leverages ``puppeteer`` as opposed to the deprecated and unmaintained ``phantomJS``. It also provides far more options to configure to your liking than most similar solutions. This *might* be the best html-to-pdf solution on npm at this point.

## Installation
```
npm i [-g] better-html-pdf
```

## Available functions
Other than the main converter function, HTML2PDF exposes two more functions that allow writing pdf file content as both ``base64`` or ``buffer``. Those functions are also used internally to replace the situationally unreliable ``puppeteer``-native file save function that is controlled through the ``path`` option.

### Function signatures
Convert html to pdf
```typescript
html2pdf(html: string, options: Object) : Promise<string | Buffer>
```
Convert base64 file content to PDF file
```typescript
base64ToPdf(base64: string, file: string) : void
```
Convert file content buffer to PDF file
```typescript
bufferToPdf(buffer: Buffer, file: string) : void
```

### Usage
Using HTML2PDF is quick and simple: Import the ``html2pdf`` function and pass it the html and options.
```javascript
const { html2pdf, base64ToPdf, bufferToPdf } = require('html-pdf2');

//[...]
// convert html to PDF
const fileContentB64 = await html2pdf('<h1>Test</h1>', { avoidTableRowBreak: true, marginTop: 10, repeatTableHeader: false });
const fileContentBuffer = await html2pdf('<h1>Test</h1>', { fileType: 'buffer', url: 'https://google.com/', viewPort: '1000x700' });

//convert output to pdf file
base64ToPdf(fileContentB64, './test1.pdf');
bufferToPdf(fileContentBuffer, './test2.pdf');
```

For ``module`` users, ES6 imports work fine too.
```javascript
import { html2pdf } from 'html-pdf2';

//[...]
// convert html to PDF
const fileContentB64 = await html2pdf('<h1>Test</h1>', { avoidTableRowBreak: true, marginTop: 10, repeatTableHeader: false });
```
### Options
This solution provides a great number of options to configure for your conversion, passed as a javascript object. You can leave most of these in their default state to get a good result or tweak them to your liking/requirements. These are the options and their defaults:
```javascript
{
    fileType: 'base64', // 'base64' | 'buffer'
    url: '', //if specified ignores html
    viewPort: '1920x1080', //string (width)x(height)
    timeout: 5000, //timeout for page loading in ms
    landscape: false,
    format: '', //letter | legal | tabloid | ledger | a0 | a1 | a2 | a3 | a4 | a5 | a6
    repeatTableHeader: true, //repeat html table headers on each page - note: headers only repeat when in <thead>
    repeatTableFooter: true, //repeat html table footers on each page - note: footers only repeat when in <tfoot>
    displayHeaderFooter: true,
    headerTemplate: '',
    footerTemplate: '',
    width: '1920', //document size in pixels or with units (in, mm, cm)
    height: '1080', //document size in pixels or with units (in, mm, cm)
    marginTop: 0, //num in pixels or with units (in, mm, cm)
    marginBottom: 0, //num in pixels or with units (in, mm, cm)
    marginLeft: 0, //num in pixels or with units (in, mm, cm)
    marginRight: 0, //num in pixels or with units (in, mm, cm)
    breakImages: false, //break images between pages
    avoidTableRowBreak: true, //tries avoiding breaking table rows between pages
    avoidDivBreak: false, //tries to avoid breaking divs between pages - can cause unwanted behavior
    omitBackground: false, //hide html background, allows for transparency
    pageRanges: '', //'1-12' | '3-5'
    path: '', //file save path, if empty no file is created
    disableJavascript: false, //disable javascript on the target site/html
    preferCSSPageSize: false, //css-declared page size takes precedent over format, width and height
    printBackground: true, //apply background styling
    trueColors: true, //use unaltered colors
    scale: 1, //render scale, must be between 0.1 and 2
    screenMedia: false //use 'screen' instead of 'print' CSS media
}
```

## Dependencies
HTML2PDF depends on `puppeteer`.