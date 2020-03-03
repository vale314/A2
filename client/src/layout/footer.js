import React, { Fragment } from "react";
import { Container, Button } from "reactstrap";
import musicaCasino from "../assets/musica/musicaCasino.mp3";

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      muted: true
    };

    this.clickMuted = this.clickMuted.bind(this);
  }

  clickMuted(e) {
    e.preventDefault();
    this.setState({
      muted: !this.state.muted
    });
  }

  render() {
    const { muted } = this.state;
    console.log();
    return (
      <Fragment>
        <Button
          className="btn d-block"
          style={{
            zIndex: 9999,
            position: "fixed",
            left: "2rem",
            bottom: "2.5rem",
            background: "#b0750e"
          }}
          onClick={e => this.clickMuted(e)}
        >
          <i className="tim-icons icon-triangle-right-17" />
        </Button>
        <audio src={musicaCasino} loop autoPlay muted={muted}></audio>
        <footer
          className={"footer" + (this.props.default ? " footer-default" : "")}
        >
          <Container fluid={this.props.fluid ? true : false}>
            <ul className="nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  target="_blank"
                  href="https://github.com/vale314/A2"
                >
                  Terminos
                </a>
              </li>{" "}
              <li className="nav-item">
                <a
                  className="nav-link"
                  target="_blank"
                  href="https://github.com/vale314/A2"
                >
                  Soporte
                </a>
              </li>{" "}
              <li className="nav-item">
                <a
                  className="nav-link"
                  target="_blank"
                  href="https://github.com/vale314/A2"
                >
                  Contacto
                </a>
              </li>
            </ul>
            <div className="copyright">
              © {new Date().getFullYear()} Creado Por{" "}
              <i className="tim-icons icon-heart-2" /> by{" "}
              <a href="https://github.com/vale314/A2" target="_blank">
                Equipo Trabajo
              </a>{" "}
              Para Web
            </div>
          </Container>
        </footer>
      </Fragment>
    );
  }
}

export default Footer;
