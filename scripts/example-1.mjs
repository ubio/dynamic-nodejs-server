import PDFParser from "pdf2json";
import fs from "fs";

export async function run () {
    return new Promise((resolve) => {
        const pdfParser = new PDFParser();

        pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
        pdfParser.on("pdfParser_dataReady", pdfData => {
            resolve(JSON.stringify(pdfData));
        });

        pdfParser.loadPDF("./example.pdf");
    });
}