import { StatusCodes } from "http-status-codes";
import CustomError from "../error/index.js";
import User from "../models/user.js";
import { sanitizedUser, isUuidv4 } from "../utils/index.js";

const UserController = {
  getProfile: async (req, res) => {
    const user = req.user;
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Get profile successful",
      data: { user },
    });
  },

  updateProfile: async (req, res) => {
    // Your update profile logic here
    const { id } = req.user;
    const { firstName, lastName, phone } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("Something went wrong try again later");
    }

    // Update only the fields provided in the request body
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (imageUrl !== undefined) user.imageUrl = imageUrl;

    await user.save();

    const sanitizeUser = sanitizedUser(user.toJSON());

    console.log("===================: ", sanitizeUser);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Update profile successful",
      data: {
        user: sanitizeUser,
      },
    });
  },
};

export default UserController;
