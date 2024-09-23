import mongoose, { Schema } from "mongoose";
import IImage from "../../Interfaces/IImage";

const image = new Schema({
  title : {
    type:String,
    required : true
  },
  image : {
    type : String,
    required : true
  },
  userId : {
    type : String,
    required : true
  },
  order : {
    type : Number,
    required : true
  }
})

const imageSchema = mongoose.model<IImage>("images",image)

export default imageSchema