import React, { Fragment } from "react";
import ReactTable from "react-table-6";
import { Launcher } from "react-chat-window";

import { connect } from "react-redux";
import { loadUser, clearErrors } from "../actions/authActions";
import { setAlert } from "../actions/alertActions";
import { withRouter } from "react-router-dom";

import jsPDF from "jspdf";

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
  CardHeader
} from "reactstrap";
import { SET_ALERT } from "../actions/types";

class Home extends React.Component {
  _isMounted = true;
  array_json = [];
  baseState = null;
  constructor(props) {
    super(props);

    this.state = {
      text: null,
      array_json: [],
      name_atributes: [
        "nrc",
        "st",
        "departamento",
        "area",
        "clave",
        "materia",
        "edificio",
        "aula",
        "profesor"
      ],
      atributes: {
        nrc: null,
        st: null,
        departamento: null,
        area: null,
        clave: null,
        materia: null,
        edificio: null,
        aula: null,
        profesor: null
      },
      edificios: {},
      aulas: [],
      errors: [],
      loading: ""
    };

    this.iterateObject = this.iterateObject.bind(this);
    this.viewRender = this.viewRender.bind(this);
    this.algortitmo = this.algortitmo.bind(this);
    this.saveDocument = this.saveDocument.bind(this);
    this.acomodar = this.acomodar.bind(this);
    this.finder = this.finder.bind(this);
  }

  componentDidMount() {
    //this.props.loadUser();
    // eslint-disable-next-line

    this.baseState = this.state;
  }

  showFile = async e => {
    e.preventDefault();
    this.setState(this.baseState);
    this.array_json = [];
    const reader = new FileReader();
    reader.onload = async e => {
      this.setState({
        text: e.target.result,
        array_json: []
      });
    };
    try {
      reader.readAsText(e.target.files[0]);
      this.setState({ loading: "Cargando Document" });
    } catch (error) {
      this.setState(this.baseState);
      setAlert("Error Not Such File", "danger");
    }
  };

  componentWillUpdate(nextProps, nextState) {
    const { text } = nextState;
    if (this.state.text !== nextState.text) {
      var aux = "";
      var text1 = text;
      var number = 0;

      if (text === null) {
        return;
      }
      this.setState({ loading: "Validando" });
      for (const c of text1) {
        number += 1;
        if (Number(c)) {
          //cortamos hasta el primer numero
          text1 = text1.substring(number - 1, text1.length);
          //tomamos el primer numero hasta la coma
          aux = text1.split(",")[0];
          if (Number(aux)) {
            return this.iterateObject(text1);
          }
        }
      }
    }
    if (this.state.atributes !== nextState.atributes) {
      this.forceUpdate();
    }
  }

  async iterateObject(text1) {
    this.setState({ loading: "Comparando Dobles" });

    var aux = text1.split("\n");

    for (let i = 0; i < aux.length; i++) {
      this.object(aux[i], text1);
    }

    this.array_json.pop();

    console.log(this.array_json);

    this.setState(
      {
        array_json: this.array_json,
        loading: ""
      },
      () => {
        this.viewRender();
      }
    );
  }

