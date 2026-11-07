const express = require('express');
const { getGoals, addGoal, updateGoal, deleteGoal } = require('../controllers/goalController');
const { requireAuth } = require('../middlewares/auth');

const goalRouter = express.Router();

// goalRouter.get("/", getGoals);
// goalRouter.post("/", addGoal);
// goalRouter.put("/:id", updateGoal);
// goalRouter.delete("/:id", deleteGoal);

goalRouter.route("/").get(requireAuth, getGoals).post(requireAuth, addGoal);
goalRouter.route("/:id").put(requireAuth, updateGoal).delete(requireAuth, deleteGoal);

module.exports = goalRouter;