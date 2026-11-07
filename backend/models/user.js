const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Username is a required field"],
        },
        email: {
            type: String,
            required: [true, "E-mail is a required field"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is a required field"],
        },
    }, {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