  async object(text1, text2) {
    var index1 = text2.indexOf(text1);
    var index2 = text2.indexOf(text1, index1 + 1);

    if (index2 >= 0) {
      return;
    }

    var aux = new Object();

    //tomamos el primer numero hasta la coma
    aux.nrc = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.nrc, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-ST
    //tomamos el primer numero hasta la coma
    aux.st = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.st, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-DEPARTAMENTO
    //tomamos el primer numero hasta la coma
    aux.departamento = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.departamento, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-Area
    //tomamos el primer numero hasta la coma
    aux.area = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.area, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //CLAVE
    //tomamos el primer numero hasta la coma
    aux.clave = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.clave, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-MATERIA
    //tomamos el primer numero hasta la coma
    var materia = "";
    materia = text1.substring(0, 1);

    if (!materia.localeCompare('"')) {
      //eliminamos la '"'
      text1 = text1.substring(1, text1.length);

      aux.materia = text1.split('"')[0];

      //remplazamos el string encontrado con ''
      text1 = text1.replace(aux.materia, "");

      //eliminamos la '"'
      text1 = text1.substring(1, text1.length);

      //eliminamos la ','
      text1 = text1.substring(1, text1.length);
    } else {
      aux.materia = text1.split(",")[0];

      //remplazamos el string encontrado con ''
      text1 = text1.replace(aux.materia, "");

      //eliminamos la ','
      text1 = text1.substring(1, text1.length);
    }

    //-HRS_TEORIA
    //tomamos el primer numero hasta la coma
    aux.hrs_teoria = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.hrs_teoria, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-HRS_LABORATORIO
    //tomamos el primer numero hasta la coma
    aux.hrs_laboratorio = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.hrs_laboratorio, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-secc
    //tomamos el primer numero hasta la coma
    aux.secc = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.secc, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-cred
    //tomamos el primer numero hasta la coma
    aux.cred = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.cred, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-cupo
    //tomamos el primer numero hasta la coma
    aux.cupo = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.cupo, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-ucup
    //tomamos el primer numero hasta la coma
    aux.ucup = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.ucup, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-disp
    //tomamos el primer numero hasta la coma
    aux.disp = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.disp, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-ini
    //tomamos el primer numero hasta la coma
    aux.ini = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.ini, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-fin
    //tomamos el primer numero hasta la coma
    aux.fin = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.fin, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-fecha-L
    //tomamos el primer numero hasta la coma
    aux.class_on_monday = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.class_on_monday, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-fecha-M
    //tomamos el primer numero hasta la coma
    aux.class_on_tuesday = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.class_on_tuesday, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-fecha-I
    //tomamos el primer numero hasta la coma
    aux.class_on_wednesday = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.class_on_wednesday, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-fecha-J
    //tomamos el primer numero hasta la coma
    aux.class_on_thursday = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.class_on_thursday, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-fecha-V
    //tomamos el primer numero hasta la coma
    aux.class_on_friday = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.class_on_friday, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-fecha-S
    //tomamos el primer numero hasta la coma
    aux.class_on_saturday = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.class_on_saturday, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-Edifcio
    //tomamos el primer numero hasta la coma
    aux.edificio = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.edificio, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-Aula
    //tomamos el primer numero hasta la coma
    aux.aula = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.aula, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-Profesor
    //tomamos el primer caracther hasta la coma o comillas
    var profesor = "";
    profesor = text1.substring(0, 1);

    if (!profesor.localeCompare('"')) {
      //eliminamos la '"'
      text1 = text1.substring(1, text1.length);

      aux.profesor = text1.split('"')[0];

      //remplazamos el string encontrado con ''
      text1 = text1.replace(aux.profesor, "");

      //eliminamos la '"'
      text1 = text1.substring(1, text1.length);

      //eliminamos la ','
      text1 = text1.substring(1, text1.length);
    } else {
      //si no existe el profesor
      aux.profesor = text1.split(",")[0];

      //remplazamos el string encontrado con ''
      text1 = text1.replace(aux.profesor, "");

      //eliminamos la ','
      text1 = text1.substring(1, text1.length);
    }

    //-Fecha_Inicio
    //tomamos el primer numero hasta la coma
    var fecha_inicio = text1.split(",")[0];

    aux.fecha_inicio = text1
      .split(",")[0]
      .split("/")
      .reverse()
      .join("-");

    //remplazamos el string encontrado con ''
    text1 = text1.replace(fecha_inicio, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-Fecha_Fin
    //tomamos el primer numero hasta la coma
    var fecha_fin = text1.split(",")[0];

    aux.fecha_fin = text1
      .split(",")[0]
      .split("/")
      .reverse()
      .join("-");

    //remplazamos el string encontrado con ''
    text1 = text1.replace(fecha_fin, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-NIVEL
    //tomamos el primer caracther hasta la coma o comillas
    var nivel = "";
    nivel = text1.substring(0, 1);

    if (!nivel.localeCompare('"')) {
      //eliminamos la '"'
      text1 = text1.substring(1, text1.length);

      aux.nivel = text1.split('"')[0];

      //remplazamos el string encontrado con ''
      text1 = text1.replace(aux.profesor, "");

      //eliminamos la '"'
      text1 = text1.substring(1, text1.length);
    } else {
      //si solo existe una o nada
      aux.nivel = text1.split("\n")[0];

      //remplazamos el string encontrado con ''
      text1 = text1.replace(aux.nivel, "");
    }
    aux.err = "";
    aux.err_data = "";
    this.array_json.push(aux);
  }

  viewRender() {
    const { name_atributes, text, atributes } = this.state;
    if (text !== undefined && text !== null) {
      name_atributes.forEach(i => {
        atributes[i] = this.algortitmo(i);
      });
      this.setState({
        atributes
      });
    }
  }

  algortitmo(i) {
    const result = [];
    const map = new Map();
    for (const item of this.array_json) {
      if (!map.has(item[i])) {
        map.set(item[i], true); // set any value to Map
        if (item[i] !== null && item[i] !== undefined && item[i] !== "") {
          result.push(item);
        }
      }
    }

    return result;
  }

  saveDocument() {
    const { atributes, name_atributes } = this.state;

    var doc = new jsPDF();

    doc.text(20, 20, "Reporte");

    var numberx = 45;
    var numbery = 60;

    var incrementox = 45;
    var incrementoy = 10;

    name_atributes.map((i, page) => {
      doc.text(40, 40, i);

      atributes[i].map(j => {
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

  acomodar() {
    const { edificio, aula } = this.state.atributes;
    const { setAlert } = this.props;

    const { edificios, errors, name_atributes } = this.state;

    /*const dias = {
      L: {},
      M: {},
      I: {},
      J: {},
      V: {},
      S: {}
    };*/

    /*const hrs = [
      "700",
      "855",
      "900",
      "955",
      "1000",
      "1055",
      "1100",
      "1155",
      "1200",
      "1255",
      "1300",
      "1355",
      "1400",
      "1455",
      "1500",
      "1555",
      "1600",
      "1655",
      "1700",
      "1755",
      "1800",
      "1855",
      "1900",
      "1955",
      "2000",
      "2055"
    ];*/

    if (edificio === [] || edificio === null) {
      return setAlert("Error Not Such File", "danger");
    }

    edificio.map(i => {
      edificios[i.edificio] = [];
    });

    this.array_json.map(i => {
      if (this.finder(i)) {
        edificios[i.edificio].push(i);
      }
    });

    if (edificio === null) {
      setAlert("No Se Encuentran Edificios", "danger", 3000);
      return;
    }
    console.log("erros", errors);
    console.log(edificios);

    this.props.history.push({
      pathname: "/admin/home/table",
      state: {
        array_json: edificios,
        errors: errors,
        edificios: edificio,
        name_atributes
      }
    });
  }

  finder(obj) {
    const days = [
      "class_on_monday",
      "class_on_tuesday",
      "class_on_wednesday",
      "class_on_thursday",
      "class_on_friday",
      "class_on_saturday"
    ];
    const { errors, edificios } = this.state;

    if (obj.edificio === "") {
      errors.push({ ...obj, err: "No Edificio", err_data: "" });
      return false;
    }

    if (obj.aula === "") {
      errors.push({ ...obj, err: "No Aula", err_data: "" });
      return false;
    }

    if (obj.nrc === "") {
      errors.push({ ...obj, err: "No Nrc", err_data: "" });
      return false;
    }

    if (obj.clave === "") {
      errors.push({ ...obj, err: "No Clave", err_data: "" });
      return false;
    }

    if (edificios[obj.edificio].length < 1) {
      return true;
    }

    for (var i = 0; i < edificios[obj.edificio].length; i++) {
      if (edificios[obj.edificio][i].aula === obj.aula) {
        days.map(j => {
          if (obj[j] !== "") {
            if (obj[j] === edificios[obj.edificio][i][j]) {
              if (
                obj.ini <= edificios[obj.edificio][i].fin &&
                obj.fin >= edificios[obj.edificio][i].ini
              ) {
                errors.push({
                  ...obj,
                  err: "Horario En Conflicto",
                  err_data: edificios[obj.edificio][i].nrc
                });
                return false;
              }
            }
          }
        });
      }
    }

    return true;
  }

  render() {
    const { name_atributes, atributes, loading } = this.state;
    return (
      <>
        <div className="content">
          <Row md="12" className="ml-auto mr-auto mt-5">
            <Col md="5" className="ml-auto mr-auto mt-1">
              <Card>
                <CardBody className="text-center">
                  <CardTitle tag="h1">Bienvenido </CardTitle>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="ml-auto mr-auto mt-5">
              <Card>
                <CardBody>
                  <CardTitle tag="h1"> Ingrese El Documento</CardTitle>
                  <div>
                    <input type="file" onChange={e => this.showFile(e)} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {loading === "" ? (
            <Fragment></Fragment>
          ) : (
            <Row>
              <Col md="6" className="ml-auto mr-auto mt-5">
                <h4 className="description">{loading}</h4>
              </Col>
            </Row>
          )}
          {atributes.profesor !== null ? (
            <Row>
              <Col md="6" className="ml-auto mr-auto mt-5">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h1"> Datos Principales :</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div>
                      {name_atributes.map(i => (
                        <CardTitle tag="h3" key={i}>
                          {" "}
                          {i} : {atributes[i].length}
                        </CardTitle>
                      ))}
                    </div>
                    <Button
                      className="btn-fill"
                      color="primary"
                      type="submit"
                      onClick={this.saveDocument}
                    >
                      Save Document
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          ) : (
            <Fragment></Fragment>
          )}
          <Row md="12" className="ml-auto mr-auto mt-5">
            <Col md="12">
              <ReactTable
                data={this.state.array_json}
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
          <Row md="12" className="ml-auto mr-auto mt-5">
            <Col md="12" className="ml-auto mr-auto mt-5 text-center">
              <Button
                className="btn-fill"
                color="primary"
                type="submit"
                onClick={this.acomodar}
              >
                Modificar
              </Button>
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
