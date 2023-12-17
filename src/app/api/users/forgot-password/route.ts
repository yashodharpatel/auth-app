import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import { EmailTypes } from "@/enums/emailTypes";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    // check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 400 },
      );
    }

    // send  email
    try {
      await sendEmail({ email, emailType: EmailTypes.RESET, userId: user._id });
      return NextResponse.json({
        message: "Mail sent successfully",
        success: true,
      });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
