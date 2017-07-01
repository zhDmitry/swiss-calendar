import React, { Component } from "react";
import { inject } from "mobx-react";
import CalendarBody from "./CalendarBody";
import AllDayCell from "./AllDayCell";
import MonthCell from "./MonthCell";
import { DAYS, cellsCount } from "../constants";

const shouldRenderHours = i => i % 3 === 0;

const parseRangeFromAttr = el => {
  const str = el.getAttribute("data-range");
  return Number(str);
};

@inject("store")
class App extends Component {
  x1 = 0;
  y1 = 0;
  x2 = 0;
  y2 = 0;
  reCalc() {
    let x3 = Math.min(this.x1, this.x2);
    let x4 = Math.max(this.x1, this.x2);
    let y3 = Math.min(this.y1, this.y2);
    let y4 = Math.max(this.y1, this.y2);
    this.selectionDiv.style.left = x3 + "px";
    this.selectionDiv.style.top = y3 + "px";
    this.selectionDiv.style.width = x4 - x3 + "px";
    this.selectionDiv.style.height = y4 - y3 + "px";
  }
  onMouseDown = e => {
    this.isMousePressed = true;
    this.selectionDiv.hidden = 0;
    this.x1 = e.clientX;
    this.y1 = e.clientY;
    this.reCalc();
  };
  onMouseMove = e => {
    this.x2 = e.clientX;
    this.y2 = e.clientY;
    this.reCalc();
  };
  onMouseUp = e => {
    const startElem = document.elementFromPoint(this.x2, this.y2);
    const endElem = document.elementFromPoint(this.x1, this.y1);
    const r1 = parseRangeFromAttr(startElem);
    const r2 = parseRangeFromAttr(endElem);
    const max = Math.max(r1, r2);
    const min = Math.min(r1, r2);
    const day1 = startElem.getAttribute("data-day");
    const day2 = endElem.getAttribute("data-day");

    this.props.store.addRange({
      start: min,
      end: max,
      startDay: day1,
      endDay: day2
    });
  };
  componentDidMount() {
    window.onmouseup = e => {
      if (this.isMousePressed) {
        this.onMouseUp(e);
      }
      this.selectionDiv.hidden = 1;
      this.isMousePressed = false;
    };
  }
  renderHeader(i) {
    const h = i > 10 ? i : "0" + i;
    const displayHours = shouldRenderHours(i);
    return (
      <th className={displayHours ? "border-left" : ""} key={i}>
        <div>
          {shouldRenderHours(i) ? h + ":00" : ""}
        </div>
        <div style={{ height: 17 }} />
      </th>
    );
  }
  renderBodyHeader() {
    const res = [];
    for (let i = 0; i < cellsCount; i++) {
      const elem = this.renderHeader(i);
      res.push(elem);
    }
    return res;
  }
  renderMonths() {
    return (
      <tbody>
        {DAYS.map(el =>
          <tr key={el.key}>
            <MonthCell day={el} />
            <AllDayCell day={el} />
          </tr>
        )}
      </tbody>
    );
  }
  render() {
    return (
      <div>
        <div ref={r => (this.selectionDiv = r)} id="selection" hidden />
        <table style={{ display: "inline" }} className="calendar-header">
          <thead>
            <tr>
              <th />
              <th>All day</th>
            </tr>
          </thead>
          {this.renderMonths()}
        </table>
        <table style={{ display: "inline" }} className="calendar-body">
          <thead>
            <tr>
              {this.renderBodyHeader()}
            </tr>
          </thead>
          <CalendarBody
            init={r => (this.table = r)}
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
          />
        </table>
      </div>
    );
  }
}

export default App;
