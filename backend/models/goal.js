const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    goal: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);