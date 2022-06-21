/*
Simple asynchronous library to convert html or URL to PDF stream by leveraging puppeteer.0

© 2022 Daniel Rauhut
*/
import puppeteer from 'puppeteer';



const pdfOptions = {
    displayHeaderFooter: options.displayHeaderFooter,
    footerTemplate: options.footerTemplate,
    format: options.format,
    headerTemplate: options.headerTemplate,
    landscape: options.landscape,
    width: options.width,
    height: options.height,
    margin: {
        bottom: options.marginBottom,
        left: options.marginLeft,
        right: options.marginRight,
        top: options.marginTop
    },
    omitBackground: options.omitBackground,
    pageRanges: options.pageRanges,
    path: options.path,
    preferCSSPageSize: options.preferCSSPageSize,
    printBackground: options.printBackground,
    scale: options.scale
}

/**
 * Convert a html string or website (by url) to a pdf file
 * @param {*} html html string
 * @param {*} options options object, refer to the doc for specific options
 * @returns 
 */
async function convert(html, options) {

    //convert margins to puppeteer format
    options['margin'] = {
        bottom: options.marginBottom,
        left: options.marginLeft,
        right: options.marginRight,
        top: options.marginTop
    }

    return new Promise(async(resolve, reject) => {
        const browser = await puppeteer.launch({ headless: true });

        const page = await browser.newPage();

        try {
            await page.setViewport({
                width: parseInt(viewPort.split('x')[0], 10),
                height: parseInt(viewPort.split('x')[1], 10),
            });
        } catch {
            reject('Bad Viewport option.');
        }

        try {
            if (options.url)
                await page.goto(options.url, {
                    WaitUntil: 'doncontentloaded',
                    timeout: options.timeout || 5000
                });
            else
                await page.setContent(html, {
                    waitUntil: 'domcontentloaded',
                    timeout: options.timeout || 5000
                });
        } catch (err) {
            reject(err);
        }

        if (options.screenMedia)
            await page.emulateMediaType('screen');

        const pdf = (options.optimizePerformance) ?
            await page.createPDFStream(options) :
            await page.pdf(options);

        await browser.close();

        resolve(options.fileType === 'buffer' ? pdf : pdf.toString('base64'));
    });
}

/**
 * Verifies options passed to the convert function
 * @param {*} options 
 */
function checkOptions(options) {
    const fullOptions = {
        fileType: 'base64',
        url: '',
        viewPort: '1920x1080',
        timeout: 5000,
        landscape: false,
        format: '',
        displayHeaderFooter: true,
        headerTemplate: '',
        footerTemplate: '',
        width: '1920',
        height: '1080',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        omitBackground: false,
        pageRanges: '',
        path: '',
        preferCSSPageSize: false,
        printBackground: true,
        scale: 1,
        screenMedia: false,
        optimizePerformance: false,
    }


}