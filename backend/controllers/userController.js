const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler');
const User = require("../models/user");

function generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
}

exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body || {};

    // Check if user details were sent in body:
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all the User Details");
    }
    
    // Check if user with the email already exists:
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash Password:
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User:
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            token: generateToken(user._id),
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
})

exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body || {};

    // Check the user email:
    const user = await User.findOne({ email });

    // Compare the password:
    if (!user && !(await bcrypt.compare(password, user.password))) {
        res.status(401);
        throw new Error("Invalid Credentials");
    }

    res.json({
        token: generateToken(user._id),
        data: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
})

// @access      - Private
// @middlware   - requireAuth
exports.getProfile = asyncHandler(async (req, res) => {
    // const { _id, name, email } = req.user;
    const { id, name, email } = req.user;           // mongoose also provides  -->  id (virtual getter - a string vers.)

    res.json({
        message: "Get your User Profile",
        user: {
            id,
            name,
            email
        }
    });
})
