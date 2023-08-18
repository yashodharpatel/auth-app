import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        console.log(reqBody);

        // validate the email
        const validateEmail = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
        if(!validateEmail.test(email)) {
            return NextResponse.json(
                {message: "Please enter a valid email"},
                {status: 400}
            )
        }

        // check if the user already exists
        const user = await User.findOne({email});
        if(user) {
            return NextResponse.json(
                {message: "User already exists"},
                {status: 400}
            )
        }

        // hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });

        console.log(savedUser);
    } catch (error: any) {
        return NextResponse.json(
            {message: error.message},
            {status: 500}
        )
    }
}

