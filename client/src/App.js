import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };

    this.object = this.object.bind(this);
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
      console.log(text);
      alert(text);

      var text1 = text;
      var aux = "";

      var number = 0;
      for (const c of text1) {
        number += 1;
        if (Number(c)) {
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
    }
  }

  object(text1) {
    var aux = "";

    var number = 0;
    for (const c of text1) {
      number += 1;
      if (Number(c)) {
        //tomamos el primer numero hasta la coma
        aux = text1.split(",")[0];

        if (Number(aux)) {
          console.log(text1);
          console.log(aux);

          //remplazamos el string encontrado con ''
          text1 = text1.replace(aux, "");

          //eliminamos la ','
          text1 = text1.substring(1, text1.length);
          console.log(text1);

          number = 0;
        }

        break;
      }
    }
  }

  render = () => {
    return (
      <div>
        <input type="file" onChange={e => this.showFile(e)} />
      </div>
    );
  };
}

export default App;
