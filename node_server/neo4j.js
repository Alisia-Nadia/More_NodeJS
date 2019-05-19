//neo4j driver
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://hickle-flat-blue-billie.graphstory.me:7687", neo4j.auth.basic("hickle_flat_blue_billie", "fSfrV3alBtF4jbpcYNZQlh5qjwJ"));
const session = driver.session();
//json to csv parser
const { Parser } = require('json2csv');

//practical code

exports.insertPerson = async function (object) {
    let result = await session.run(`CREATE (n:Person {name: {name}, age: {age}}) RETURN n`, object);
    const singleRecord = result.records[0];
    const node = singleRecord.get(0);
    console.log(node.properties.name);
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