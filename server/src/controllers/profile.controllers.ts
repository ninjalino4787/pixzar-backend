import { Response } from "express";

const getProfile = async (req: any, res: Response) => {
  try {
    return res.status(200).json({
      username: req.user.username,
      email: req.user.email,
      createdAt: req.user.createdAt
    })
  } catch (error) {
    console.error("internal server error", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export { getProfile }