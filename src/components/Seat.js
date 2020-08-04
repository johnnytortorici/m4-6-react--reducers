import React, { useContext } from "react";
import styled from "styled-components";

import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import seat from "../assets/seat-available.svg";

import { getRowName, getSeatNum } from "../helpers";
import { BookingContext } from "./BookingContext";

const Seat = ({ rowIndex, seatIndex, width, height, price, isBooked }) => {
  const { beginBookingProcess } = useContext(BookingContext);

  return (
    <Tippy
      content={`Row ${getRowName(rowIndex)}, Seat ${getSeatNum(
        seatIndex
      )} - $${price}`}
    >
      <Wrapper
        isBooked={isBooked}
        disabled={isBooked}
        onClick={beginBookingProcess}
      >
        <SeatImg src={seat} alt="Seat" width={width} height={height} />
      </Wrapper>
    </Tippy>
  );
};

const Wrapper = styled.button`
  border: none;
  cursor: pointer;
  ${(prop) => prop.isBooked && "filter: grayscale(100%)"};

  &:disabled {
    cursor: not-allowed;
  }
`;

const SeatImg = styled.img`
  width: ${(prop) => prop.width};
  height: ${(prop) => prop.height};
`;

export default Seat;
