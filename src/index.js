import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import "./index.css";
import App from "./App";
import Store from "./store/index";
import registerServiceWorker from "./registerServiceWorker";
import { DAYS, cellsCount, unitsPerRange } from "./constants";

const defaultData = DAYS.reduce((acc, el) => {
  acc[el.key] = [];
  return acc;
}, {});

const store = new Store({
  initialState: defaultData,
  cellsCount,
  days: DAYS,
  unitsPerRange
});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
