const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const { logger } = require("./middlewares/logger");
const { notFound } = require("./middlewares/notFound");
const { error } = require("./middlewares/error");
const goalRouter = require("./routes/goalRouter");
const userRouter = require("./routes/userRouter");

const app = express();
PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);
app.use("/api/goals", goalRouter);
app.use("/api/users", userRouter);
app.use(notFound);
app.use(error);


// Serve React frontend
app.use(express.static(
  path.join(__dirname, "../frontend/dist")
));

// React client-side routing fallback
app.get(/.*/, (req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/dist/index.html")
  );
});


mongoose.connect(process.env.MONGOOSE_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}).catch(err => {
    console.error("Error while connecting to Mongoose:", err);
});
