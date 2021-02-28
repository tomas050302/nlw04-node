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
  async execute(
    to: string,
    variables: {
      user_id: string;
      name: string;
      title: string;
      description: string;
      url: string;
    },
    path: string
  ) {
    const templateContent = fs.readFileSync(path).toString('utf-8');

    const mailTemplate = handlebars.compile(templateContent);

    const html = mailTemplate(variables);

    const client = await createAccount();

    const message = await client.sendMail({
      to,
      subject: variables.title,
      html,
      from: 'NPS <noreply@nps.com>'
    });

    console.log(`Message sent: ${message.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
  }
};
