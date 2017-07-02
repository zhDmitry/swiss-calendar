import React from "react";

import Calendar from "./containers/calendar.jsx";
import CalendarWrapper from "./containers/calendar-wrapper.jsx";
import { DAYS, cellsCount, unitsPerRange } from "./constants";
class App extends React.Component {

  render() {
    return (
      <CalendarWrapper>
        <Calendar days={DAYS} cellsCount={cellsCount} unitsPerRange={unitsPerRange}/>
      </CalendarWrapper>
    );
  }
}

export default App;
