// ward najjar 325523017
// mohammed rayan 327640835
// 50/2

const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

// get logger
const logger = require("./logger");

app.use(logger);

// Authorization middleware (only for /admin)
const adminAuth = (req, res, next) => {
  const { user } = req.query;

  if (user === "admin") {
    return next();
  }

  res.status(403).send("Access Denied");
};

// GET / => url /
app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});

// GET /admin (protected) just for admin. /admin?user=admin
app.use("/admin", adminAuth);

app.get("/admin", (req, res) => {
  res.send("Welcome to the admin page!");
});

// GET /public
app.get("/public", (req, res) => {
  res.send("This is a public page.");
});

// Start the server
app.listen(port, () => {
  console.log(`The application is running on port ${port}`);
});
