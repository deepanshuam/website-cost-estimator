// controllers/costController.js
import PDFGenerator from '../utils/pdf.js';
import sendMail from '../utils/email.js';
import Cost from '../model/cost.Model.js';

export const calculateCost = async (req, res) => {
  try {
    const { name, email, pages, features } = req.body;
    console.log(name, email, pages, features);

    // Calculate total cost
    const totalCost = pages * 100 + features.length * 50;

    // Save to Database
    const newCost = new Cost({ name, email, pages, features, totalCost });
    await newCost.save();

    // Generate PDF
    const pdfPath = await PDFGenerator(name, pages, features, totalCost);

    // Send Email
    await sendMail(email, pdfPath);

    res.status(200).json({ message: 'Cost calculated and email sent!', totalCost });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};
