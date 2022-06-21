# 🖥️ HTML2PDF
A simple asynchronous library to create highly customizable PDFs from HTML or URL as ``buffer`` or ``base64 string``. Other than most npm-solutions for html-to-pdf conversion, this one leverages ``puppeteer`` as opposed to the far outdated ``phantomJS`` and is ES6 compatible. It also provides far more options to configure to your liking than most similar solutions.

## Usage
Using HTML2PDF is quick and simple

## Options
This solution provides a great number of options to configure for your conversion, passed to the exposed function as a javascript object. You can leave most of these in their default state to get a good result.
```javascript
{
    fileType: 'base64', // 'base64' | 'buffer'
    url: '', //if specified ignores html
    viewPort: '1920x1080', //string (width)x(height)
    timeout: 5000, //timeout for page loading in ms
    landscape: false,
    format: '', //letter | legal | tabloid | ledger | a0 | a1 | a2 | a3 | a4 | a5 | a6
    repeatTableHeader: false, //repeat html table headers on each page
    repeatTableFooter: false, //repeat html table footers on each page
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
    avoidDivBreak: false, //tries to avoid breaking divs between pages - can cause unwanted behavior
    omitBackground: false, //hide html background, allows for transparency
    pageRanges: '', //'1-12' | '3-5'
    path: '', //file save path, if empty no file is created
    preferCSSPageSize: false, //css-declared page size takes precedent over format, width and height
    printBackground: true, //apply background styling
    trueColors: true, //use unaltered colors
    scale: 1, //render scale, must be between 0.1 and 2
    screenMedia: false //use 'screen' instead of 'print' CSS media
}
```