import PDFParser from "pdf2json";
import fs from "fs";

export async function run () {
    return new Promise((resolve) => {
        const pdfParser = new PDFParser(this, 1);

        pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
        pdfParser.on("pdfParser_dataReady", pdfData => {
            console.log(pdfParser.getRawTextContent());
            resolve(JSON.stringify(pdfData));
        });

        pdfParser.loadPDF("./data.pdf");
    });
}

run();