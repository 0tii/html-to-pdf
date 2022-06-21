# HTML2PDF JS
A simple asynchronous library to create customizable PDFs from HTML or URL as ``stream``, ``buffer`` or ``base64 string``. Other than most npm-solutions for html-to-pdf conversion, this one leverages ``puppeteer`` as opposed to the far outdated ``phantomJS`` and is ES6 compatible.

## Options
This solution provides a great number of options to configure for your conversion, passed to the exposed function as a js object.
```javascript
{
    fileType: 'base64', // 'base64' | 'buffer' | 'stream'
    url: '', //if specified ignores html
    viewPort: '1920x1080', //string (width)x(height)
    timeout: 5000, //timeout for page loading in ms
    landscape: false,
    format: '', //letter | legal | tabloid | ledger | a0 | a1 | a2 | a3 | a4 | a5 | a6
    displayHeaderFooter: true,
    headerTemplate: '',
    footerTemplate: '',
    width: '1920', //pdf file size in pixels or with units
    height: '1080', //pdf file size in pixels or with units
    marginTop: 0, //num in pixels or with units
    marginBottom: 0, //num in pixels or with units
    marginLeft: 0, //num in pixels or with units
    marginRight: 0, //num in pixels or with units
    omitBackground: false, //hide html background, allows for transparency
    pageRanges: '', //'1-12' | '3-5'
    path: '', //file save path
    preferCSSPageSize: false, //css-declared page size takes precedent over format, width and height
    printBackground: true, //apply visual styling
    scale: 1, //render scale, must be between 0.1 and 2
    screenMedia: false, //use 'screen' instead of 'print' CSS media
    optimizePerformance: false, //use pdf stream, useful for larger documents, requires conversion for b64 and buffer
}
```