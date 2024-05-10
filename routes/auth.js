import express from "express";
import { LoginUser, SignUpUser } from "../controller/auth.js";


const router = express.Router();

router.post("/signin" , LoginUser )
router.post("/signup" ,  SignUpUser)


export default  router