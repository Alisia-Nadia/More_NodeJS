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
        return res.sendFile(__dirname + "/public/html/loginPage.html");
};

//this prints any exception in the browser
app.use(function (err, req, res, next) {
    return res.status(500).send({
        error: err
    });
});

//api methods
app.post("/register", function (req, res) {
    let response = {};
    let rb = req.body;
    if (rb.password !== rb.passwordRepeat) {
        console.log("passwords do not match");
        response.err = "passwords do not match";
        return res.json(response);
    }
    sql.registerUser(rb.fName, rb.lName, rb.email, rb.telephone, rb.street, rb.city, rb.postCode, rb.country, rb.password
    ).then(function (recordset) {
        console.log(recordset)
        response.msg = "success";
    }).catch(function (err) {
        console.log(err);
        response.err = err;
    }).then(function () {
        res.json(response);
    });
});

app.post("/login", function (req, res) {
    let response = {};
    sql.loginUser(req.body.email, req.body.password
    ).then(function (msg) {
        req.session.username = req.body.email;
        req.session.admin = true;
        req.session.shoppingCart = [];
        response.msg = "success";
        console.log(msg);
    }).catch(function (err) {
        console.log(err);
        response.err = err;
    }).then(function () {
        res.json(response);
    });
});

app.post("/addToShoppingCart", auth, function (req, res){
    req.session.shoppingCart.push(req.body.item);
    res.json({"msg": "success"});
});
app.post("/emptyShoppingCart", auth, function (req, res){
    req.session.shoppingCart = [];
    res.json({"msg": "success"});
});
app.get("/getShoppingCart", auth, function (req, res){
    res.json({"shoppingCart": req.session.shoppingCart});
});

app.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect("back");
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
app.get("/shoppingCartPage", auth, function (req, res) {
    res.sendFile(__dirname + "/public/html/shoppingCartPage.html");
});


//start the server
const server = app.listen(process.env.PORT || 3000, function (err) {
    if (err) {
        console.log("Server couldn't start.");
        server.close(() => {
            process.exit()
        });
    }
    sql.connect().then(()=>{
        console.log("Server started on port", server.address().port);
    }).catch((err)=>{
        console.log(err);
        server.close(() => {
            process.exit()
        });
    });
    

});