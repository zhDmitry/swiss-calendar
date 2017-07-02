import React from "react";
import { Provider } from "mobx-react";
import store from "../store/index";

export default story =>
  <Provider store={store}>
    {story()}
  </Provider>;
