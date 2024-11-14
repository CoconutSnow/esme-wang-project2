import React from "react";
import PropTypes from "prop-types";

import "./style.css";

class Cell extends React.Component {
  getValue() {
    const { value } = this.props;

    if (!value.isRevealed) {
      return value.isFlagged ? "🚩" : null;
    } else if (value.isMine) {
      return "💣";
    } else if (value.isEmpty) {
      return "";
    }

    return value.n || null;
  }

  render() {
    const { value } = this.props;
    let classNames = ["cell"];

    if (value.isRevealed) {
      classNames.push("");
    } else {
      classNames.push("hidden");
    }
    if (value.isMine) classNames.push("is-mine");
    if (value.isClicked) classNames.push("is-clicked");
    if (value.isEmpty) classNames.push("is-empty");
    if (value.isUnknown) classNames.push("is-unknown");
    if (value.isFlagged) classNames.push("is-flag");

    return (
      <div
        className={classNames.join(" ")}
        onClick={this.props.onClick}
        onContextMenu={this.props.cMenu}
      >
        {this.getValue()}
      </div>
    );
  }
}

const cellItemShape = {
  x: PropTypes.number,
  y: PropTypes.number,
  n: PropTypes.number,
  isRevealed: PropTypes.bool,
  isMine: PropTypes.bool,
  isFlagged: PropTypes.bool,
  isEmpty: PropTypes.bool,
  isClicked: PropTypes.bool,
  isUnknown: PropTypes.bool
};

Cell.propTypes = {
  value: PropTypes.shape(cellItemShape).isRequired,
  onClick: PropTypes.func.isRequired,
  cMenu: PropTypes.func.isRequired
};

export default Cell;