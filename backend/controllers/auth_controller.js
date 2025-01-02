import { StatusCodes } from "http-status-codes";
import process from "process";
import CustomError from "../error/index.js";
import redisClient from "../db/redis.js";
import User from "../models/user.js";
import { generateToken, signUser, sanitizedUser } from "../utils/index.js";

const AuthController = {
    login: async (req, res) => {
        const { phone, email, password } = req.body;

        if ((!phone && !email) || !password) {
            throw new CustomError.BadRequest(
                "Please provide phone or email and password"
            );
        }

        // check if user provided phone or email
        let user;
        if (phone) {
            user = await User.findOne({
                where: { phone },
                attributes: { exclude: ["createdAt", "updatedAt"] },
            });
        } else {
            user = await User.findOne({
                where: { email },
                attributes: { exclude: ["createdAt", "updatedAt"] },
            });
        }

        if (!user) {
            throw new CustomError.UnauthorizedRequest("Invalid credentials");
        }

        // check if password is correct
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            throw new CustomError.UnauthorizedRequest("Invalid credentials");
        }

        // sanitize user
        const sanitizeUser = sanitizedUser(user.toJSON());

        // generate token
        const token = await generateToken();

        // login for month
        await redisClient.set(
            token,
            JSON.stringify(sanitizeUser),
            process.env.REDIS_EX
        );

        // signed user info
        const userInfo = signUser(sanitizeUser);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(StatusCodes.OK).json({
            message: "Login successful",
            token: token,
            user: userInfo,
        });
    },

    register: async (req, res) => {
        // Your register logic here
        res.status(StatusCodes.CREATED).json({
            message: "Register successful",
        });
    },

    forgotPassword: async (req, res) => {
        // Your forgot password logic here
        res.status(StatusCodes.OK).json({
            message: "Forgot password successful",
        });
    },

    resetPassword: async (req, res) => {
        // Your reset password logic here
        res.status(StatusCodes.OK).json({
            message: "Reset password successful",
        });
    },

    updatePassword: async (req, res) => {
        // Your update password logic here
        res.status(StatusCodes.OK).json({
            message: "Update password successful",
        });
    },

    updateProfile: async (req, res) => {
        // Your update profile logic here
        res.status(StatusCodes.OK).json({
            message: "Update profile successful",
        });
    },

    getProfile: async (req, res) => {
        // Your get profile logic here
        res.status(StatusCodes.OK).json({ message: "Get profile successful" });
    },

    logout: async (req, res) => {
        // Your logout logic here
        res.status(StatusCodes.OK).json({ message: "Logout successful" });
    },

    verifyEmail: async (req, res) => {
        // Your verify email logic here
        res.status(StatusCodes.OK).json({ message: "Verify email successful" });
    },

    resendVerificationEmail: async (req, res) => {
        // Your resend verification email logic here
        res.status(StatusCodes.OK).json({
            message: "Resend verification email successful",
        });
    },
};

export default AuthController;
