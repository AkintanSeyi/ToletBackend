import bcrypt from  "bcryptjs";
import jwt from  "jsonwebtoken";
import nodemailer from "nodemailer"
import { responses } from "../constants/auth.js";
let savedOTPS = {

};


var transporter = nodemailer.createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'akintanseyi5@gmail.com',
            pass: 'gaufkiqeairyokpt'
        }
    }
);

export const hashedpassword= async(password) =>{
    const newPassword = await bcrypt.hash(password,10)
    return newPassword
}

export const comparePassword = async (password, passwordToCompareWith) => {
    const checkedpass = await bcrypt.compare(password, passwordToCompareWith);
    return checkedpass;
};

export const token = (user) => {
    return jwt.sign(user.toJSON(), process.env.JWT_SECRET ,);
};

export const sendOTP = async (userdata) => {

    let email = userdata.email
    let digits = '0123456789';
    let limit = 4;
    let otp = ''
    let i;
    for (i = 0; i < limit; i++) {
        otp += digits[Math.floor(Math.random() * 10)];

    }
    console.log(email);
    var options = {
      from: 'akintanseyi5@gmail.com',
      to: `${email}`,
      subject: "Welcome to ToletLagos",
      html: `<p>
      Tolet Lagos 
     
      You can now rent houses across Nigeria with Ease  
       
       Choose your desired property and pay small small with ToletLagos
   
Your otp is: ${otp} to verify your email address
     </p>`

  };
  transporter.sendMail(
    options, function (error, info) {
        if (error) {
            console.log(error);
          return   responses.USER_RESPONSE.FAILED_OTP
        }
        else {
            savedOTPS[email] = otp;
            console.log(otp);
            setTimeout(
                () => {
                    delete savedOTPS.email
                }, 60000
            )
            const otpdatares  = responses.USER_RESPONSE.SUCCESS_OTP
            return otpdatares
        }

    }
)
}