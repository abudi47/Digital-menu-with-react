/**
 * Generates a random token
 */ 
import crypto from 'crypto';
export default generateToken = async () => {
    return new Promise((resolve, reject) => {
        try {
            const token = crypto.randomBytes(32).toString('hex');
            resolve(token);
        } catch (error) {
            reject(error);
        }
    });
};
