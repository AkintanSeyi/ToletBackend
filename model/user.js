import mongoose from "mongoose";


const UserSchema  = new mongoose.Schema ({

name : {type : String  },
email : {type : String  , required : true},
password : {type : String , required : true },
date : {type : String  },
phonenumber : {type : Number },
verified : {type : Boolean}


})

const User = mongoose.model("User", UserSchema);

export default User;