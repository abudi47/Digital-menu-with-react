/**
 * Middleware to control access to images based on user role and ownership.
 *
 */
import { StatusCodes } from "http-status-codes";

export default async function imageAccessControl (req, res, next){
    const { user } = req; 
    const requestedFile = req.params.filename;

    // Example logic: Only the user or an admin can access profile pictures
    if (user.role === 'admin' || user.imageUrl === requestedFile) {
        return next();
    }
    return res
            .status(StatusCodes.FORBIDDEN)
            .json({ success: false, error: "Unauthorized" });
};
