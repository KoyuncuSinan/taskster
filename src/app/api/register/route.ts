import { NextResponse, NextRequest } from "next/server";
import cloudinary from "../lib/cloudinaryConfig";
import multer from "multer";
import bcrypt from "bcrypt";
import pool from "@/db/connectDb";


interface ExtendedNextRequest extends NextRequest{
    file?:any;
}

interface SignupForm {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req,file, cb){
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
    },
});

const upload = multer({storage: storage})


export default async function signupHandler(req: ExtendedNextRequest){
    if(req.method !== "POST"){
        return NextResponse.json({error: "Method not allowed"}, {status: 405})
    }
    const body = req.body as SignupForm;
    const {username, email,password, passwordConfirmation} = body;
    const {profilePicture} = req.file;

    const isUsernameExist = await pool.query("SELECT username FROM users WHERE username = $1",[username]);
    if(isUsernameExist){
        return NextResponse.json({error: "Username already exist"}, {status: 400});
    };

    const isEmailExist = await pool.query("SELECT email FROM users WHERE email = $1",[email]);
    if(isEmailExist){
        return NextResponse.json({error: "Email already exist"}, {status: 400});
    };

    if(password !== passwordConfirmation){
        return NextResponse.json({error: "Passwords does not match"}, {status: 400});
    };


}







export const config = {
    api: {
        bodyParser:false,
    }
} 