import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

// providing an interface for the user doc
export interface Iuser extends Document {
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<Iuser>({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    min: 3,
    maxlength: 20,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },

  password: {
    type: String,
    required: true,
    minlength: 3,
  },
},{
    timestamps:true
});

// presave hash hook

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,10);
})

// compare plain text password with hashed password
userSchema.methods.comparePassword = async function(password:string){
    return await bcrypt.compare(password,this.password)
}

export const User = mongoose.model<Iuser>("User", userSchema)
