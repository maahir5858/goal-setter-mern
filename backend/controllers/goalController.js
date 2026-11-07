const asyncHandler = require('express-async-handler');
// utility package used to handle errors in asynchronous Express.js route handlers without having to write repetitive try...catch
const Goal = require("../models/goal");
const User = require("../models/user");

exports.getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });          // user specific goals
    res.json(goals);
})

exports.addGoal = asyncHandler(async (req, res) => {
    if (!req.body.goal) {
        res.status(400);
        throw new Error("Try again with your Goal added next time");
    }

    const response = await Goal.create({
        goal: req.body.goal,
        user: req.user.id
    });
    res.json(response);
})

exports.updateGoal = asyncHandler(async (req, res) => {
    const goalId = req.params.id;
    
    // Check goal:
    const goal = await Goal.findById(goalId);
    if (!goal) {
        res.status(404);
        throw new Error("Goal Not Found");
    }
    
    // Check user's Ownership:
    if (goal.user.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Not authorized to update || Access Forbiden");
    }

    // const response = await Goal.findByIdAndUpdate( req.params.id, req.body, {
    //     new: true,                // return the updated document instead of old.
    //     runValidators: true,      // check whether the updation follows the validation rules defined in our schema 
    // });
    goal.goal = req.body.newGoal;
    const response = await goal.save();

    res.json(response);
    // res.sendStatus(204);
})

exports.deleteGoal = asyncHandler(async (req, res) => {
    const goalId = req.params.id;

    // Check goal:
    const goal = await Goal.findById(goalId);
    if (!goal) {
        res.status(404);
        throw new Error("Goal Not Found");
    }
    
    // Check Ownership:
    if (goal.user.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Not authorized to delete || Access Forbiden");
    }

    await Goal.findByIdAndDelete(goalId);
    // await Goal.deleteOne({ _id: goalId });

    res.sendStatus(204);
})

/*
module.exports = {
    getGoals,
    addGoal,
    updateGoal,
    deleteGoal,
}
*/