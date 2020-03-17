import React from "react";
import ReactTable from "react-table-6";
import axios from "axios";
import Loader from "react-loader";

import { Row, Col, Button, Container } from "reactstrap";

class Index extends React.Component {
  array_json = [];
  constructor(props) {
    super(props);
    this.state = {
      array_json: [],
      loaded: true
    };
  }

  componentDidMount() {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    this.setState({ loaded: false });
    axios
      .get("/api/register", config)
      .then(res => {
        this.array_json = res.data;
        this.setState({
          array_json: res.data
        });
        this.setState({ loaded: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loaded: true });
      });
  }

  render() {
    const { loaded } = this.state;
    return (
      <React.Fragment>
        <Container>
          <Loader loaded={loaded}>
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
                    }
                  ]}
                  defaultPageSize={5}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                />
              </Col>
            </Row>
          </Loader>
        </Container>
      </React.Fragment>
    );
  }
}

export default Index;
