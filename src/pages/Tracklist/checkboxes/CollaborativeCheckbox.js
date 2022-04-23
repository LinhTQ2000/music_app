import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CollaborativeCheckbox extends Component {
  handleOnChange = () => {
    const { collaborative, changePlaylistDetails, isPublic } = this.props;
    if (isPublic) {
      return;
    }
    changePlaylistDetails({
      collaborative: !collaborative,
    });
  };

  handleOnClick = (e) => {
    if (this.props.isPublic) {
      e.target.checked = false;
    }
  };

  render() {
    const { collaborative, isPublic } = this.props;
    return (
      <>
        <input
          className={`checkbox ${isPublic ? "checkbox__disabled" : ""}`}
          type="checkbox"
          defaultChecked={collaborative}
          onChange={this.handleOnChange}
          onClick={this.handleOnClick}
        />
        <label>Collaborative</label>
      </>
    );
  }
}

CollaborativeCheckbox.propTypes = {
  isPublic: PropTypes.bool.isRequired,
  collaborative: PropTypes.bool.isRequired,
  changePlaylistDetails: PropTypes.func.isRequired,
};
