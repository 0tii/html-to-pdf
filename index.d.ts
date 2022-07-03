declare module 'better-html-pdf';

/**
 * Convert a html string or website to a pdf file
 * @param {*} html html string
 * @param {*} options options object, defaults are respected
 * @returns PDF file content as ``[base64 | buffer]``
 */
export declare function html2pdf(html: string, options: PdfOptions): Promise<string> | Promise<Buffer>;

/**
 * Write a base64 encoded pdf to a pdf file. Path must exist.
 * @param {*} fileContent pdf file content as b64 string
 * @param {*} file path to write the file to, absolute or relative
 */
export declare function base64ToPdf(fileContent: string, file: string): void;

/**
 * Write a buffer to a pdf file. Path must exist.
 * @param {*} fileContent pdf file content as buffer
 * @param {*} file path to write the file to, absolute or relative
 */
export declare function bufferToPdf(fileContent: Buffer, file: string): void;

/**
 * All options that can be passed to the converter
 */
export declare interface PdfOptions {
    fileType?: FileType,
    url?: string,
    viewPort?: string,
    timeout?: number,
    landscape?: boolean,
    format?: PageFormat,
    repeatTableHeader?: boolean,
    repeatTableFooter?: boolean,
    displayHeaderFooter?: boolean,
    headerTemplate?: string,
    footerTemplate?: string,
    width?: number | string,
    height?: number | string,
    marginTop?: number | string,
    marginBottom?: number | string,
    marginLeft?: number | string,
    marginRight?: number | string,
    breakImages?: boolean,
    avoidTableRowBreak?: boolean,
    avoidDivbreak?: boolean,
    omitBackground?: boolean,
    pageRanges?: string,
    path?: string,
    disableJavascript?: boolean,
    preferCSSPageSize?: boolean,
    printBackground?: boolean,
    trueColors?: boolean,
    scale?: number,
    screenMedia?: boolean
}

export declare enum PageFormat{
    letter = 'letter',
    legal = 'legal',
    tabloid = 'tabloid',
    a0 = 'a0',
    a1 = 'a1',
    a2 = 'a2',
    a3= 'a3',
    a4 = 'a4'
}

export type FileType = 'buffer' | 'base64';