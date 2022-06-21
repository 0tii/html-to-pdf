/*
Simple asynchronous library to convert html or URL to PDF stream by leveraging puppeteer.0

© 2022 Daniel Rauhut
*/
import puppeteer from 'puppeteer';

/**
 * Convert a html string or website (by url) to a pdf file
 * @param {*} html html string
 * @param {*} options options object, refer to the doc for specific options
 * @returns 
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

        try {
            //navigate to or create desired content
            if (options.url)
                await page.goto(options.url, {
                    WaitUntil: 'domcontentloaded',
                    timeout: options.timeout || 5000
                });
            else
                await page.setContent(html, {
                    waitUntil: 'domcontentloaded',
                    timeout: options.timeout || 5000
                });

            //inject css for true colors
            if (options.trueColors)
                await page.addStyleTag({ content: `html, body { print-color-adjust: exact }` });

            //inject css to avoid rows breaking between pages
            if (options.avoidTableRowBreak) {
                await page.addStyleTag({ content: `table { page-break-inside:auto }` });
                await page.addStyleTag({ content: `tr { page-break-inside:avoid; page-break-after:auto }` });
            }

            if (options.screenMedia)
                await page.emulateMediaType('screen');

            const pdfStream = await page.createPDFStream(options);
            const pdfBuffer = await streamToBuffer(pdfStream);

            await browser.close();

            if (options.fileType === 'buffer')
                resolve(pdfBuffer);
            else
                resolve(pdfBuffer.toString('base64'));

        } catch (err) {
            reject(err);
        }

        //x resolve(options.fileType === 'buffer' ? pdf : pdf.toString('base64'));
    });
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
 * Convert a html string or website (by url) to a pdf file
 * @param {*} html html string
 * @param {*} options options object, defaults are respected
 * @returns 
 */
const html2pdf = async function convertWithDefaults(html, {
    fileType = 'base64',
    url = '',
    viewPort = '1920x1080',
    timeout = 5000,
    landscape = false,
    format = '',
    displayHeaderFooter = true,
    headerTemplate = '',
    footerTemplate = '',
    width = '1920',
    height = '1080',
    marginTop = 0,
    marginBottom = 0,
    marginLeft = 0,
    marginRight = 0,
    avoidTableRowBreak = true,
    omitBackground = false,
    pageRanges = '',
    path = '',
    preferCSSPageSize = false,
    printBackground = true,
    trueColors = true,
    scale = 1,
    screenMedia = false
}) {
    return await convert(html, {
        fileType: fileType,
        url: url,
        viewPort: viewPort,
        timeout: timeout,
        landscape: landscape,
        format: format,
        displayHeaderFooter: displayHeaderFooter,
        headerTemplate: headerTemplate,
        footerTemplate: footerTemplate,
        width: width,
        height: height,
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
        avoidTableRowBreak: avoidTableRowBreak,
        omitBackground:  omitBackground,
        pageRanges: pageRanges,
        path: path,
        preferCSSPageSize: preferCSSPageSize,
        printBackground: printBackground,
        trueColors: trueColors,
        scale: scale,
        screenMedia: screenMedia
    });
}

export default html2pdf;