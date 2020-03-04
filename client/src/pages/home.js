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
        text: e.target.result
      });
    };
    reader.readAsText(e.target.files[0]);
  };

  componentWillUpdate(nextProps, nextState) {
    const { text } = nextState;

    if (this.state.text !== nextState) {
      this.iterateObject(text);
    }
  }

  iterateObject(text1) {
    if (text1 === "") {
      console.log("finish");
    }

    var aux = "";

    var number = 0;
    for (const c of text1) {
      number += 1;

      //cortamos hasta el primer numero
      text1 = text1.substring(number - 1, text1.length);
      //tomamos el primer numero hasta la coma
      aux = text1.split(",")[0];

      if (Number(aux)) {
        this.object(text1);
        break;
      }
    }
  }

  object(text1) {
    var aux = new Object();
    var auxF = "";

    var number = 0;
    for (const c of text1) {
      number += 1;
      if (Number(c)) {
        //tomamos el primer numero hasta la coma
        aux.number = text1.split(",")[0];

        //remplazamos el string encontrado con ''
        text1 = text1.replace(aux.number, "");

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
        aux.fecha_inicio = text1.split(",")[0];

        //remplazamos el string encontrado con ''
        text1 = text1.replace(aux.fecha_inicio, "");

        //eliminamos la ','
        text1 = text1.substring(1, text1.length);

        //-Fecha_Fin
        //tomamos el primer numero hasta la coma
        aux.fecha_fin = text1.split(",")[0];

        //remplazamos el string encontrado con ''
        text1 = text1.replace(aux.fecha_fin, "");

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

        console.log(aux);

        this.iterateObject(text1);
      }
    }
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
