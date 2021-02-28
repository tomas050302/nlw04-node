import nodemailer, { Transporter } from 'nodemailer';

async function createAccount(): Promise<Transporter> {
  const account = await nodemailer.createTestAccount();

  return nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass
    }
  });
}

export default {
  async execute(to: string, subject: string, body: string) {
    const client = await createAccount();

    const message = await client.sendMail({
      to,
      subject,
      html: body,
      from: 'NPS <noreply@nps.com>'
    });

    console.log(`Message sent: ${message.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
  }
};
