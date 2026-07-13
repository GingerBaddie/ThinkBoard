import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export default async (req, res, next) => {
    if(!req.cookies.token) {
        return res.status(401).json({message: 'You need to login first'});
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let foundUser = await User
        .findById(decoded.id)
        .select('-password')
            

        if(!foundUser) {
             return res.status(401).json({
                message: "User not found",
            });         
        }

        req.user = foundUser;

        next();
    } catch (error) {
        console.error('Error in isLoggedIn middleware', error.message)
        res.status(401).json({message: "Invalid or expired Token"});
    }
} 