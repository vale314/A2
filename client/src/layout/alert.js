import React from "react";
import { connect } from "react-redux";
import { removeAlert } from "../actions/alertActions";

const Alert = ({ alerts, removeAlert }) => {
  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div
        key={alert.id}
        className={`alert alert-${alert.type} alert-dismissible show`}
      >
        <i className="fas fa-info-circle" /> {alert.msg}
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={e => {
            removeAlert(alert.id);
          }}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    ))
  );
};

const mapStateToProps = store => {
  return {
    alerts: store.alert
  };
};

export default connect(mapStateToProps, { removeAlert })(Alert);
