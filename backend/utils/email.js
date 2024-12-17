import { createTransport } from 'nodemailer';
import { unlinkSync } from 'fs';

const sendMail = (email, pdfPath) => {
  return new Promise((resolve, reject) => {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: 'indianbadass52@gmail.com',
        pass: 'sdoyjwboqdurweeu',
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
      secure: false, // Disable secure connection (development only)
    });
    
    const mailOptions = {
      from: 'indianbadass52@gmail.com',
      to: email,
      subject: 'Website Cost Details',
      text: 'Please find attached the cost details.',
      attachments: [{ filename: 'cost_details.pdf', path: pdfPath }],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) reject(error);
      else {
        unlinkSync(pdfPath); // Remove PDF after sending
        resolve(info);
      }
    });
  });
};

export default sendMail;
