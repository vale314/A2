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
  array_json = [];
  constructor(props) {
    super(props);

    this.state = {};

    this.iterateObject = this.iterateObject.bind(this);
  }

  componentDidMount() {
    //this.props.loadUser();
    // eslint-disable-next-line
  }

  showFile = async e => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async e => {
      this.setState({
        text: e.target.result,
        array_json: []
      });
    };
    reader.readAsText(e.target.files[0]);
  };

  componentWillUpdate(nextProps, nextState) {
    const { text } = nextState;
    if (this.state.text !== nextState.text) {
      var aux = "";
      var text1 = text;
      var number = 0;

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
  }

  async iterateObject(text1) {
    var aux = text1.split("\n");

    for (let i = 0; i < aux.length; i++) {
      this.object(aux[i]);
    }
    this.array_json.pop();

    console.log(this.array_json);

    this.setState({
      array_json: this.array_json
    });
  }

  object(text1) {
    var aux = new Object();
    var auxF = "";

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
    aux.materia = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.materia, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

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
    aux.dias = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.dias, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    for (let i = 0; i < 5; i++) {
      //-fech--
      //tomamos el primer numero hasta la coma
      auxF = text1.split(",")[0];
      aux.dias = aux.dias.concat(" ", auxF);

      //remplazamos el string encontrado con ''
      text1 = text1.replace(auxF, "");

      //eliminamos la ','
      text1 = text1.substring(1, text1.length);
    }

    //-Edifcio
    //tomamos el primer numero hasta la coma
    aux.edificio = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.edificio, "");

    //eliminamos la ','
    text1 = text1.substring(1, text1.length);

    //-Aula
    //tomamos el primer numero hasta la coma
    aux.edificio = text1.split(",")[0];

    //remplazamos el string encontrado con ''
    text1 = text1.replace(aux.edificio, "");

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

    this.array_json.push(aux);
  }

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
          <Row>
            <Col md="12" className="ml-auto mr-auto mt-5">
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
                    Header: "ST",
                    accessor: "st"
                  },
                  {
                    Header: "Departamento",
                    accessor: "departamento"
                  },
                  {
                    Header: "Clave",
                    accessor: "clave"
                  },
                  {
                    Header: "Materia",
                    accessor: "materia"
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
