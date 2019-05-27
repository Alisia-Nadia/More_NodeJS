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
    extended: true
}));
app.use(bodyParser.json());
//neo4j
const neo4j = require("./neo4j.js");
//sql
const sql = require("./sql.js");
/////////////////////////////////////////////////////////////////////////////////////////////////////

//login verifier
const auth = function (req, res, next) { // if you are logged in, proceed, otherwise send json error
    if (req.session && req.session.admin) return next();
    else return res.sendFile(__dirname + "/public/html/loginPage.html");
};

const authJson = function (req, res, next) { // if you are logged in, proceed, otherwise send json error
    if (req.session && req.session.admin) return next();
    else return res.json({
        "err": "you must log in"
    });
};

//this prints any exception in the browser
app.use(function (err, req, res, next) {
    return res.status(500).send({
        "error": err
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
    sql.registerUser(rb.fName, rb.lName, rb.email, rb.telephone, rb.street, rb.city, rb.postCode, rb.country, rb.password).then(function (recordset) {
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
    let response = {}
    sql.loginUser(req.body.email, req.body.password).then(function (customer) {
        req.session.email = customer.email;
        req.session.cID = customer.cID;
        req.session.admin = true;
        req.session.shoppingCart = [];
        response.msg = "success";
        //insert into neo4j
        dbMagic(customer);
    }).catch(function (err) {
        console.log(err);
        response.err = err;
    }).then(function () {
        res.json(response);
    });
});

app.post("/addToShoppingCart", authJson, function (req, res) {
    let response = {};
    req.session.shoppingCart.push(req.body);
    response.msg = "success";
    response.alert = `item successfully added to the shopping cat (${req.session.shoppingCart.length} items)`
    res.json(response);
});
app.post("/removeFromShoppingCart", authJson, function (req, res) {
    let response = {};
    for (let i = 0; i < req.session.shoppingCart.length; i++) {
        if (req.session.shoppingCart[i].pSize === req.body.pSize && req.session.shoppingCart[i].pNo === req.body.pNo) {
            req.session.shoppingCart.splice(i, 1);
            break;
        }
    }
    response.msg = "success";
    response.alert = `item successfully removed from the shopping cat (${req.session.shoppingCart.length} items)`
    res.json(response);
});
app.post("/emptyShoppingCart", authJson, function (req, res) {
    let response = {};
    req.session.shoppingCart = [];
    response.msg = "success";
    response.alert = "your shopping cart is now empty";
    res.json(response);
});
app.get("/getShoppingCart", authJson, function (req, res) {
    res.json({
        "shoppingCart": req.session.shoppingCart
    });
});
app.get("/getProducts", function (req, res) {
    let response = {};
    sql.getProducts().then((products) => {
        // console.log(products[0]);
        response.products = products;
    }).catch(err => {
        response.err = err;
    }).then(() => {
        res.json(response);
    });
});
app.post("/getProductsForShoppingCart", function (req, res) {
    let response = {};
    // console.log("getting products for shopping cart");
    let cart = req.body.shoppingCart || [];
    // console.log("cart from request");
    // console.log(cart);
    sql.getProductsForShoppingCart(cart).then((products) => {
        // console.log("found products");
        // console.log(products);
        response.products = products;
    }).catch(err => {
        console.log(err);
        response.err = err;
    }).then(() => {
        res.json(response);
    });
});
app.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect("back");
});
app.get("/getEmail", auth, function (req, res) {
    res.send(req.session.email);
});

app.post("/createOrder", authJson, function (req, res) {
    let response = {};
    let rb = req.body;
    //console.log(rb.paymentOption);
    //console.log(req.session.shoppingCart)

    sql.createOrder(req.session.cID, rb.paymentOption, req.session.shoppingCart).then(function (recordOrder) {
        console.log(recordOrder);
        response.msg = "success";
        req.session.shoppingCart = [];
        let customer = {};
        customer.cID = req.session.cID;
        dbMagic(customer); //update neo4j
    }).catch(err => {
        response.err = err;
        console.log(err)
    }).then(() => {
        res.json(response);
    });
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
app.get("/checkOutPage", auth, function (req, res) {
    res.sendFile(__dirname + "/public/html/checkOutPage.html");
});

//start the server
const server = app.listen(process.env.PORT || 3000, function (err) {
    if (err) {
        console.log("Server couldn't start.");
        server.close(() => {
            process.exit();
        });
    }
    sql.connect().then(() => {
        console.log("Server started on port", server.address().port);

        //populate neo4j
        sql.getUsers().then(users => {
            users.forEach(user => {
                dbMagic(user);
            });
        }).catch(err => {
            console.log(err);
        })

    }).catch((err) => {
        console.log(err);
        server.close(() => {
            process.exit();
        });
    });
});


async function dbMagic(customer) {
    if (customer.email && customer.fName && customer.cID) {
        await neo4j.insertCustomer(customer.cID, customer.email, customer.fName, customer.lName);
    };
    sql.getColorFrequency(customer.cID).then(frequencies => {
        frequencies.forEach(colorCount => {
            neo4j.relateColorToCustomer(colorCount.color, colorCount.frequency, customer.cID);
        });
    }).catch(err => {
        console.log("error at getColorFrequency()");
        console.log(err);
    });
    sql.getCategoryFrequency(customer.cID).then(frequencies => {
        frequencies.forEach(cagtegoryCount => {
            neo4j.relateCategoryToCustomer(cagtegoryCount.category, cagtegoryCount.frequency, customer.cID);
        });
    }).catch(err => {
        console.log("error at getCategoryFrequency()");
        console.log(err);
    });
    sql.getMaterialFrequency(customer.cID).then(frequencies => {
        frequencies.forEach(materialCount => {
            neo4j.relateMaterialToCustomer(materialCount.material, materialCount.frequency, customer.cID);
        });
    }).catch(err => {
        console.log("error at getMaterialFrequency()");
        console.log(err);
    });
}