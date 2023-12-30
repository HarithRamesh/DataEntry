import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PopupForm from "./PopupForm";
import "./Data.css";
import axios, { AxiosResponse } from "axios";

export interface playerData {
  playerid: string,
  name: string;
  age: number;
  match: number;
  highestscore: number;
  battingaverage: number;
  bowlingaverage: number;
  wickets: number;
  bowlingeconomy: number;
}


function Data() {

  const [records, setRecords] = useState<playerData[]>([]);
   const [showPopup, setShowPopup] = useState<boolean | null>(null);
   const handleOpenPopup = () => setShowPopup(true);
   const handleClosePopup = () => setShowPopup(false);

  useEffect(() => {
    getRecords().then((res) => setRecords(res.data.data)).catch();
  }, [showPopup]);

  const getRecords:() => Promise<AxiosResponse> = async() => {
    return await axios.get("http://localhost:7000/players");
  }
  
  return (
    <div className="table-responsive">
      <div>
        <h1> Player table </h1>
      </div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">PlayerId</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Match</th>
            <th scope="col">Highest Score</th>
            <th scope="col">Batting Average</th>
            <th scope="col">Bowling Average</th>
            <th scope="col">Wickets</th>
            <th scope="col">Bowling Economy</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td> {record.playerid} </td>
              <td> {record.name} </td>
              <td> {record.age} </td>
              <td> {record.match} </td>
              <td> {record.highestscore} </td>
              <td> {record.battingaverage} </td>
              <td> {record.bowlingaverage} </td>
              <td> {record.wickets} </td>
              <td> {record.bowlingeconomy} </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        id="button"
        type="button"
        className="btn btn-primary"
        onClick={handleOpenPopup}
      >
        Create new entry
      </button>
      {showPopup != null ? (
        <PopupForm show={showPopup} closePopup={handleClosePopup} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Data;
