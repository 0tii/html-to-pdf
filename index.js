/*
Simple asynchronous library to convert html or URL to PDF stream by leveraging puppeteer.0

© 2022 Daniel Rauhut
*/
const puppeteer = require('puppeteer');
const fs = require('fs');

/**
 * Convert a html string or website to a pdf file
 * @param {*} html html string
 * @param {*} options options object, refer to the doc for specific options or 
 * @see convertWithDefaults
 * @returns HTML converted to PDF as either base64 string or buffer
 */
async function convert(html, options) {
    //add margins in puppeteer format
    options['margin'] = {
        bottom: options.marginBottom,
        left: options.marginLeft,
        right: options.marginRight,
        top: options.marginTop
    }

    return new Promise(async (resolve, reject) => {
        const browser = await puppeteer.launch({ headless: true });

        const page = await browser.newPage();

        try {
            await page.setViewport({
                width: parseInt(options.viewPort.split('x')[0]),
                height: parseInt(options.viewPort.split('x')[1]),
            });
        } catch {
            reject('Bad Viewport option.');
        }

        if (options.disableJavascript)
            await page.setJavaScriptEnabled(false);

        try {
            //navigate to or create desired content
            if (options.url) {
                await page.goto(options.url, {
                    WaitUntil: 'domcontentloaded',
                    timeout: options.timeout
                });
            }
            else {
                await page.setContent(html, {
                    waitUntil: 'domcontentloaded',
                    timeout: options.timeout
                });
            }

            await addCSSOptions(page, options);

            if (options.screenMedia)
                await page.emulateMediaType('screen');

            //check for path option and save manually to avoid unreliable puppeteer file save
            if (options.path) {
                var path = options.path;
                options.path = '';
            }

            const pdfStream = await page.createPDFStream(options);

            const pdfBuffer = await streamToBuffer(pdfStream);

            if (path)
                bufferToPdf(pdfBuffer, path);

            await browser.close();

            if (options.fileType === 'buffer')
                resolve(pdfBuffer);
            else
                resolve(pdfBuffer.toString('base64'));

        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Processes options that are based on injecting CSS into the target page
 * @param {*} page 
 * @param {*} options 
 */
async function addCSSOptions(page, options) {
    //inject css to repeat table header/footer on each page
    if (options.repeatTableHeader === false)
        await page.addStyleTag({ content: `thead {display: table-row-group; }` });

    if (options.repeatTableFooter === false)
        await page.addStyleTag({ content: `tfoot {display: table-row-group; }` });

    //inject css for accurate colors
    if (options.trueColors)
        await page.addStyleTag({ content: `html, body { print-color-adjust: exact }` });

    //inject css to avoid rows breaking between pages
    if (options.avoidTableRowBreak) {
        await page.addStyleTag({ content: `table { break-inside:auto }` });
        await page.addStyleTag({ content: `tr { break-inside:avoid; break-after:auto }` });
    }

    //inject css to avoid breaking images
    if (!options.breakImages) 
        await page.addStyleTag({ content: `img { break-inside: avoid }` });

    //inject css to avoid divs breaking between pages
    if (options.avoidDivBreak) 
        await page.addStyleTag({ content: `div { break-inside:avoid }` });
}

/**
 * Create a buffer from a stream
 * @param {*} stream the file stream
 * @returns buffer of stream content
 */
async function streamToBuffer(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
}

/**
 * write a base64 encoded pdf to a pdf file. Path must exist.
 * @param {*} base64 pdf file content as b64 string
 * @param {*} file path to write the file to, absolute or relative
 */
function base64ToPdf(fileContent, file) {
    const buffer = Buffer.from(fileContent, 'base64');
    bufferToPdf(buffer, file);
}

/**
 * write a buffer to a pdf file. Path must exist.
 * @param {*} fileContent pdf file content as buffer
 * @param {*} file path to write the file to, absolute or relative
 */
async function bufferToPdf(fileContent, file) {
    fs.writeFileSync(file, fileContent);
}

//? vvv this is a wrapper to keep the convert function clean while keeping option defaults in one place. vvv

/**
 * Convert a html string or website to a pdf file
 * @param {*} html html string
 * @param {*} options options object, defaults are respected
 * @returns HTML converted to PDF as either base64 string or buffer
 */
exports.html2pdf = async function html2pdf(
    html,
    {
        fileType = 'base64',
        url = '',
        viewPort = '1920x1080',
        timeout = 5000,
        landscape = false,
        format = '',
        repeatTableHeader = false,
        repeatTableFooter = false,
        displayHeaderFooter = true,
        headerTemplate = '',
        footerTemplate = '',
        width = '1920',
        height = '1080',
        marginTop = 0,
        marginBottom = 0,
        marginLeft = 0,
        marginRight = 0,
        breakImages = false,
        avoidTableRowBreak = true,
        avoidDivBreak = false,
        omitBackground = false,
        pageRanges = '',
        path = '',
        disableJavascript = false,
        preferCSSPageSize = false,
        printBackground = true,
        trueColors = true,
        scale = 1,
        screenMedia = false
    } = {}
) {
    return await convert(
        html,
        {
            fileType: fileType,
            url: url,
            viewPort: viewPort,
            timeout: timeout,
            landscape: landscape,
            format: format,
            repeatTableHeader: repeatTableHeader,
            repeatTableFooter: repeatTableFooter,
            displayHeaderFooter: displayHeaderFooter,
            headerTemplate: headerTemplate,
            footerTemplate: footerTemplate,
            width: width,
            height: height,
            marginTop: marginTop,
            marginBottom: marginBottom,
            marginLeft: marginLeft,
            marginRight: marginRight,
            breakImages: breakImages,
            avoidTableRowBreak: avoidTableRowBreak,
            avoidDivbreak: avoidDivBreak,
            omitBackground: omitBackground,
            pageRanges: pageRanges,
            path: path,
            disableJavascript: disableJavascript,
            preferCSSPageSize: preferCSSPageSize,
            printBackground: printBackground,
            trueColors: trueColors,
            scale: scale,
            screenMedia: screenMedia
        }
    );
}
exports.base64ToPdf = base64ToPdf;
exports.bufferToPdf = bufferToPdf;