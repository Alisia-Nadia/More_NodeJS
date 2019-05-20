// const { Parser } = require('json2csv');

// const fields = ['name', 'age'];
// let object = {};
// object.name = "Alice";
// object.age = 19;
// let object2 = {};
// object2.name = "Bob";
// object2.age = 34;

// let array = [];
// array.push(object);
// array.push(object2);

// const json2csvParser = new Parser({fields});
// const csv = json2csvParser.parse(array);
 
// console.log(csv);

const sql = require("./sql.js");

//sql.loginUser("Alicse", "pw");

//sql.registerUser("Alice", "Liss", "alice.liss@mail.com", 44556622, "Lygten 1, 25 tv", "Copenhagen", "2400", "Denmark", "alice");
sql.loginUser("alice.liss@mail.com", "alice");

