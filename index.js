/*
Simple asynchronous library to convert html or URL to PDF stream by leveraging puppeteer.

© 2022 Daniel Rauhut
*/
import puppeteer from 'puppeteer';

const options = {
    fileType: 'base64', // 'base64' | 'buffer' | 'stream'
    url: '', //if specified ignores html
    viewPort: '1920x1080', //string (width)x(height)
    timeout: 5000, //timeout for page loading in ms
    landscape: false,
    format: '', //letter | legal | tabloid | ledger | a0 | a1 | a2 | a3 | a4 | a5 | a6
    displayHeaderFooter: true,
    headerTemplate: '',
    footerTemplate: '',
    width: 0, //num in pixels or with units
    height: 0, //num in pixels or with units
    marginTop: 0, //num in pixels or with units
    marginBottom: 0, //num in pixels or with units
    marginLeft: 0, //num in pixels or with units
    marginRight: 0, //num in pixels or with units
    omitBackground: false, //hide html background, allows for transparency
    pageRanges: '', //'1-12' | '3-5'
    path: '', //file save path
    preferCSSPageSize: false, //css-declared page size takes precedent over format, width and height
    printBackground: false, //print background graphics
    scale: 1, //render scale, must be between 0.1 and 2
    screenMedia: false //use 'screen' instead of 'print' CSS media
}

export default async function convert(html, options) {
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

        //

        const buffer = await page.pdf(pdfOptions);

        await browser.close();

        resolve(options.fileType === 'buffer' ? buffer : buffer.toString('base64'));
    });
}