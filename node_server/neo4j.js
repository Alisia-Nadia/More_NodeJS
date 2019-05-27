//neo4j driver
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://hickle-flat-blue-billie.graphstory.me:7687", neo4j.auth.basic("hickle_flat_blue_billie", "fSfrV3alBtF4jbpcYNZQlh5qjwJ"));
const session = driver.session();
//json to csv parser
const { Parser } = require('json2csv');

//practical code

exports.insertCustomer = async function (cid, email, fName, lName) {
    let params = {};
    params.cid = cid;
    params.email = email;
    params.name = fName + " " + lName;
    let result = await session.run(`MERGE (n:Customer {cid: {cid}, name: {name}, email: {email}}) RETURN n`, params);
    // const singleRecord = result.records[0];
    // const node = singleRecord.get(0);
    // console.log(node.properties.name);
};

exports.relateColorToCustomer = async function (color, frequency, cid) {
    let params = {};
    params.color = color;
    params.frequency = frequency;
    params.cid = cid;
    let result = await session.run(`MERGE (b:Color {color: {color}}) MERGE (a:Customer {cid: {cid}}) MERGE (a)-[r:Purchased]->(b) SET r.frequency = {frequency}`, params);
};

exports.relateCategoryToCustomer = async function (category, frequency, cid) {
    let params = {};
    params.category = category;
    params.frequency = frequency;
    params.cid = cid;
    let result = await session.run(`MERGE (b:Category {category: {category}}) MERGE (a:Customer {cid: {cid}}) MERGE (a)-[r:Purchased]->(b) SET r.frequency = {frequency}`, params);
};

exports.relateMaterialToCustomer = async function (material, frequency, cid) {
    let params = {};
    params.material = material;
    params.frequency = frequency;
    params.cid = cid;
    let result = await session.run(`MERGE (b:Material {material: {material}}) MERGE (a:Customer {cid: {cid}}) MERGE (a)-[r:Purchased]->(b) SET r.frequency = {frequency}`, params);
};

exports.getFirstNeo4jHit = async function (query, params) {
    let result = await session.run(query, params);
    if (!(result.records.length > 0)) {
        return null
    };
    const singleRecord = result.records[0];
    const node = singleRecord.get(0);
    return node;
};