import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  const { addTransaction, transactions } = useContext(GlobalContext);
  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 10000000000),
      text,
      amount: +amount,
    };
    setText("");
    setAmount(0);
    addTransaction(newTransaction);
  };

  const loadSuggestions = ({ target: { value } }) => {
    const regex = new RegExp(`^${value}`, "i");
    setText(value);
    const result = value.length
      ? transactions.filter((v) => regex.test(v.text))
      : [];
    setSuggestions(result);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          {/* <label htmlFor="text">Text</label> */}
          <input
            type="text"
            value={text}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            onChange={(e) => {
              loadSuggestions(e);
            }}
            id="text"
            placeholder="Enter text..."
          />

          <ul>
            {suggestions.map((suggestion) => (
              <li key={suggestion.id}>{suggestion.text}</li>
            ))}
          </ul>
        </div>
        <div className="form-control">
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
