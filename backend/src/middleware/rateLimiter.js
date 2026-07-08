import ratelimit from "../config/upstash.js";


const rateLimiter = async (req, res, next) => {
    // per user 
try {
    const {success} = await ratelimit.limit('my-limit-key')

    if(!success) {
        return res.status(429).json({
            message: 'Too many requests, Please try again later'
        });
    }

    next();
} catch (error) {
    console.log("rate limiter error", error.message);
    next(error);
}
}


export default rateLimiter;