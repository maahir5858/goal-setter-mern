const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

exports.requireAuth = asyncHandler(async (req, res, next) => {
    // Authorization header:
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer')) {
        res.status(401);
        throw new Error("Unauthorized 1");
    }
    
    // Extracting Bearer Token from Authorization header:
    const token = authHeader.split(" ")[1];

    // Verifying the Signature:
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extracting the User via Token Payload:
    const user = await User.findById(decoded.userId).select('-password');           // .find().select('-password')
    if (!user) {
        res.status(401);
        throw new Error("Unauthorized 2");
    }
    req.user = user;

    next();
});