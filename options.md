# HTML2PDF conversion options
A more detailed explanation of the available options.

## Options

### `fileType`<br/>
`string`, `[optional]`, default: `base64`\
The type which the file content will resolve to.
- `base64` will return the file content as base64 encoded string
- `Buffer` will return the file content as Buffer object

### `url`<br/>
`string`, `[optional]`, default: `empty`\
The url of the website to print to PDF. If specified, it will override the PDF conversion of the `html` parameter content. Has to specify protocol.
- Example url: `https://google.com`
- Don't: `www.google.com`

### `viewPort`<br/>
`string`, `[optional]`, default: `1920x1080`\
The emulated screen resolution, that the PDF will be printed as. Must be given as `(width)x(height)`
- Example: `1280x720`
- Don't: `1920*1080`, `(1920)x(1080)`

### `timeout`<br/>
`number`, `[optional]`, default: `5000`\
The emulated screen resolution, that the PDF will be printed as.

### `landscape`<br/>
`boolean`, `[optional]`, default: `false`\
Whether or not the PDF should be created in landscape orientation.

### `format`<br/>
`enum PageFormat | string`, `[optional]`, default: `empty`\
The page format used to print as. Available page formats are:
- `letter`
- `legal`
- `tabloid`
- `a0`
- `a1`
- `a2`
- `a3`
- `a4`

### `repeatTableHeader`<br/>
`boolean`, `[optional]`, default: `false`\
Whether or not html-table headers should repeat after page breaks. In order for this to work, the table headers have to wrapped in a `<thread>` tag.

### `repeatTableFooter`<br/>
`boolean`, `[optional]`, default: `false`\
Whether or not html-table footers should repeat after page breaks. In order for this to work, the table footers have to wrapped in a `<tfoot>` tag.

### `displayHeaderFooter`<br/>
`boolean`, `[optional]`, default: `true`\
Whether or not page headers and footers should be included. This can be customized further with a html template for `headerTemplate` and `footerTemplate`.

### `headerTemplate`<br/>
`string`, `[optional]`, default: `empty`\
A HTML template to be used as page header.

### `footerTemplate`<br/>
`string`, `[optional]`, default: `empty`\
A HTML template to be used as page footer.

### `width`<br/>
`number | string`, `[optional]`, default: `1920`\
The width of the PDF file. As number (defaults to pixels) or string with units. Valid units are [`cm`, `mm`, `in`].
Example: `10cm`, `5in`

### `height`<br/>
`number | string`, `[optional]`, default: `1080`\
The height of the PDF file. As number (defaults to pixels) or string with units. Valid units are [`cm`, `mm`, `in`].
Example: `10cm`, `5in`

### `marginTop`<br/>
`number | string`, `[optional]`, default: `0`\
The top content margin on the PDF pages. As number (defaults to pixels) or string with units. Valid units are [`cm`, `mm`, `in`].
Example: `10cm`, `5in`

### `marginBottom`<br/>
`number | string`, `[optional]`, default: `0`\
The bottom content margin on the PDF pages. As number (defaults to pixels) or string with units. Valid units are [`cm`, `mm`, `in`].
Example: `10cm`, `5in`

### `marginLeft`<br/>
`number | string`, `[optional]`, default: `0`\
The left content margin on the PDF pages. As number (defaults to pixels) or string with units. Valid units are [`cm`, `mm`, `in`].
Example: `10cm`, `5in`

### `marginRight`<br/>
`number | string`, `[optional]`, default: `0`\
The right content margin on the PDF pages. As number (defaults to pixels) or string with units. Valid units are [`cm`, `mm`, `in`].
Example: `10cm`, `5in`

### `breakImages`<br/>
`boolean`, `[optional]`, default: `false`\
Controls whether an image that extends over multiple pages is broken apart in print.

### `avoidTableRowBreak`<br/>
`boolean`, `[optional]`, default: `false`\
Controls whether table rows should be split between pages or if table rows should be preserved.

### `avoidDivBreak`<br/>
`boolean`, `[optional]`, default: `false`\
Controls whether ``<div>``s should be split between pages or preserved.

### `omitBackground`<br/>
`boolean`, `[optional]`, default: `false`\
Controls whether the html background should be omitted to allow for transparency.

### `pageRanges`<br/>
`string`, `[optional]`, default: `empty`\
Define a range of pages to include in the pdf. Given as a range string.
Example: `'3-5'`

### `path`<br/>
`string`, `[optional]`, default: `empty`\
The absolute or relative path that the PDF file should be saved at. This overrides the pupeteer-native save function using `bufferToPdf`. If empty, no PDF will be saved.

### `disableJavascript`<br/>
`boolean`, `[optional]`, default: `false`\
Controls whether javascript should be allowed on the target page.

### `preferCSSPageSize`<br/>
`boolean`, `[optional]`, default: `false`\
Controls whether the ``page size`` CSS attribute set on the target site/html should be preferred over the `width`, `height` and `format`.

### `printBackground`<br/>
`boolean`, `[optional]`, default: `true`\
Controls whether ``background-color`` CSS attributes are used in print.

### `trueColors`<br/>
`boolean`, `[optional]`, default: `true`\
`Puppeteer` changes colors for print by default, in order to print the true page colors, this option has to be set to `true`.

### `scale`<br/>
`number`, `[optional]`, default: `1`, minimum value: `0.1`, maximum value: `2.0`\
The scale at which the page should be rendered.

### `screenMedia`<br/>
`boolean`, `[optional]`, default: `false`\
Controls whether to use the `screen` CSS media instead of the `print` ones.