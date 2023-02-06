import React, { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");

  function addNewTransaction(e) {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/transaction";
    const price = name.split(' ')[0];

    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ 
        price,
        name:name.substring(price.length+1), 
        description, 
        datetime
      })
    }).then(res => {
      res.json().then(json => {
        setName('');
        setDatetime('');
        setDescription('')
        console.log("result", json);
      });
    });
  }

  return (
    <main>
      <h1>$400</h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="-200 Dinner"
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={e => setDatetime(e.target.value)}
            placeholder="Date"
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="description"
          />
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        <div className="transaction">
          <div className="left">
            <div className="name"> Dinner cost</div>
            <div className="description"> It was a dinner</div>
          </div>
          <div className="right">
            <div className="price red">-$200</div>
            <div className="datetime">2022-02-12 5:03:23</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
