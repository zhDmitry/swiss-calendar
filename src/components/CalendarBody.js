import React from "react";
import PropTypes from "prop-types";
import Cell from "./Cell";
import { DAYS, minutesPerRange , cellsCount} from "../constants";

const emptyArray = new Array(cellsCount).fill(0);
const CalendarBody = ({ init, onMouseMove, onMouseDown }) => {
  return (
    <tbody ref={init} onMouseMove={onMouseMove} onMouseDown={onMouseDown}>
      {DAYS.map((m, k) => {
        return (
          <tr key={k}>
            {emptyArray.map((el, i) => {
              const start = i * minutesPerRange + minutesPerRange;
              const end = (i + 1) * minutesPerRange;
              return <Cell key={i} day={m.key} range={start} />;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default CalendarBody;
