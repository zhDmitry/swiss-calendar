import React from "react";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class Cell extends React.PureComponent {
  render() {
    const { store, day } = this.props;
    const selected = store.cellStatus[day.key].all;
    return (
      <td
        className={selected ? "selected" : ""}
        onClick={() => store.toggleAllDay(day.key)}
      />
    );
  }
}

export default Cell;
