import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

//Inital state
const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

const API_EXPENSES = "http://localhost:5000";

// Create context
export const GlobalContext = createContext(initialState);

// Provider componet
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  // Actions
  async function getTransactions() {
    try {
      const res = await axios.get(`${API_EXPENSES}/api/v1/transactions`);
      console.log(res);
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  // Actions
  async function deleteTransaction(id) {
    try {
      await axios.delete(`${API_EXPENSES}/api/v1/transactions/${id}`);

      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        `${API_EXPENSES}/api/v1/transactions`,
        transaction,
        config
      );

      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }

    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
        getTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
