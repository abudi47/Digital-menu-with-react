import { StatusCodes } from "http-status-codes";
import process from "process";
import CustomError from "../error/index.js";
import redisClient from "../db/redis.js";
import User from "../models/user.js";
import {
    generateToken,
    signUser,
    sanitizedUser,
} from "../utils/index.js";
import { allowedRoles } from "../config/config.js";

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
            success: true,
            message: "Login successful",
            data: {
                token: token,
                user: userInfo,
            },
        });
    },

    register: async (req, res) => {
        // Your register logic here
        const {
            firstName,
            lastName,
            role,
            phone,
            email,
            password,
            profile_image,
        } = req.body;

        if (
            !firstName ||
            !lastName ||
            !role ||
            (!phone && !email) ||
            !password
        ) {
            throw new CustomError.BadRequest(
                "Please provide all required information"
            );
        }

        if (!allowedRoles.includes(role)) {
            throw new CustomError.BadRequest("Unsupported role type");
        }

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

        if (user) {
            throw new CustomError.BadRequest("User already exists");
        }

        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: password,
            role: role,
            imageUrl: req.file ? req.file?.filename : null,
        });

        await newUser.save();

        const sanitizeUser = sanitizedUser(newUser.toJSON());

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Register successful",
            data: {
                user: sanitizeUser,
            },
        });
    },

    forgotPassword: async (req, res) => {
        // Your forgot password logic here
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Forgot password successful",
        });
    },

    resetPassword: async (req, res) => {
        // Your reset password logic here
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Reset password successful",
        });
    },

    updatePassword: async (req, res) => {
        // Your update password logic here
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Update password successful",
        });
    },

    logout: async (req, res) => {
        const authorization = req.headers?.authorization || req.cookies?.token;
        await redisClient.del(authorization);
        res.clearCookie("token");

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Logout successful",
        });
    },

    verifyEmail: async (req, res) => {
        // Your verify email logic here
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Verify email successful",
        });
    },

    resendVerificationEmail: async (req, res) => {
        // Your resend verification email logic here
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Resend verification email successful",
        });
    },
};

export default AuthController;
