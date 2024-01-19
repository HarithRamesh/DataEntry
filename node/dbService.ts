import { Client } from "pg";
const DB_NAME = process.env.DB_NAME || "PlayersDB";
export const dBConnection = new Client({
  host: "localhost",
  user: "postgres",
  database: "postgres",
  password: "abcd1234",
  port: 5432,
});

dBConnection.connect((err) => {
  if (err) {
    console.log(`Something went wrong while connecting to database Server`);
  } else {
    console.log("Database Server connection established successfully");
  }
});
export namespace dBService {
  export function createTable(tableName: string) {
    const insertQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
      PlayerId uuid,
      Name VARCHAR(100),
      PlayerType VARCHAR(100),
      Age int,
      Match int,
      HighestScore int,
      BattingAverage int,
      BowlingAverage int,
      Wickets int,
      BowlingEconomy int,
      PRIMARY KEY(PlayerId)
      )`;
    dBConnection.query(insertQuery, (err, res) => {
      if (err != null) {
        throw new Error(`Failed to create table reason ${err}`);
      }
      console.log("Table created successfully");
    });
  }
}
