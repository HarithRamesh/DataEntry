"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dBService = exports.dBConnection = void 0;
const pg_1 = require("pg");
const DB_NAME = process.env.DB_NAME || "PlayersDB";
exports.dBConnection = new pg_1.Client({
    host: "localhost",
    user: "postgres",
    database: "postgres",
    password: "abcd1234",
    port: 5433,
});
exports.dBConnection.connect((err) => {
    if (err) {
        console.log(`Something went wrong while connecting to database Server`);
    }
    else {
        console.log("Database Server connection established successfully");
    }
});
var dBService;
(function (dBService) {
    function createTable(tableName) {
        const insertQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
      PlayerId uuid,
      Name VARCHAR(100),
      PlayerType VARCHAR(100),
      Age int,
      Match int,
      HighestScore int,
      BattingAverage float,
      BowlingAverage float,
      Wickets int,
      BowlingEconomy float,
      PRIMARY KEY(PlayerId)
      )`;
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