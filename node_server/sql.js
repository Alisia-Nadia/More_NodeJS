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

exports.registerUser = function (username, name, address, email, password) {
    let hash = bcrypt.hashSync(password, saltRounds);
    
    //checks for existing username or email get done by the database

    sql.connect(config, function(err){
        if (err) {
            console.log(err);
            return false;
        };
        let request = new sql.Request();
        request.input('username', sql.VarChar, username);
        request.input('name', sql.VarChar, name);
        request.input('address', sql.VarChar, address);
        request.input('email', sql.VarChar, email);
        request.input('hash', sql.VarChar, hash);
        // request.multiple = true; // enables multiple statements in one query but here we only do a single insert
        request.query(`INSERT INTO Users (username, name, address, email, hash) VALUES (@username, @name, @address, @email, @hash)`, function(err, recordset){
            console.log(recordset);
            return true;
        });
    });

};

exports.loginUser = function (username, password) {
    sql.connect(config, function (err) {
        if (err) {
            console.log(err);
            return false;
        };
        let request = new sql.Request();
        request.query(`SELECT TOP 1 * FROM Persons WHERE name = '${username}'`, function (err, recordset) {
            if (err) {
                console.log(err);
                return false;
            };
            if (recordset.recordset.length == 0) {
                console.log("no matching username");
                return false;
            };
            if(bcrypt.compareSync(password, recordset.recordset[0].hash)){
                console.log("passwords match");
                return true;
            }else{
                console.log("passwords do not match");
                return false;
            }
        });
    });
};

//test, delete later
exports.testSelect = function () {
    sql.connect(config, function (err) {

        if (err) return console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('select * from Persons', function (err, recordset) {

            if (err) console.log(err)

            // send records as a response
            console.log(recordset.recordset);

        });
    });
};