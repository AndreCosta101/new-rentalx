import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";
import handlebars, { template } from "handlebars";
import fs from "fs";

import { IMailProvider } from "../IMailProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    // nodemailer
    //     .createTestAccount()
    //     .then((account) => {
            const transporter = nodemailer.createTransport({
              host: "smtp.mailtrap.io",
              port: 2525,
              auth: {
                user: "e80806abd4e1af",
                pass: "9a358539f385b5"
              }
            
            });

            this.client = transporter;
      // })
      // .catch((err) => console.error(err));
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");
    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreplay@rentx.com.br>",
      subject,
      html: templateHTML,
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };