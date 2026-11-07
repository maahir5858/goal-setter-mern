const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/userController');
const { requireAuth } = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", requireAuth, getProfile);

module.exports = userRouter;