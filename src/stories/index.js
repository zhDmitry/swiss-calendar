// THIS CODE WAS WRITTEN FOR SAMLE AND IT IS NOT FOR USE

import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import Welcome from "./Welcome";
import Calendar from "../containers/calendar.jsx";
import CalendarWrapper from "../containers/calendar-wrapper.jsx";
import { Provider } from "mobx-react";
import Store from "../store/index";
import Mobx from "./Mobx";
import { DAYS, cellsCount, unitsPerRange } from "../constants";
import { enumerateDaysBetweenDates } from "../utils";

import moment from "moment";
import "../index.css";
const defaultData = DAYS.reduce((acc, el) => {
  acc[el.key] = [];
  return acc;
}, {});
const daysRange = enumerateDaysBetweenDates(
  moment(),
  moment().add(31, "days")
).map(el => ({ title: el, key: el }));
const daysRange2 = enumerateDaysBetweenDates(
  moment(),
  moment().add(90, "days")
).map(el => ({ title: el, key: el }));

const store = new Store({
  initialState: defaultData,
  cellsCount,
  days: DAYS,
  unitsPerRange
});
const store2 = new Store({
  initialState: defaultData,
  cellsCount: 48,
  days: DAYS,
  unitsPerRange: 30
});
const defaultData3 = daysRange.reduce((acc, el) => {
  acc[el.key] = [];
  return acc;
}, {});
const store3 = new Store({
  initialState: defaultData3,
  cellsCount: 48,
  days: daysRange,
  unitsPerRange: 30
});
const defaultData4 = daysRange2.reduce((acc, el) => {
  acc[el.key] = [];
  return acc;
}, {});
const store4 = new Store({
  initialState: defaultData4,
  cellsCount: 200,
  days: daysRange2,
  unitsPerRange: 1
});
storiesOf("Welcome", module).add("to Storybook", () =>
  <Welcome showApp={linkTo("Calendar")} />
);

storiesOf("Calendar", module)
  .addDecorator(Mobx)
  .add("Hours", () =>
    <Provider store={store}>
      <CalendarWrapper>
        <Calendar
          days={DAYS}
          cellsCount={cellsCount}
          unitsPerRange={unitsPerRange}
        />
      </CalendarWrapper>
    </Provider>
  )
  .add("Minutes", () =>
    <Provider store={store2}>
      <CalendarWrapper>
        <Calendar
          days={DAYS}
          cellsCount={48}
          unitsPerRange={30}
          renderHeader={(i, minutes) => {
            const d = i % 3 === 0;
            const time = moment.duration(minutes, "minutes").hours();
            const h = time >= 10 ? time : "0" + time;
            console.log(i, d, time, minutes);
            return (
              <th className={d ? "border-left" : ""} key={i}>
                <div>
                  {d ? h + ":00" : ""}
                </div>
                <div style={{ height: 17 }} />
              </th>
            );
          }}
        />
      </CalendarWrapper>
    </Provider>
  )
  .add("Minutes add different resources", () =>
    <Provider store={store3}>
      <CalendarWrapper>
        <Calendar
          days={daysRange}
          cellsCount={48}
          unitsPerRange={30}
          renderHeader={(i, minutes) => {
            const d = i % 3 === 0;
            const time = moment.duration(minutes, "minutes").hours();
            const h = time >= 10 ? time : "0" + time;
            console.log(i, d, time, minutes);
            return (
              <th className={d ? "border-left" : ""} key={i}>
                <div>
                  {d ? h + ":00" : ""}
                </div>
                <div style={{ height: 17 }} />
              </th>
            );
          }}
        />
      </CalendarWrapper>
    </Provider>
  )
  .add("big Data", () =>
    <Provider store={store4}>
      <CalendarWrapper>
        <div
          style={{
            overflow: "scroll",
            width: 900,
            height: 900,
            padding: 20
          }}
        >
          <Calendar days={daysRange2} cellsCount={200} unitsPerRange={1} />
        </div>
      </CalendarWrapper>
    </Provider>
  );
