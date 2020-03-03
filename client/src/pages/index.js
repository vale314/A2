import React from "react";

import { Container } from "reactstrap";

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <h1>Hello World!</h1>
        </Container>
      </React.Fragment>
    );
  }
}

export default Index;
