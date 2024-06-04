import { useEffect, useState } from "react";
import axios from "axios";
import { createStore } from "redux";

// Define the initial state
const initialState = {
  units: [],
  unitDetails: [],
};

// Define the reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_UNITS":
      return {
        ...state,
        units: action.payload,
      };
    case "SAVE_UNITS_DETAIL":
      return {
        ...state,
        units: action.payload,
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(reducer);
