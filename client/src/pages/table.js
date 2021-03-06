import React, { Fragment } from "react";
import ReactTable from "react-table-6";
import { loadUser, clearErrors } from "../actions/authActions";
import { setAlert } from "../actions/alertActions";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

import jsPDF from "jspdf";

import axios from "axios";

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
  CardTitle,
  CardHeader,
  NavItem,
  NavLink,
  Nav
} from "reactstrap";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      pageTabs: ""
    };

    if (
      props.location.edificios === [] ||
      props.location.edificios === undefined
    ) {
      props.location.edificios = [];
    }

    this.changeActiveTab = this.changeActiveTab.bind(this);
    this.saveDocument = this.saveDocument.bind(this);
    this.saveDocumentCorrect = this.saveDocumentCorrect.bind(this);
    this.saveAll = this.saveAll.bind(this);
  }

  componentDidMount() {
    const { array_json, errors } = this.props.location.state;
    this.props.loadUser();
    // eslint-disable-next-line
    this.setState({
      array_json,
      errors
    });
  }

  saveAll() {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const { edificios, array_json } = this.props.location.state;
    const { text } = this.props;

    if (array_json === []) {
      setAlert("No Se Encuentran Registros", "danger", 3000);
    }

    axios
      .post(
        "/api/register",
        { array_json: array_json, edificios: edificios, text: text },
        config
      )
      .then(res => {
        setAlert("Correctamente", "success", 3000);
      })
      .catch(err => {
        setAlert("Error Server", "danger", 3000);
      });
  }

  changeActiveTab = (e, tabState, tadName) => {
    e.preventDefault();
    this.setState({
      [tabState]: tadName
    });
  };

  saveDocument() {
    const { errors } = this.props.location.state;
    const { name_atributes } = this.props.location.state;

    var doc = new jsPDF();

    doc.text(20, 20, "Reporte");

    var numberx = 45;
    var numbery = 60;

    var incrementox = 45;
    var incrementoy = 10;

    name_atributes.map((i, page) => {
      doc.text(40, 40, i);

      errors.map(j => {
        if (i === "profesor" || i === "materia" || i === "departamento") {
          numberx = 35;
          numbery = numbery + incrementoy;
        } else {
          if (numberx > 180) {
            numberx = incrementox;
            numbery = numbery + incrementoy;
          }
        }
        if (numbery >= 220) {
          doc.addPage();
          //reset
          numberx = 45;
          numbery = numbery = 60;
        }
        doc.text(numberx, numbery, j[i]);
        numberx = numberx + numberx;
      });
      doc.addPage();
      //reset
      numberx = 45;
      numbery = 60;
    });

    doc.save("Test.pdf");
  }

  saveDocumentCorrect() {
    const { pageTabs } = this.state;
    const { array_json } = this.props.location.state;
    const { name_atributes } = this.props.location.state;

    var doc = new jsPDF();

    doc.text(20, 20, "Reporte");

    var numberx = 45;
    var numbery = 60;

    var incrementox = 45;
    var incrementoy = 10;

    name_atributes.map(i => {
      doc.text(40, 40, i);

      array_json[pageTabs].map(j => {
        if (i === "profesor" || i === "materia" || i === "departamento") {
          numberx = 35;
          numbery = numbery + incrementoy;
        } else {
          if (numberx > 180) {
            numberx = incrementox;
            numbery = numbery + incrementoy;
          }
        }
        if (numbery >= 220) {
          doc.addPage();
          //reset
          numberx = 45;
          numbery = numbery = 60;
        }
        doc.text(numberx, numbery, j[i]);
        numberx = numberx + numberx;
      });
      doc.addPage();
      //reset
      numberx = 45;
      numbery = 60;
    });

    doc.save("Test.pdf");
  }

  render() {
    const { errors } = this.props.location.state;

    const { edificios, array_json } = this.props.location.state;
    return (
      <div className="content">
        <Row md="12" className="ml-auto mr-auto mt-5">
          <Col md="5" className="ml-auto mr-auto mt-1">
            <Card>
              <CardBody className="text-center">
                <CardTitle tag="h1"> Informacion </CardTitle>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row md="12" className="ml-auto mr-auto mt-5">
          <Col md="12" className="ml-auto mr-auto mt-1">
            <CardTitle tag="h3"> Errores </CardTitle>
            <ReactTable
              data={errors}
              filterable
              resizable={false}
              columns={[
                {
                  Header: "NRC",
                  accessor: "nrc"
                },
                {
                  Header: "Clave",
                  accessor: "clave"
                },
                {
                  Header: "Seccion",
                  accessor: "secc"
                },
                {
                  Header: "Departamento",
                  accessor: "departamento"
                },
                {
                  Header: "Materia",
                  accessor: "materia"
                },
                {
                  Header: "Edificio",
                  accessor: "edificio"
                },
                {
                  Header: "Aula",
                  accessor: "aula"
                },
                {
                  Header: "Error",
                  accessor: "err"
                },
                {
                  Header: "Actions",
                  Cell: row => (
                    <div>
                      <Button
                        className="btn-fill"
                        color="primary"
                        type="submit"
                      >
                        Modificar
                      </Button>
                    </div>
                  )
                }
              ]}
              defaultPageSize={5}
              showPaginationTop
              showPaginationBottom={false}
              className="-striped -highlight"
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md="1" className="ml-auto mr-auto">
            <Button
              className="btn-fill"
              color="primary"
              type="submit"
              onClick={this.saveDocument}
            >
              Save Document
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md="1" className="ml-auto mr-auto">
            <Button
              className="btn-fill"
              color="primary"
              type="submit"
              onClick={this.saveAll}
            >
              Save All
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="ml-auto mr-auto" md="8">
            <Card className="card-plain card-subcategories">
              <CardHeader>
                <CardTitle className="text-center mt-5" tag="h4">
                  Page Subcategories
                </CardTitle>
                <br />
              </CardHeader>
              <CardBody>
                {/* color-classes: "nav-pills-primary", "nav-pills-info", "nav-pills-success", "nav-pills-warning","nav-pills-danger" */}
                <Nav
                  className="nav-pills-info nav-pills-icons justify-content-center"
                  pills
                >
                  {edificios.map(i => (
                    <NavItem>
                      <NavLink
                        data-toggle="tab"
                        href="#pablo"
                        className={
                          this.state.pageTabs === i.edificio ? "active" : ""
                        }
                        onClick={e =>
                          this.changeActiveTab(e, "pageTabs", i.edificio)
                        }
                      >
                        <i className="tim-icons icon-heart-2" />
                        {i.edificio} : {array_json[i.edificio].length}
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {this.state.pageTabs === "" ? (
          <Fragment></Fragment>
        ) : (
          <div>
            <Row md="12" className="ml-auto mr-auto mt-5">
              <Col md="12" className="ml-auto mr-auto mt-1">
                <CardTitle tag="h3"> {this.state.pageTabs} </CardTitle>
                <ReactTable
                  data={array_json[this.state.pageTabs]}
                  filterable
                  resizable={false}
                  columns={[
                    {
                      Header: "NRC",
                      accessor: "nrc"
                    },
                    {
                      Header: "Clave",
                      accessor: "clave"
                    },
                    {
                      Header: "Seccion",
                      accessor: "secc"
                    },
                    {
                      Header: "Departamento",
                      accessor: "departamento"
                    },
                    {
                      Header: "Materia",
                      accessor: "materia"
                    },
                    {
                      Header: "Edificio",
                      accessor: "edificio"
                    },
                    {
                      Header: "Aula",
                      accessor: "aula"
                    },
                    {
                      Header: "Actions",
                      Cell: row => (
                        <div>
                          <Button
                            className="btn-fill"
                            color="primary"
                            type="submit"
                          >
                            Modificar
                          </Button>
                        </div>
                      )
                    }
                  ]}
                  defaultPageSize={5}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md="1" className="ml-auto mr-auto">
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  onClick={this.saveDocumentCorrect}
                >
                  Save Document
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated,
  user: store.auth.user,
  text: store.text.text
});

export default connect(mapStateToProps, {
  loadUser,
  setAlert,
  clearErrors
})(withRouter(Table));
