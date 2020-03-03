import React from "react";
import { connect } from "react-redux";
import { login, clearErrors, loadUser } from "../actions/authActions";
import { setAlert } from "../actions/alertActions";
import { withRouter } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col
} from "reactstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: ""
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { isAuthenticated } = this.props;

    document.body.classList.toggle("login-page");

    this.props.loadUser();
    if (isAuthenticated) {
      this.props.history.push("/user/home");
    }
  }
  componentWillUnmount() {
    document.body.classList.toggle("login-page");
  }

  componentWillUpdate(nextProps, nextState) {}

  onChange(e) {
    const user = this.state.user;
    const name = e.target.name;
    user[name] = e.target.value;

    this.setState({
      user
    });
  }

  onSubmit = e => {
    const { isAuthenticated, error } = this.props;
    e.preventDefault();
    if (this.state.user.email === "" || this.state.user.password === "") {
      this.props.setAlert("Ingrese Email Y Contraseña", "danger", 3000);
    } else {
      const { email, password } = this.state.user;
      this.props.login({
        email,
        password
      });
      if (isAuthenticated) {
        this.props.history.push("/user/home");
      }
      if (error) {
        this.props.setAlert("Email Invalido O Contraseña", "danger", 3000);
        this.props.clearErrors();
      }
      if (error === undefined) {
        this.props.setAlert("Error En Servidor", "danger", 3000);
        this.props.clearErrors();
      }
    }
  };

  render() {
    return (
      <>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Form className="form" onSubmit={this.onSubmit}>
                <Card className="card-login card-white">
                  <CardHeader>
                    <img
                      alt="..."
                      src={require("../assets/img/card-primary.png")}
                    />
                    <CardTitle tag="h1">Log in</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="text"
                        name="email"
                        value={this.state.user.email}
                        onChange={this.onChange}
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-lock-circle" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={this.state.user.password}
                        onChange={this.onChange}
                      />
                    </InputGroup>
                  </CardBody>
                  <CardFooter>
                    <Button
                      block
                      className="mb-3"
                      color="primary"
                      href="#pablo"
                      onClick={this.onSubmit}
                      size="lg"
                    >
                      Ingresar
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <a
                          className="link footer-link"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          Crear Cuenta
                        </a>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link footer-link"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          ¿ Nesesitas Ayuda ?
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Container>
        </div>
      </>
    );
  }
}
const mapStateToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated,
  error: store.auth.error
});
export default connect(mapStateToProps, {
  setAlert,
  login,
  clearErrors,
  loadUser
})(withRouter(Login));
