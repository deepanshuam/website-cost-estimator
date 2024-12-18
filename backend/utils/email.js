import { createTransport } from 'nodemailer';
import { unlinkSync } from 'fs';
import { join } from 'path';

const sendMail = (email, pdfPath) => {
  return new Promise((resolve, reject) => {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: 'indianbadass52@gmail.com', // Use environment variables for security
        pass: 'sdoyjwboqdurweeu', // Use environment variables for security
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
      secure: false, // Disable secure connection (development only)
    });

    const mailOptions = {
      from: 'indianbadass52@gmail.com',
      to: email,
      subject: 'Website Project Cost Details',
      text: `Dear ${email},

Thank you for reaching out regarding your website project. Attached, you will find a detailed breakdown of the estimated cost and time required for your project.

Please review the details and let us know if you have any questions or additional requirements.

Best regards,
Your Development Team`,
      attachments: [{ filename: 'cost_details.pdf', path: join(pdfPath) }],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) reject(error);
      else {
        unlinkSync(pdfPath); // Remove the PDF after sending the email
        resolve(info);
      }
    });
  });
};

export default sendMail;
