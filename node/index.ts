import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { dBConnection, dBService } from "./dbService";
import { playerData } from "./interfaces";
const app = express();
const PORT = process.env.PORT || 7000;
const TABLE = "Players";

app.use(cors());
app.use(bodyParser.json());
dBService.createTable(TABLE);
app.post("/insert/player", (req, res) => {
  if (req.body == null) {
    res.status(400).send({
      success: false,
      message: "No body parameter",
    });
  } else {
    const payload = JSON.parse(req.body.data);
    if (!validatePayload(payload)) {
      res.status(400).send({
        success: false,
        message: "Mandatory fields are empty",
      });
    }
    const columns = Object.keys(payload);
    const values = Object.values(payload).map(
      (v) => `'${v}'`
    );
    // Insert or update - If not present in the db insert else update column[0] is primary key
    let query = `INSERT INTO ${TABLE} (${columns}) VALUES (${values}) ON CONFLICT(PlayerId) DO UPDATE SET `;
    for (let i = 0; i < columns.length; i++) {
      if (i === columns.length - 1) {
        query = query.concat(` ${columns[i]} = ${values[i]}`);
      }
      else {
        query = query.concat(` ${columns[i]} = ${values[i]},`);
      }
    }
    dBConnection.query(query, (err) => {
      if (err != null) {
        console.error(`Error inserting to a table ${err}`);
        res.status(400).send({
          success: false,
          message: "Insertion failed",
        });
      } else {
        res.status(200).send({
          success: true,
          message: "Inserted successfully",
        });
        console.log("Inserted successfully");
      }
    });
  }
});

app.get("/players", (req,res) => {
  const query = `SELECT * FROM ${TABLE}`
  dBConnection.query(query, (error, result) => {
    if (error) {
      res.status(400).send({
        success: false,
        message: "Failed to query from DB"
      });
      console.error(`Failed to query from DB reason ${error}`);
    }
    else {
      res.status(200).send({
        success: true,
        message: "Queried successfully",
        data: result.rows
      });
    }
  });
})

app.delete("/players/:id", (req, res) => {
  const playerId = req.params.id;
  const query = `DELETE FROM ${TABLE} where playerid='${playerId}'`;
  dBConnection.query(query, (error) => {
    if (error) {
      console.error(`Unable to delete the record reason ${error}`);
      res.status(400).send({
        success: false,
        message: "Unable to delete the record",
      });
    } else {
      console.log("Record deleted successfully");
      res.status(200).send({
        success: true,
        message: "Record deleted successfully",
      });
    }
  });
});

function validatePayload(data: playerData) {
  return (
    typeof data === "object" &&
    Object.values(data).some((d) => d != null && d !== "")
  );
}

app.listen(PORT, () => {
  console.log(`Server started at the port: ${PORT}`);
});
