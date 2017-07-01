import React from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class Cell extends React.PureComponent {
  render() {
    const { store, range, day } = this.props;
    const selected = store.cellData.get(day).get(range);
    return (
      <td
        className={selected ? "selected" : ""}
        data-day={day}
        data-range={range}
      />
    );
  }
}

export default Cell;
