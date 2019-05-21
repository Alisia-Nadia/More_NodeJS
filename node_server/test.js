const sql = require("./sql.js");

//sql.loginUser("Alicse", "pw");
/*sql.connect().then(() => {
    sql.registerUser("Alice", "Liss", "alice.liss@mail.com", 77663322, "Jagtvej 14, 4 tv", "copenhagen", "2200", "Denmark", "alice");
    sql.registerUser("Bob", "Maher", "bob.maher@mail.com", 11556688, "Sesame 12, 2 th", "Copenhagen", "2400", "Denmark", "bob");
    sql.registerUser("Cotton", "Maher", "cotton.maher@mail.com", 44998855, "Lygten 2, 9 tv", "Copenhagen", "2400", "Denmark", "cotton");
    sql.registerUser("Ella", "Johan", "Ejohan0@mail.com", 99663322, "Lygten 1, 25 tv", "Copenhagen", "2400", "Denmark", "alice");
    sql.registerUser("John", "Proctor", "john.proctor@mail.com", 77443322, "Lygten 89, st tv", "Copenhagen", "2400", "Denmark", "john");
    sql.registerUser("William", "Hobbs", "william.hobbs@mail.com", 33557799, "Lygten 22, 12 tv", "Copenhagen", "2400", "Denmark", "william");
    sql.registerUser("Edward", "Bishop", "edward.bishop@mail.com", 66552244, "Lygten 2212, 0 tv", "Copenhagen", "2400", "Denmark", "edward");
    sql.registerUser("Ann", "Putnam", "ann.putnam@mail.com", 44117755, "Tuborgvej, st th", "Copenhagen", "2400", "Denmark", "ann");
    sql.registerUser("John", "Doe", "john.doe@mail.com", 77665533, "Tagensvej 4, 3 tv", "Copenhagen", "2400", "Denmark", "john");
    sql.registerUser("Deodat", "Lawson", "deodat.lawson@mail.com", 44663322, "Amagerbrogade 48", "Copenhagen", "2300", "Denmark", "deodat");
});*/

sql.connect().then(()=>{
    let shoppingCart = [];
    shoppingCart.push({"pNo": 40, "pSize": "S"});
    shoppingCart.push({"pNo": 40, "pSize": "S"});
    shoppingCart.push({"pNo": 40, "pSize": "M"});
    shoppingCart.push({"pNo": 40, "pSize": "M"});
    shoppingCart.push({"pNo": 40, "pSize": "L"});
    shoppingCart.push({"pNo": 40, "pSize": "L"});
    sql.createOrder(29, "Bank", shoppingCart).then((recordset)=>{
        console.log(recordset);
    }).catch((err)=>{
        console.log(err);
    });
});
