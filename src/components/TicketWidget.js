import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";

import Seat from "./Seat";

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
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              <SeatsRow>
                {range(seatsPerRow).map((seatIndex) => {
                  const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                  const seat = state.seats[seatId];

                  return (
                    <Seat
                      key={seatId}
                      rowIndex={rowIndex}
                      seatIndex={seatIndex}
                      width={36}
                      height={36}
                      price={seat.price}
                      isBooked={state.bookedSeats[seatId]}
                    />
                  );
                })}
              </SeatsRow>
            </Row>
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

const Row = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const RowLabel = styled.div`
  font-weight: bold;
  width: 75px;
`;

const SeatsRow = styled.div`
  padding: 10px;
  background-color: #eee;
  border-bottom: 1px solid #ddd;
`;

export default TicketWidget;
