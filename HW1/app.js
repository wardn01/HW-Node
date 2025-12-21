// ward najjar 325523017
// mohammed rayan 327640835
// 50/2

const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

// first Middleware function that logs a message => Hello 1
app.use((req, res, next) => {
  console.log("Hello 1");
  next();
});

// second Middleware function that logs a message => Hello 2
app.use((req, res, next) => {
  console.log("Hello 2");
  next();
});

// url starting with "/users"
app.use("/users", (req, res) => {
  res.send("<h1>Welcome to the USERS</h1>");
});

// Default for any other path use it
app.use((req, res) => {
  res.send("<h1>Welcome</h1>");
});

// Start the server
app.listen(port, () => {
  console.log(`The application is running on port ${port}`);
});
