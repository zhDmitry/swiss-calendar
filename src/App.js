import React from "react";
import {
  inject,
  observer,
  componentByNodeRegistery,
  propTypes
} from "mobx-react";
import Calendar from "./containers/calendar.jsx";
import { isBoxedObservable } from "mobx";

@inject("store")
class App extends React.Component {
  state = {
    result: ""
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { store } = this.props;
    return (
      <div>
        <div className="title">SET schedule</div>
        <br />
        <Calendar />
        <div className="buttons">
          <button
            className="button"
            type="button"
            onClick={() => {
              this.setState({
                result: store.save()
              });
            }}
          >
            Save Changes
          </button>
          <button
            className="button"
            type="button"
            onClick={() => {
              this.setState({
                result: ""
              });
              store.clear();
            }}
          >
            Clear
          </button>
        </div>
        <pre>
          <code>
            {this.state.result && JSON.stringify(this.state.result, null,2)}
          </code>
        </pre>
      </div>
    );
  }
}

export default App;
