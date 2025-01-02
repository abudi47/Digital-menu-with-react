import jwt from "jsonwebtoken";

export default function signUser(user) {
    return jwt.sign(
        {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );
}
