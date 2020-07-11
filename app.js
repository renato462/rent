// import helpers
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Import the Router middle
const adminRouter = require("./routes/adminRoutes.js");
const authRouter = require("./routes/authRoutes.js");

// Import Models
const Client = require("./model/client");
const Property = require("./model/property");
const User = require("./model/user");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Public route and Bodypaser for requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("assets", express.static(path.join(__dirname, "public")));
app.use("plugins", express.static(path.join(__dirname, "public")));

// Validando usuario
app.use((req, res, next) => {
  User.findById("5f0377b2fc34b783b043570b")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// Register middleware
app.use(adminRouter);
app.use(authRouter);

app.use((req, res) => {
  // console.log(res.status(404));
  res.status(404).render("error/404", {
    layout: "../error/404",
    pageTitle: "Page Not Found",
  });
});

// Conection to the database with Mongoose

mongoose
  .connect(
    "mongodb+srv://renato462:8ZnxDMjtNJke5BZK@cluster0-4srg4.mongodb.net/rent?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then((result) => {
    User.findOne()
      .then((user) => {
        if (!user) {
          const user = new User({
            nickName: "renato462",
            name: "Renato ",
            lastName: "Caldas",
            email: "renato462@gmail.com",
          }).save();
        }
      })
      .catch((error) => {
        console.log(error);
      });

    app.listen(4000);
  })
  .catch((error) => {
    console.error(error);
  });
