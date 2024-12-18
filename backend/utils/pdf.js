import PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';
import { join } from 'path';

const generatePDF = (
  name,
  type,
  pages,
  domain,
  hosting,
  officialEmail,
  specialRequirements,
  features,
  totalCost,
  estimatedTime
) => {
  return new Promise((resolve, reject) => {
    const pdfPath = join(`./output/cost_details_${Date.now()}.pdf`);
    const doc = new PDFDocument();

    doc.pipe(createWriteStream(pdfPath));

    // Title
    doc.fontSize(22).text('Website Project Cost Details', { align: 'center' });
    doc.moveDown();

    // Client Information
    doc.fontSize(14).text(`Client Name: ${name}`);
    doc.text(`Project Type: ${type}`);
    doc.text(`Number of Pages: ${pages}`);
    doc.text(`Domain Options: ${domain.length ? domain.join(', ') : 'None'}`);
    doc.text(`Hosting Options: ${hosting.length ? hosting.join(', ') : 'None'}`);
    doc.text(`Official Email: ${officialEmail ? 'Provided' : 'Not Provided'}`);
    doc.moveDown();

    // Project Details
    doc.text(
      `Special Requirements: ${
        specialRequirements.length ? specialRequirements.join(', ') : 'None'
      }`
    );
    doc.text(`Additional Features: ${features.length ? features.join(', ') : 'None'}`);
    doc.moveDown();

    // Summary
    doc.fontSize(16).text(`Total Cost: $${totalCost}`, { align: 'right' });
    doc.text(`Estimated Time: ${estimatedTime} days`, { align: 'right' });
    doc.end();

    resolve(pdfPath);
  });
};

export default generatePDF;
