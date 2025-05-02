const express = require("express");
const app = express();

const people = require("./routes/people");
const auth = require("./routes/auth");

// logger middleware function
const logger = (req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
};

//Using logger for all routes
app.use(logger);

//Serve static file (HTML,CSS,etc.)
app.use(express.static("./methods-public"));

//Body parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/people", people);
app.use("/login", auth);

// Start Server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
