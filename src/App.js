/* eslint-disable no-unused-vars */
import React,{useState } from "react";
import "./App.css";

function App(){
  const [headline,setHeadline]=useState("");
  const [result,setResult]=useState("Enter Headline to display result.");
  const [loading,setLoading]=useState(false);

  const handleChange=(e) =>{
    setHeadline(e.target.value);
  };

  const predictSarcasm=async () =>{
    if (!headline){
      setResult("Please enter a headline.");
      return;
    }

    setLoading(true);
    try{
      const response=await fetch("https://sarcasm-detection-backend.onrender.com/predict",{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({text: headline }),
      });

      const result=await response.json();
      setResult(result.is_sarcastic ? "This headline is sarcastic." : "This headline is not sarcastic.");
    } catch (error){
      setResult("Error: Unable to process your request.");
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="heading">
        <h2>Check Your Sarcasm</h2>
      </div>
      <div className="app-container">
        <h2>Sarcasm Detection</h2>
        <div className="input-container">
          <label htmlFor="headline">Enter a Headline</label>
          <input
            type="text"
            id="headline"
            value={headline}
            onChange={handleChange}
            placeholder="Type your headline here"
            className="input-box"
          />
          <button onClick={predictSarcasm} className="detect-button">
          {loading ? "Checking..." : "Check Sarcasm"}
          </button>
        </div>
        <h2>Result</h2>
        <p className="result">{result}</p>
      </div>
    </div>
  );
}

export default App;
