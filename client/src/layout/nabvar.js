import React from "react";
import { withRouter } from "react-router-dom";

import { logout } from "../actions/authActions";
import { connect } from "react-redux";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

class navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      site: ""
    };

    this.onClickRoute = this.onClickRoute.bind(this);
  }

  componentDidMount() {
    const pathname = this.props.history.location.pathname;

    var n = pathname.indexOf("admin");

    if (n > 0) {
      return this.setState({
        site: "admin"
      });
    }

    n = pathname.indexOf("user");
    if (n > 0) {
      return this.setState({
        site: "user"
      });
    }
    return this.setState({
      site: ""
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.componentDidMount();
    }
  }

  onClickRoute(e, link) {
    e.preventDefault();
    switch (link) {
      case "/":
        this.props.history.push({
          pathname: "/"
        });
        break;
      case "/login":
        this.props.history.push({
          pathname: "/login"
        });
        break;
      case "/register":
        this.props.history.push({
          pathname: "/register"
        });
        break;
      case "/admin/home":
        this.props.history.push({
          pathname: "/admin/home"
        });
        break;
      case "/admin/logout":
        this.props.history.push({
          pathname: "/"
        });
        localStorage.removeItem("tokenUser");
        break;
      case "/user/logout":
        this.setState({
          site: ""
        });
        localStorage.removeItem("tokenUser");
        this.props.logout();

        this.props.history.push({
          pathname: "/login"
        });
        break;
      case "/user/home":
        this.props.history.push({
          pathname: "/user/home"
        });
        break;
      case "/user/single":
        this.props.history.push({
          pathname: "/user/single"
        });
        break;
      case "/user/ganadores":
        this.props.history.push({
          pathname: "/user/ganadores"
        });
        break;
      default:
        break;
    }
  }

  render() {
    const { isOpen, site } = this.state;
    if (site === "" || site == null) {
      return (
        <div>
          <Navbar expand="md">
            <NavbarBrand onClick={e => this.onClickRoute(e, "/")}>
              <i
                className="letraCursiva"
                style={{
                  color: "#FFFFFF",
                  cursor: "pointer"
                }}
              >
                Home
              </i>
            </NavbarBrand>
            <NavbarToggler />
            <Collapse isOpen={true} navbar>
              <Nav className="mr-auto" navbar style={{ cursor: "default" }}>
                <NavItem>
                  <NavLink
                    onClick={e => this.onClickRoute(e, "/login")}
                    style={{
                      color: "#FFFFFF",
                      cursor: "pointer"
                    }}
                  >
                    <i className="letraCursiva">Login</i>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    onClick={e => this.onClickRoute(e, "/register")}
                    style={{
                      color: "#FFFFFF",
                      cursor: "pointer"
                    }}
                  >
                    <i className="letraCursiva">Signup</i>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="https://github.com/vale314/A2"
                    target="_blank"
                    style={{
                      color: "#FFFFFF",
                      cursor: "pointer"
                    }}
                  >
                    <i className="letraCursiva">GitHub</i>
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
    if (site === "admin") {
      return (
        <div>
          <Navbar color="light" light expand="md" style={{ cursor: "default" }}>
            <NavbarBrand onClick={e => this.onClickRoute(e, "/admin/home")}>
              Admin
            </NavbarBrand>
            <NavbarToggler />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink
                    onClick={e => this.onClickRoute(e, "/admin/peliculas")}
                  >
                    Ingresar
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={e => this.onClickRoute(e, "/admin/dulces")}>
                    Consultar
                  </NavLink>
                </NavItem>
              </Nav>
              <NavLink onClick={e => this.onClickRoute(e, "/admin/logout")}>
                Logout
              </NavLink>
            </Collapse>
          </Navbar>
        </div>
      );
    }
    if (site === "user") {
      return (
        <div>
          <Navbar color="light" light expand="md" style={{ cursor: "default" }}>
            <NavbarBrand onClick={e => this.onClickRoute(e, "/user/home")}>
              Home
            </NavbarBrand>
            <NavbarToggler />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink onClick={e => this.onClickRoute(e, "/user/single")}>
                    Game
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    onClick={e => this.onClickRoute(e, "/user/ganadores")}
                  >
                    Ganadores
                  </NavLink>
                </NavItem>
              </Nav>
              <NavLink
                style={{ marginLeft: "auto" }}
                onClick={e => this.onClickRoute(e, "/user/logout")}
              >
                Logout
              </NavLink>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }
}

export default connect(null, {
  logout
})(withRouter(navbar));
