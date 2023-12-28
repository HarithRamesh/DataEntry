import React, { useRef } from "react";
import axios from "axios";
import md5 from "md5";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./Form.css";
import { render } from "@testing-library/react";

function Form() {
  let name = useRef<HTMLInputElement>(null);
  let age = useRef<HTMLInputElement>(null);
  let match = useRef<HTMLInputElement>(null);
  let highscore = useRef<HTMLInputElement>(null);
  let batavg = useRef<HTMLInputElement>(null);
  let bowlavg = useRef<HTMLInputElement>(null);
  let wickets = useRef<HTMLInputElement>(null);
  let bowleco = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const playerData = {
      playerId: md5(name.current?.value.toLowerCase() as any),
      name: name.current?.value,
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
      .post("http://localhost:7000/insert/player", postData)
      .then((res) => {
        if (res.status === 200) {
          toast.success("saved successfully", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });
        } else {
          toast.error("Failed to save the data", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });
        }
      })
      .catch((err) => {
        toast.error("Failed to save the data", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
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
          <input type="text" placeholder="name" ref={name} required />
        </label>
        <label>
          Age:
          <input type="text" placeholder="age" ref={age} required />
        </label>
        <label>
          Match:
          <input type="text" placeholder="match" ref={match} required />
        </label>
        <label>
          Highest Score:
          <input type="text" placeholder="score" ref={highscore} required />
        </label>
        <label>
          Batting Average:
          <input type="text" placeholder="bat avg" ref={batavg} required />
        </label>
        <label>
          Bowling Average:
          <input type="text" placeholder="bowl avg" ref={bowlavg} required />
        </label>
        <label>
          Wickets:
          <input type="text" placeholder="wickets" ref={wickets} required />
        </label>
        <label>
          Bowling economy:
          <input type="text" placeholder="economy" ref={bowleco} required />
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
}

export default Form;
