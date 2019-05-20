//sql server driver
const sql = require("mssql");
const config = {
    user: "hickle_flat_blue_billie",
    password: "fSfrV3alBtF4jbpcYNZQlh5qjwJ",
    server: "bilbo-server.database.windows.net",
    database: "sqldb",
    options: {
        "encrypt": true
    }
};
//bcrypt (password hashing)
const bcrypt = require("bcrypt");
const saltRounds = 10;

//practical code

let promise = new Promise(function (resolve, reject) {

});

exports.registerUser = function (firstName, lastName, email, telephone, street, city, postCode, country, password) {
    return new Promise(function (resolve, reject) {
        let pHash = bcrypt.hashSync(password, saltRounds);

        //checks for existing username or email get done by the database

        sql.connect(config, function (err) {
            if (err) {
                reject(err);
            };
            let request = new sql.Request();
            request.input('fName', sql.VarChar, firstName);
            request.input('lName', sql.VarChar, lastName);
            request.input('email', sql.VarChar, email);
            request.input('telephone', sql.Int, telephone);
            request.input('street', sql.VarChar, street);
            request.input('city', sql.VarChar, city);
            request.input('postCode', sql.VarChar, postCode);
            request.input('country', sql.VarChar, country);
            request.input('pHash', sql.VarChar, pHash);
            // request.multiple = true; // enables multiple statements in one query but here we only do a single insert
            request.query(`INSERT INTO Customers (fName, lName, email, telephone, street, city, postCode, country, pHash) VALUES (@fName, @lName, @email, @telephone, @street, @city, @postCode, @country, @pHash)`, function (err, recordset) {
                if (err) {
                    reject(err);
                };
                resolve(recordset);
            });
        });
    });
};

exports.loginUser = function (email, password) {
    sql.connect(config, function (err) {
        if (err) {
            console.log(err);
            return false;
        };
        let request = new sql.Request();
        request.query(`SELECT TOP 1 * FROM Customers WHERE email = '${email}'`, function (err, recordset) {
            if (err) {
                console.log(err);
                return false;
            };
            if (recordset.recordset.length == 0) {
                console.log("no matching email");
                return false;
            };
            if (bcrypt.compareSync(password, recordset.recordset[0].pHash)) {
                console.log("login successful");
                return true;
            } else {
                console.log("passwords do not match");
                return false;
            }
        });
    });
};