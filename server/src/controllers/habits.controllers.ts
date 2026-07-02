import { Request, Response } from "express";
import { Habit } from "../models/habits.model";

const addhabits = async (req: any, res: Response) => {
  try {
    const { habit, why, repeat, repeatInDuration } = req.body;

    if (!habit || !why || !repeat || !repeatInDuration) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const newHabit = await Habit.create({
      userId: req.user._id,
      habit,
      why,
      repeat,
      repeatInDuration,
    });

    return res.status(201).json({
      message: "Habit added successfully",
      data: newHabit,
    });
  } catch (error) {
    console.error("internal server error: ", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const getAllHabits = async (req: any, res: Response) => {
  try {
    const habits = await Habit.find({ userId: req.user._id });
    return res.status(200).json(habits);
  } catch (error) {
    console.error("internal server error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deletehabit = async (req: any, res: Response) => {
  try {
    const habitId = req.params.habitId as string;

    const habit = await Habit.findById(habitId);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    if (habit.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Habit.findByIdAndDelete(habitId);

    return res.status(200).json({ message: "Habit deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAllHabits = async (req: any, res: Response) => {
  try {
    await Habit.deleteMany({ userId: req.user._id });
    return res.status(200).json({ message: "All habits deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { addhabits, deletehabit, getAllHabits, deleteAllHabits };