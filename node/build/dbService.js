"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dBService = exports.dBConnection = void 0;
const pg_1 = require("pg");
exports.dBConnection = new pg_1.Client({
    host: "localhost",
    user: "postgres",
    database: "myDB",
    password: "abcd1234",
    port: 5432,
});
exports.dBConnection.connect((err) => {
    if (err) {
        console.log(`Something went wrong while connecting database`);
    }
    else {
        console.log("Database connection established successfully");
    }
});
var dBService;
(function (dBService) {
    function createTable(tableName) {
        const insertQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (PlayerId uuid , Name VARCHAR(100), Age int, Match int, HighestScore int,BattingAverage int,BowlingAverage int, Wickets int, BowlingEconomy int,PRIMARY KEY(PlayerId))`;
        exports.dBConnection.query(insertQuery, (err, res) => {
            if (err != null) {
                throw new Error(`Failed to create table reason ${err}`);
            }
            console.log("Table created successfully");
        });
    }
    dBService.createTable = createTable;
})(dBService || (exports.dBService = dBService = {}));
//# sourceMappingURL=dbService.js.map