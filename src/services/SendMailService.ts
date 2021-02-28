import path from 'path';
import fs from 'fs';

import handlebars from 'handlebars';
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
    const templatePath = path.resolve(
      __dirname,
      '..',
      'views',
      'email',
      'npsMail.hbs'
    );

    const templateContent = fs.readFileSync(templatePath).toString('utf-8');

    const mailTemplate = handlebars.compile(templateContent);

    const html = mailTemplate({
      name: to,
      title: subject,
      description: body
    });

    const client = await createAccount();

    const message = await client.sendMail({
      to,
      subject,
      html,
      from: 'NPS <noreply@nps.com>'
    });

    console.log(`Message sent: ${message.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
  }
};
