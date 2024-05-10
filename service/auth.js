import User from "../model/user.js";
import { responses } from "../constants/auth.js";
import { hashedpassword , comparePassword, sendOTP } from "../utils/auth.js";

export const Signup = async (userdata) => {
  const { email, password , name , date , phonenumber , verified  } = userdata;
  console.log(email);
  try {
    const EmailExist = await User.findOne({ email });
    if (EmailExist) {
      return responses.USER_RESPONSE.EMAIL;
    }
    const Hashedpass = await hashedpassword(password);
    const user = await User.create({ email, password: Hashedpass });
    
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export const Login = async (userdata) => {
    const { email, password } = userdata;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return responses.USER_RESPONSE.USER_NOT_FOUND;
      }
      const compare = await comparePassword(password, user.password);
      if (!compare) {
        return responses.USER_RESPONSE.PASSWORD_FAIL;
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };
  
