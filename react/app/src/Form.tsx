import React, { useRef, useState } from "react";
import axios from "axios";
import md5 from "md5";
import "react-toastify/dist/ReactToastify.css";
import { Message } from "./Message";
import "./Form.css";
import { render } from "@testing-library/react";
import { playerData } from "../interfaces/PlayerInterface";

interface formProps {
  values: playerData;
}

const Form: React.FC<formProps> = ({ values }) => {
  let name = useRef<HTMLInputElement>(null);
  let age = useRef<HTMLInputElement>(null);
  let match = useRef<HTMLInputElement>(null);
  let highscore = useRef<HTMLInputElement>(null);
  let batavg = useRef<HTMLInputElement>(null);
  let bowlavg = useRef<HTMLInputElement>(null);
  let wickets = useRef<HTMLInputElement>(null);
  let bowleco = useRef<HTMLInputElement>(null);
  const [type, setType] = useState("Batsman");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const playerData = {
      playerid: md5(name.current?.value.toLowerCase() as any),
      name: name.current?.value,
      PlayerType: type,
      age: age.current?.value,
      match: match.current?.value,
      highestscore: highscore.current?.value,
      battingaverage: batavg.current?.value,
      bowlingaverage: bowlavg.current?.value,
      wickets: wickets.current?.value,
      bowlingeconomy: bowleco.current?.value,
    };
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(playerData),
    };

    axios
      .post("/insert/player", postData)
      .then((res) => {
        if (res.status === 200) {
          Message.success(" New player created successfully");
        } else {
          Message.failure("Failed to create new player");
        }
      })
      .catch((err) => {
        Message.failure("Something went wrong while creating a new player");
        console.log(err);
      });
  };
  const handleReset = () => {
    render(<form></form>);
  };
  return (
    <div className="form">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <label>
          Player Name:
          <input
            type="text"
            placeholder="name"
            value={values?.name}
            ref={name}
            required
          />
        </label>
        <label>
          Player Type:
          <select
            className="drop-down"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Batsman</option>
            <option>Bowler</option>
            <option>All-Rounder</option>
            <option>Wicket-keeper-Batsman</option>
          </select>
        </label>
        <label>
          Age:
          <input
            type="text"
            placeholder="age"
            defaultValue={values?.age}
            ref={age}
            required
          />
        </label>
        <label>
          Match:
          <input
            type="text"
            placeholder="match"
            defaultValue={values?.match}
            ref={match}
            required
          />
        </label>
        <label>
          Highest Score:
          <input
            type="text"
            placeholder="score"
            defaultValue={values?.highestscore}
            ref={highscore}
            required
          />
        </label>
        <label>
          Batting Average:
          <input
            type="text"
            placeholder="bat avg"
            defaultValue={values?.battingaverage}
            ref={batavg}
            required
          />
        </label>
        <label>
          Bowling Average:
          <input
            type="text"
            placeholder="bowl avg"
            defaultValue={values?.bowlingaverage}
            ref={bowlavg}
            required
          />
        </label>
        <label>
          Wickets:
          <input
            type="text"
            placeholder="wickets"
            defaultValue={values?.wickets}
            ref={wickets}
            required
          />
        </label>
        <label>
          Bowling economy:
          <input
            type="text"
            placeholder="economy"
            defaultValue={values?.bowlingeconomy}
            ref={bowleco}
            required
          />
        </label>
        <button type="submit" className="btn btn-primary m-3">
          Submit
        </button>
        <button type="reset" className="btn btn-primary">
          Reset
        </button>
      </form>
    </div>
  );
};

export default Form;
