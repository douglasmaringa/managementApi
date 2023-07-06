const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

// Routes imports
const userRoute = require("./routes/user");
const monitorRoute = require("./routes/monitor");

// DB connection
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// Initializing routes
app.use("/api/user", userRoute);
app.use("/api/monitor", monitorRoute);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
