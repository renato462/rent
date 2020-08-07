// import helpers
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf"); // Proteccion CSRF

const { PORT, MONGODB_URI} = require('./config/index.js')

// Constantes for Mongo DB y Sessions
// const MONGODB_URI = MONGODB_URI;
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

// Protection CSRT
const csrfProtection = csrf();

// Import the Router middle
const adminRouter = require("./routes/adminRoutes.js");
const authRouter = require("./routes/authRoutes.js");

// Import Models
// const Client = require("./model/client");
// const Property = require("./model/property");
const User = require("./model/user");


// configure the engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Public route and Bodypaser for requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // Necesario para que Express Conozca JSON
app.use(express.static(path.join(__dirname, "public")));
app.use("assets", express.static(path.join(__dirname, "public")));
app.use("plugins", express.static(path.join(__dirname, "public")));

// Configure Sessions
app.use(
  session({
    secret: "my secrete",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Validando usuario
app.use((req, res, next) => {
  User.findById("5f093704156a19ba5468657a")
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
  //console.log(res.status(404));
  res.status(404).render("error/404", {
    layout: "../error/404",
    pageTitle: "Page Not Found",
  });
});

// manejar errores sin que la herramienta explote
app.use((error, req, res, next) => {
  //console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  
  res.status(status).render("error/500", {
    layout: "../error/500",
    pageTitle: "Page Not Found",
  });
});

// Conection to the database with Mongoose

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
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
    app.listen(PORT);
  })
  .catch((error) => {
    console.error(error);
  });
