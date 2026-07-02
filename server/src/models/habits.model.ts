import mongoose, { Schema } from "mongoose";

interface Ihabits extends Document {
  userId: mongoose.Types.ObjectId;

  habit: string;
  why: string;
  commitment: string;
  repeat: string;
  commited: string;
  checkIn: boolean;
  createdAt: Date;
  updatedAt: Date;
  repeatInDuration: string;
}

const habitsScheme = new Schema<Ihabits>(
  {
    habit: {
      type: String,
      required: true,
      trim: false,
      unique: true,
    },

    why: {
      type: String,
      required: true,
      trim: false,
      lowercase: true,
    },

    repeatInDuration: {
      type: String,
      required: true,
    },

    repeat: {
      type: String,
      required: true,
    },

    userId:{
        type: Schema.Types.ObjectId
    }

    
  },
  {
    timestamps: true,
  },
);

export const Habit = mongoose.model<Ihabits>("Habit", habitsScheme);
