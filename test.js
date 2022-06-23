const { html2pdf, base64ToPdf } = require('./index.js');
const html = require('./html.js');

async function test() {
    const b64 = await html2pdf(html.html, { avoidTableRowBreak: true, marginTop: 10, path: './path.pdf' }); //path must exist
    base64ToPdf(b64, './test.pdf');
}

test();

/*
TODO: disableJavascript option
TODO: breakImages option
*/