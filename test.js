import converter from "./index.js";

console.log(await converter('<h1>hi</h1>', {
    fileType: 'base64', // 'base64' | 'buffer' | 'stream'
    url: '', //if specified ignores html
    viewPort: '1920x1080', //string (width)x(height)
    timeout: 5000, //timeout for page loading in ms
    landscape: false,
    format: '', //letter | legal | tabloid | ledger | a0 | a1 | a2 | a3 | a4 | a5 | a6
    displayHeaderFooter: true,
    headerTemplate: '',
    footerTemplate: '',
    width: '1920', //document size in pixels or with units (in, mm, cm)
    height: '1080', //document size in pixels or with units (in, mm, cm)
    marginTop: 0, //num in pixels or with units (in, mm, cm)
    marginBottom: 0, //num in pixels or with units (in, mm, cm)
    marginLeft: 0, //num in pixels or with units (in, mm, cm)
    marginRight: 0, //num in pixels or with units (in, mm, cm)
    avoidTableRowBreak: true, //tries avoiding breaking table rows between pages
    omitBackground: false, //hide html background, allows for transparency
    pageRanges: '', //'1-12' | '3-5'
    path: '', //file save path, if empty no file is created
    preferCSSPageSize: false, //css-declared page size takes precedent over format, width and height
    printBackground: true, //apply background styling
    trueColors: true, //use unaltered colors
    scale: 1, //render scale, must be between 0.1 and 2
    screenMedia: false, //use 'screen' instead of 'print' CSS media
}));