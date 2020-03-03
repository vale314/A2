import React from "react";
import ReactTable from "react-table-6";
import { Launcher } from "react-chat-window";

import { connect } from "react-redux";
import { loadUser, clearErrors } from "../actions/authActions";
import { setAlert } from "../actions/alertActions";
import { withRouter } from "react-router-dom";

// reactstrap components
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Button,
  CardTitle
} from "reactstrap";

class Home extends React.Component {
  _isMounted = true;
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      messageList: [],
      room: "",
      user: null
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadUser();
    // eslint-disable-next-line
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user != null) {
      this.setState({
        user: nextProps.user
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSubmit(e) {}

  onChange(e) {}

  render() {
    return (
      <>
        <div className="content">
          <Row md="12" className="ml-auto mr-auto mt-5">
            <Col md="12" className="ml-auto mr-auto mt-1">
              <Card>
                <CardBody className="text-center">
                  <CardTitle tag="h1">Bienvenido </CardTitle>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated,
  user: store.auth.user
});

export default connect(mapStateToProps, {
  loadUser,
  setAlert,
  clearErrors
})(withRouter(Home));
