const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const path = require("path");

// initializations
const app = express();

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  handlebars({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars.js")
  })
);
app.set("view engine", ".hbs");

// Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Global Variables
app.use((req, res, next) => {
  next();
});

// Routes
app.use(require("./routes/index.js"));
app.use(require("./routes/authentication.js"));
app.use("/links", require("./routes/links.js"));

// Public
app.use(express.static(path.join(__dirname, "public")));

// Start server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
