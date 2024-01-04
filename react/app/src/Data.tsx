import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PopupForm from "./PopupForm";
import "./Data.css";
import axios, { AxiosResponse } from "axios";
import { Message } from "./Message";
import {playerData} from "../interfaces/PlayerInterface"

function Data() {
  const [isRecordDeleted, setIsRecordDeleted] = useState(false);
  const [recordToPrepopulateForm,setRecordToPrepopulateForm] = useState<playerData>({} as playerData); 
  const [formTitle,setFormTitle] = useState<string>(""); 
  const [records, setRecords] = useState<playerData[]>([]);
  const [showPopup, setShowPopup] = useState<boolean | null>(null);
  const handleOpenPopup = () => {
    setShowPopup(true);
    setFormTitle("Create Player");
    setRecordToPrepopulateForm({} as playerData);
  }
  const handleClosePopup = () => setShowPopup(false);

  const prepopulateValue = (value: playerData) => {
    handleOpenPopup();
    setRecordToPrepopulateForm(value);
    setFormTitle("Update Player");
  };

  useEffect(() => {
    getRecords()
      .then((res) => setRecords(res.data.data))
      .catch((error) =>
        console.error(`Failed to query the records reason ${error}`)
      );
  }, [showPopup, formTitle, recordToPrepopulateForm, isRecordDeleted]);

  const getRecords: () => Promise<AxiosResponse> = async () => {
    return await axios.get("http://localhost:7000/players");
  };

  const deleteRecord: (playerId: string) => Promise<void> = async (
    playerId: string
  ) => {
    const response = await axios.delete(
      `http://localhost:7000/players/${playerId}`
    );
    if (response.status === 200) {
      Message.success("Record deleted successfully");
    } else {
      Message.failure("Failed to delete the record");
    }
    setIsRecordDeleted(!isRecordDeleted);
  };

  return (
    <div className="table-responsive">
      <div>
        <h1> Player table </h1>
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
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td> {index + 1} </td>
              <td> {record.name} </td>
              <td> {record.age} </td>
              <td> {record.match} </td>
              <td> {record.highestscore} </td>
              <td> {record.battingaverage} </td>
              <td> {record.bowlingaverage} </td>
              <td> {record.wickets} </td>
              <td> {record.bowlingeconomy} </td>
              <button
                className="btn btn-warning"
                onClick={() => prepopulateValue(record)}
              >
                Update
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteRecord(record.playerid)}
              >
                Delete
              </button>
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
      {/* Auto render when new record is created */}
      {showPopup != null ? (
        <PopupForm
          show={showPopup}
          closePopup={handleClosePopup}
          data={recordToPrepopulateForm}
          title={formTitle}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Data;
