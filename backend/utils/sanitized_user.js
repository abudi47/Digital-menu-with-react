/**
 * @module backend/utils/sanitized_user
 * @file sanitized_user.js
 * @description Sanitize user object
 * 
 */
export default function sanitizedUser(user) {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
    };
}
