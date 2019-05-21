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
        request.query(`INSERT INTO Customers (fName, lName, email, telephone, street, city, postCode, country, pHash) VALUES (@fName, @lName, @email, @telephone, @street, @city, @postCode, @country, @pHash);`, function (err, recordset) {
            if (err) return reject(err);
            return resolve(recordset.recordset);
        });
    });
};

exports.loginUser = function (email, password) {
    return new Promise(function (resolve, reject) {
        let request = new sql.Request();
        request.input('email', sql.VarChar, email);
        request.query(`SELECT TOP 1 * FROM Customers WHERE email = @email;`, function (err, recordset) {
            if (err) return reject(err);
            if (recordset.recordset.length == 0) return reject("user does not exist");
            if (bcrypt.compareSync(password, recordset.recordset[0].pHash)) return resolve(recordset.recordset[0]);
            return reject("passwords do not match");
        });
    });
};

exports.getProducts = function () {
    return new Promise(function (resolve, reject) {
        let request = new sql.Request();
        request.query(`SELECT * FROM Products JOIN Product_details ON Products.pNo = Product_details.pNo;`, function (err, recordset) {
            if (err) return reject(err);
            return resolve(recordset.recordset);
        });
    });
}

exports.createOrder = function (cid, paymentOption, shoppingCart) {
    return new Promise(function (resolve, reject) {
        if (!["Bank", "Card", "MobilePay"].includes(paymentOption)) {
            return reject("invalid payment option");
        }
        if (shoppingCart.length < 1) {
            return reject("shopping cart is empty");
        }
        let request = new sql.Request();
        request.input('cID', sql.Int, cid);
        //request.input('date', sql.Date, "getdate()");
        request.input('paymentOption', sql.VarChar, paymentOption);
        request.input('status', sql.VarChar, "BeingProcessed"); // default status
        request.multiple = true;
        generateInsertsForShoppingCart(shoppingCart).then((generatedInserts) => {
            request.query(`
            BEGIN TRY
                BEGIN TRANSACTION	
                    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
                    DECLARE @generatedoID int;
                    DECLARE @table table (id int);
                    INSERT INTO Orders (cID, date, paymentOption, status) OUTPUT INSERTED.oID INTO @table VALUES (@cID, getdate(), @paymentOption, @status);
                    SELECT @generatedoID = id from @table;
            ` + generatedInserts + `
            COMMIT
            END TRY
            BEGIN CATCH
                PRINT 'catch'
                ROLLBACK
            END CATCH`, function (err, recordset) {
                    if (err) return reject(err);
                    return resolve(recordset);
                });
        }).catch((err) => {
            console.log("error at generateInsertsForShoppingCart()");
            console.log(err);
            return reject("problem with items in the shopping cart");
        });
    });
}

function generateInsertsForShoppingCart(shoppingCart) {
    return new Promise(function (resolve, reject) {
        let generatedInserts = "";
        let loops = shoppingCart.length;
        shoppingCart.forEach(async product => { // product should contain the product number and size
            let request = new sql.Request();
            request.input('pNo', sql.Int, product.pNo);
            request.input('pSize', sql.VarChar, product.pSize);
            try {
                let recordset = await request.query(`SELECT TOP 1 * FROM Product_details WHERE pNo = @pNo AND pSize = @pSize;`);
                if (recordset.recordset.length == 0) return reject("invalid product");
                let retrievedProduct = recordset.recordset[0];
                if (retrievedProduct.quantity < 1) return reject("product out of stock");
                generatedInserts = generatedInserts + `INSERT INTO Order_products (oID, pNo, pSize, priceAtPurchase) VALUES (@generatedoID, ${retrievedProduct.pNo}, '${retrievedProduct.pSize}', ${retrievedProduct.price});\n`;
            } catch (err) {
                return reject(err);
            }
            loops--;
            if (loops == 0) {
                return resolve(generatedInserts);
            }
        });
    });
}