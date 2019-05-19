//express
const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
//express-session
const expressSession = require("express-session");
app.use(expressSession({
    secret: "2C44-4D44-WppQ38S",
    resave: true,
    saveUninitialized: true
}));
//body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//bcrypt (password hashing)
const bcrypt = require("bcrypt");
const saltRounds = 10;
//neo4j
const neo4j = require("./neo4j.js");
//sql
const sql = require("./sql.js");
/////////////////////////////////////////////////////////////////////////////////////////////////////

//app (this code works)
// let person = {};
// person.name = "Alice";
// person.age = 20;
// neo4j.insertPerson(person);

//login verifier
const auth = function (req, res, next) { // if you are logged in, proceed, otherwise send json error
    if (req.session && req.session.admin)
        return next();
    else
        return res.status(403).send('please log in');
};

//this prints any exception in the browser
app.use(function (err, req, res, next) {
    return res.status(500).send({
        error: err
    });
});

//api methods
app.post("/register", auth, function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    bcrypt.hash(password, saltRounds).then(function (hash) {
        let newUser = {
            "username": username,
            "password": hash,
            "email": email
        }

        //*INSERT INTO SQL*

        res.send("success");
    }).catch(function (err) {
        console.log(err);
        res.send("failure");
    });
});

app.post("/login", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    //*DO MAGIC*

});

//navigation
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/html/index.html");
});
app.get("/loginPage", function (req, res) {
    res.sendFile(__dirname + "/public/html/loginPage.html");
});
app.get("/registerPage", function (req, res) {
    res.sendFile(__dirname + "/public/html/registerPage.html");
});


//start the server
const server = app.listen(process.env.PORT || 3000, function (err) {
    if (err) {
        console.log("Server couldn't start.");
        server.close(() => {
            process.exit()
        });
    } else {
        console.log("Server started on port", server.address().port);
    }
});