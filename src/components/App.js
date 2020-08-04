import React, { useContext, useEffect } from "react";

import GlobalStyles from "./GlobalStyles";
import { SeatContext } from "./SeatContext";

function App() {
  const {
    state,
    actions: { receiveSeatInfoFromServer },
  } = useContext(SeatContext);

  useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <GlobalStyles />
      TODO: write code
      {console.log(state.hasLoaded)}
    </>
  );
}

export default App;
