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

exports.connect = function () {
    return new Promise(function (resolve, reject) {
        sql.connect(config, function (err) {
            if (err) {
                sql.close();
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

exports.registerUser = function (firstName, lastName, email, telephone, street, city, postCode, country, password) {
    return new Promise(function (resolve, reject) {
        let pHash = bcrypt.hashSync(password, saltRounds);
        //checks for existing username or email get done by the database
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
        request.query(`INSERT INTO Customers (fName, lName, email, telephone, street, city, postCode, country, pHash) VALUES (@fName, @lName, @email, @telephone, @street, @city, @postCode, @country, @pHash)`, function (err, recordset) {
            if (err) {
                reject(err);
            } else {
                resolve(recordset);
            }
        });
    });
};

exports.loginUser = function (email, password) {
    return new Promise(function (resolve, reject) {
        let request = new sql.Request();
        request.query(`SELECT TOP 1 * FROM Customers WHERE email = '${email}'`, function (err, recordset) {
            if (err) {
                reject(err);
            } else
                if (recordset.recordset.length == 0) {
                    reject("user does not exist");
                } else
                    if (bcrypt.compareSync(password, recordset.recordset[0].pHash)) {
                        resolve("login successful");
                    } else {
                        reject("passwords do not match");
                    }
        });
    });
};

exports.getProducts = function () {
    return new Promise(function (resolve, reject) {
        let request = new sql.Request();
        ///request.multiple = true; // enables multiple statements in one query but here we only do a single insert
        request.query(`SELECT * FROM Products JOIN Product_details ON Products.pNo = Product_details.pNo`, function (err, recordset) {
            if (err) {
                reject(err);
            } else {
                resolve(recordset.recordset)
            }
        });
    });
}