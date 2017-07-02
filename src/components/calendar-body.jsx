import React from "react";
import PropTypes from "prop-types";
import Cell from "./cell.jsx";

const CalendarBody = ({ init, onMouseMove, onMouseDown, emptyArray, days, unitsPerRange }) => {
  return (
    <tbody ref={init} onMouseMove={onMouseMove} onMouseDown={onMouseDown}>
      {days.map((m, k) => {
        return (
          <tr key={k}>
            {emptyArray.map((el, i) => {
              const start = i * unitsPerRange + unitsPerRange;
              return <Cell key={i} day={m.key} range={start} />;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default CalendarBody;
