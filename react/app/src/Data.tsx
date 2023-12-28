import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PopupForm from "./PopupForm";
import "./Data.css";
import axios, { AxiosResponse } from "axios";

export interface playerData {
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
   const [showPopup, setShowPopup] = useState(false);
   const handleOpenPopup = () => setShowPopup(true);
   const handleClosePopup = () => setShowPopup(false);

  useEffect(() => {
    getRecords().then((res) => setRecords(res.data)).catch();
  }, []);

  const getRecords:() => Promise<AxiosResponse> = async() => {
    return await axios.get("http://localhost:7000/players");
  }
  
  return (
    <div className="table-responsive">
      <div>
        <h1> Player table </h1>
        <button
          id="button"
          type="button"
          className="btn btn-primary"
          onClick={handleOpenPopup}
        >
          Create new entry
        </button>
      </div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
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
          <tr>
            <th scope="row">1</th>

              <td> </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td></td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td></td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td></td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td></td>
          </tr>
          <tr>
            <th scope="row">7</th>
            <td></td>
          </tr>
          <tr>
            <th scope="row">8</th>
            <td></td>
          </tr>
        </tbody>
      </table>
      <PopupForm show={showPopup} closePopup={handleClosePopup} />
    </div>
  );
}

export default Data;
