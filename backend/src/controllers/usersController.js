import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const createUser = async (req, res) => {
    try {
        const username = req.body.username.trim();
        const email = req.body.email.trim().toLowerCase();
        const password = req.body.password;

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hash
        });

        const savedUser = await newUser.save();

        const token = jwt.sign(
            {
                email: savedUser.email,
                id: savedUser._id
            },
            process.env.JWT_KEY,
            {
                expiresIn: "7d"
            }
        );

        res.status(201)
            .cookie("token", token)
            .json(savedUser);

    } catch (error) {
        console.error("Error in createUser controller", error.message);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Username or email already exists"
            });
        }

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.trim().toLowerCase();

        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({message: "User not found"});
        }

        else {
            bcrypt.compare(password, user.password, (err, result) => {

                if(result) {
                    let token = jwt.sign({
                    email: user.email,
                    id: user._id
                }, process.env.JWT_KEY,
                {
                    expiresIn: "7d",
                }
            );

                return res.status(200).cookie('token', token).json(user);
                }

                else {
                    return res.status(401).json({message: "Incorrect username or password"});
                }
                
            })
        }


    } catch (error) {
        console.error('Error in loginUser controller', error.message)
        res.status(500).json({message: "Internal server error"});
    }    
}

export const logoutUser = (req, res) => {
    return res.clearCookie('token').status(200).json({message: 'Logout successful'});
}


export const getCurrentUser = (req, res) => {
    return res.status(200).json(req.user);
}