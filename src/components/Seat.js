import React from "react";
import styled from "styled-components";

import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import seat from "../assets/seat-available.svg";

import { getRowName, getSeatNum } from "../helpers";

const Seat = ({ rowIndex, seatIndex, width, height, price, isBooked }) => {
  return (
    <Tippy
      content={`Row ${getRowName(rowIndex)}, Seat ${getSeatNum(
        seatIndex
      )} - $${price}`}
    >
      <Wrapper isBooked={isBooked} disabled={isBooked}>
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
