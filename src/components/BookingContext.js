import React, { createContext, useReducer } from "react";

export const BookingContext = createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "begin-booking-process":
      return { ...state, status: "seat-selected" };
    default:
      return state;
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const beginBookingProcess = () => {
    dispatch({
      type: "begin-booking-process",
    });
  };

  return (
    <BookingContext.Provider value={{ state, beginBookingProcess }}>
      {children}
      {console.log(state.status)}
    </BookingContext.Provider>
  );
};
