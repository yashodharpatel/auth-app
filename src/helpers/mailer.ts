import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { EmailTypes } from "@/enums/emailTypes";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // generate the hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === EmailTypes.VERIFY) {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 43200000,
      });
    } else if (emailType === EmailTypes.RESET) {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 43200000,
      });
    }

    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.MAILSERVICE_USER,
    //     pass: process.env.MAILSERVICE_PASS,
    //   },
    // });

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILSERVICE_USER,
        pass: process.env.MAILSERVICE_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: email,
      subject:
        emailType === EmailTypes.VERIFY
          ? "Verify your Email"
          : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === EmailTypes.VERIFY
          ? "verify your email"
          : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
            </p>`,
    };

    return await transporter.sendMail(mailOptions);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
