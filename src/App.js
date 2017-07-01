import React from "react";
import { inject, observer } from "mobx-react";
import Calendar from "./components/CalendarContainer";

@inject("store")
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { store } = this.props;
    return (
      <div>
        <Calendar />
        <button className="button" type="button" onClick={()=>store.save()}>
          Save Changes
        </button>
        <button className="button" type="button" onClick={()=>store.clear()}>
          Clear
        </button>
      </div>
    );
  }
}

export default App;
