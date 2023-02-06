import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([])


  useEffect(()=>{
    getTransactions().then(transactions => {
      setTransactions(transactions);
    })
  },[])

  async function getTransactions(){
    const url = process.env.REACT_APP_API_URL + "/transactions"; // getting from mongo
    const res = await fetch(url) // get is default for fetch
    return await res.json();    
  }

  function addNewTransaction(e) {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/transaction";

    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ 
        price,
        name, 
        description, 
        datetime
      })
    }).then(res => {
      res.json().then(json => {
        setName('');
        setDatetime('');
        setDescription('')
        setPrice('')
        console.log("result", json);
      });
    });
  }

  let balance = 0;
  for(const transaction of transactions){
    balance = balance + transaction.price;
  }
  balance = balance.toFixed(2)

  return (
    <main>
      <h1>₹{balance}</h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Example: Dinner"
          />
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="Example: -200" required
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Note"
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={e => setDatetime(e.target.value)}
            placeholder="Date"
          />
        </div>
        <button type="submit">Add new transaction</button>
      </form>

      <div className="transactions">
        {transactions.length > 0 && transactions.map(transaction => (
          <div className="transaction">
          <div className="left">
            <div className="name"> {transaction.name}</div>
            <div className="description"> {transaction.description}</div>
          </div>
          <div className="right">
            <div className={"price " + (transaction.price<0?'red':'green')}>{transaction.price}</div>
            <div className="datetime">{transaction.datetime}</div>
          </div>
        </div>
        ))}
        
      </div>

    </main>
  );
}

export default App;
