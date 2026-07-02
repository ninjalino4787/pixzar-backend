import { Request, Response } from "express";
import { CheckIn } from "../models/checkIn.models";
import { User } from "../models/user.models";
import { Habit } from "../models/habits.model";
import mongoose from "mongoose"; // 1. Added for ID validation

const checkInHabit = async (req: any, res: Response) => {
  try {
    const habitId = req.params.habitId as string
    const {checker } = req.body;

    // Validate input presence
    if (!habitId || !checker) {
      return res.status(400).json({
        message: "Pls fill in all fields",
      });
    }

    //  Validate habitId format to prevent Mongoose cast crashes
    if (!mongoose.Types.ObjectId.isValid(habitId)) {
      return res.status(400).json({
        message: "Invalid habit ID format",
      });
    }

    // Fetch user and habit in parallel (Performance optimization)
    const habit = await Habit.findById(habitId)


    // Check if habit exists
    if (!habit) {

      return res.status(404).json({
        message: "Habit not found",
      });
    }

   
    
   const checkedIn = await CheckIn.create({
  habitId: habitId,
  userId: req.user._id,
  checker: checker,
});

    return res.status(201).json({
      message: "Habit check-in successful",
      check: checkedIn,
      habitId: habitId,
      habit: habit
    });

  } catch (error) {
    console.error("Check-in error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : error
    });
  }
};


const getCheckIns = async (req: any, res: Response) => {
  try {
    const habitId = req.params.habitId as string
    const checkIns = await CheckIn.find({ 
      habitId: habitId,
      userId: req.user._id 
    })
    return res.status(200).json(checkIns)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}



export { checkInHabit, getCheckIns };
