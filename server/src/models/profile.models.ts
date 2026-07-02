import mongoose, {  Schema } from "mongoose";

export interface Iprofile extends Document {
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const profileSchema = new Schema<Iprofile>({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    min: 3,
    maxlength: 20,
  },

  email:{
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  }
}, 
{timestamps:true});

export const Profile = mongoose.model<Iprofile>("Profile",profileSchema)
