import ratelimit from "../config/upstash.js";


const rateLimiter = async (req, res, next) => {
    // per user 
try {
    const {success} = await ratelimit.limit(req.user._id.toString());

    if(!success) {
        return res.status(429).json({
            message: 'Too many requests, Please try again later'
        });
    }

    next();
} catch (error) {
    console.error("rate limiter error", error);
    next(error);
}
}


export default rateLimiter;