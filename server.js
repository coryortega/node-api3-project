const express = require('express');

const postsRouter = require("./posts/postRouter.js");
const usersRouter = require("./users/userRouter.js")

const server = express();

server.use(express.json());
server.use(logger);

server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.get("/echo", (req, res) => {
  res.send(req.headers);
});
//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`);
  next();
}

function gateKeeper(req, res, next) {
  const password = req.headers.password;

  if (password && password.toLowerCase() === "mellon") {
    next();
  } else {
    res.status(401).json({ you: "shall not pass!!" });
  }
}

function checkRole(role) {
  return function(req, res, next) {
    if (role && role === req.headers.role) {
      next();
    } else {
      res.status(403).json({ message: "can't touch this!" });
    }
  };
}
module.exports = server;
