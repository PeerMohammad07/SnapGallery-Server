import mongoose, { Schema } from "mongoose"
import IUser from "../../Interfaces/IUser"

const user = new Schema({
    name : {
      type : String,
      required : true
    },
    email : {
      type : String,
      required : true,
      unique : true
    },
    phone : {
      type : Number,
      required : true
    },
    password : {
      type : String,
      required : true
    }
})

const userSchema = mongoose.model<IUser>("users",user)
export default userSchema