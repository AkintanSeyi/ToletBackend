import {Signup , Login} from "../service/auth.js";
import {token , sendOTP } from "../utils/auth.js";
import { responses } from "../constants/auth.js";


export const SignUpUser = async (req, res) => {
 
    try {
     
      const user = await Signup(req.body);
      const otpdata = await sendOTP(req.body);
   
      if (user === responses.USER_RESPONSE.EMAIL || otpdata === responses.USER_RESPONSE.FAILED_OTP) {
        const response = responses.genericResponse(
          400,
          false,
          null,
          responses.USER_RESPONSE.EMAIL
        );
        return res.status(response.status.code).json(response);
      }
      user.password=undefined
    
    
      const response = responses.genericResponse(
        200,
        true,
        user,
        null,
        responses.USER_RESPONSE.SUCCESS
      );
      res.status(response.status.code).json(response);
    } catch (error) {
      const response = responses.genericResponse(500, false, null, error.message);
      res.status(response.status.code).json(response);
    }
  };

  
  
  export const LoginUser = async (req, res) => {
    try {
      const user = await Login(req.body);
      console.log(user);
      if (user === responses.USER_RESPONSE.USER_NOT_FOUND) {
        const response = responses.genericResponse(
          400,
          false,
          null,
          responses.USER_RESPONSE.USER_NOT_FOUND
        );
        return res.status(response.status.code).json(response);
      }
      if (user === responses.USER_RESPONSE.PASSWORD_FAIL) {
        const response = responses.genericResponse(
          400,
          false,
          null,
          responses.USER_RESPONSE.PASSWORD_FAIL
        );
        return res.status(response.status.code).json(response);
      }
      const Jwt = token(user._id, user.email);
      user.password = undefined;
      const response = responses.genericResponse(
        200,
        true,
        { user, Jwt },
        null,
        responses.USER_RESPONSE.SUCCESS_LOGIN
      );
      res.status(response.status.code).json(response);
    } catch (error) {
      const response = responses.genericResponse(500, false, null, error.message);
      res.status(response.status.code).json(response);
    }
  };
  
  