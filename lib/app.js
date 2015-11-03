var express = require("express"),
app = express(),
path = require("path"),
monk = require("monk"),
db = monk(process.env.mongoURL);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Routes
app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.get("/boards", function (req, res) {
    var db = req.db,
    collection = db.get("projects");

    collection.find({}, {"sort" : "name"}, function (e, docs) {
        res.render("projectReport", {
            "projectList" : docs
        });
    });
});

app.get("/users", function (req, res) {
    var db = req.db,
    collection = db.get("users");

    collection.find({}, {"sort" : "github.email"}, function (e, docs) {
        res.render("userReport", {
            "userList" : docs
        });
    });
});

// Listen
var port = process.env.PORT || 3000;

app.listen(port);
console.log("Listening on localhost:" + port);
