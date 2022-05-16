import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendAccountActivationLink = async (toEmail: string, activation_link: string) => {
  const htmlLetter = (
    `
      <div>
        <h1>Follow the link below to activate your account</h1>
        <b><a href='${activation_link}'>Click to activate</a></b>
      </div>
    `
  );

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.SMTP_HOST,
      to: toEmail,
      subject: `Account activation on ${process.env.CLIENT_URL}`,
      text: '',
      html: htmlLetter
    }, (err, info) => {
      if (err) throw new Error(err.message);

      if (info) return { message: `We sent a confirmation to ${toEmail}, please check your inbox`, result: info };
    });
  } catch (e) {
    return { message: 'email is not sent', result: false, error: e };
  }
};

export default {
  sendAccountActivationLink
}