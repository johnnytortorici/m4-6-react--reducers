import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import seat from "../assets/seat-available.svg";
import { SeatContext } from "./SeatContext";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";

const TicketWidget = () => {
  // use values from Context
  const { state } = useContext(SeatContext);
  const numOfRows = state.numOfRows;
  const seatsPerRow = state.seatsPerRow;

  if (!state.hasLoaded)
    return (
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    );
  else
    return (
      <Wrapper>
        {range(numOfRows).map((rowIndex) => {
          const rowName = getRowName(rowIndex);

          return (
            <Rows>
              <RowLabel>Row {rowName}</RowLabel>
              <Row key={rowIndex}>
                {range(seatsPerRow).map((seatIndex) => {
                  const seatId = `${rowName}-${getSeatNum(seatIndex)}`;

                  return (
                    <Tippy
                      content={`Row ${rowName}, Seat ${getSeatNum(
                        seatIndex
                      )} - $${state.seats[seatId].price}`}
                    >
                      <SeatWrapper key={seatId}>
                        <Seat
                          src={seat}
                          alt="Seat"
                          isBooked={state.bookedSeats[seatId]}
                        />
                      </SeatWrapper>
                    </Tippy>
                  );
                })}
              </Row>
            </Rows>
          );
        })}
      </Wrapper>
    );
};

const Wrapper = styled.div`
  height: 100vh;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Rows = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background: #eee;
  border-bottom: 1px solid #ddd;
`;

const RowLabel = styled.div`
  font-weight: bold;
  width: 75px;
`;

const SeatWrapper = styled.button`
  padding: 5px;
  border: none;
  cursor: pointer;
`;

const Seat = styled.img`
  ${(prop) => prop.isBooked && "filter: grayscale(100%)"};
  padding: 5px;
`;

export default TicketWidget;
