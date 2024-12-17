import PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';

const generatePDF = (name, pages, features, totalCost) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const pdfPath = `./cost_details_${Date.now()}.pdf`;

    doc.pipe(createWriteStream(pdfPath));

    doc.fontSize(20).text('Website Cost Details', { align: 'center' });
    doc.fontSize(14).text(`Client Name: ${name}`);
    doc.text(`Pages: ${pages}`);
    doc.text(`Features: ${features.join(', ')}`);
    doc.text(`Total Cost: $${totalCost}`);

    doc.end();

    resolve(pdfPath);
  });
};

export default generatePDF;
