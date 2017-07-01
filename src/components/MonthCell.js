import React from "react";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class Cell extends React.Component {
 
  render() {
    const { store, day } = this.props;
    const selected = store.cellStatus[day.key].touched;
    return (
      <td className={selected ? "selected" : ""}>
        {day.title}
      </td>
    );
  }
}

export default Cell;
