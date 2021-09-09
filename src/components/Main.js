import React from 'react';
import dataJSON from './data.json';
import Swal from 'sweetalert2';

import Historial from './Historial';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      historia: "",
      opcion1: "",
      opcion2: "",
      cuenta: 1,
      capitulo: "",
      historial: []
    };
  }

  componentDidMount() {
    this.setState({
      id: dataJSON[0].id,
      historia: dataJSON[0].historia,
      opcion1: dataJSON[0].opciones.a,
      opcion2: dataJSON[0].opciones.b
    })
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.state.capitulo) {
      const proxCap = dataJSON.find(d => d.id === this.state.capitulo)
      if (previousState.id !== proxCap.id) {
        this.setState({
          id: proxCap.id,
          historia: proxCap.historia,
          opcion1: proxCap.opciones.a,
          opcion2: proxCap.opciones.b
        })
      }
    }

  }

  vueltaACero() {
    Swal.fire('Se terminó la historia')
    this.setState({
      id: dataJSON[0].id,
      historia: dataJSON[0].historia,
      opcion1: dataJSON[0].opciones.a,
      opcion2: dataJSON[0].opciones.b,
      cuenta: 1,
      capitulo: "",
      historial: [] 
    })
  }

  siguienteCapitulo(letra) {
    let capitulo;
    let contador = this.state.cuenta;
    const cantidadDeCapitulos = (dataJSON.length - 1) / 2; // Porque largo del array se duplica con las opciones a y b, exeptuando por el primer cápitulo.
    if (contador <= cantidadDeCapitulos ) {
      contador++;
      capitulo = contador + letra;

      this.guardarHistorial(letra)

      this.setState({
        cuenta: contador,
        capitulo: capitulo
      })
    } else {
      this.vueltaACero();
    }

  }

  guardarHistorial(letra) {
    const arrayDeCap = this.state.historial
    arrayDeCap.push(letra)

    this.setState({
      historial: arrayDeCap,
    })

  }

  render() {

    return (
      <div className="layout">
        <h2 className="historia">{this.state.historia}</h2>
        <div className="opcion">
          <button type="button" className="botones" onClick={() => this.siguienteCapitulo("a")}>A</button>
          <p className="opciones">{this.state.opcion1}</p>
          <button type="button" className="botones" onClick={() => this.siguienteCapitulo("b")}>B</button>
          <p className="opciones">{this.state.opcion2}</p>
        </div>
        <Historial
          historial={this.state.historial}
          capitulo={this.state.capitulo}
        />
      </div>
    );
  }

}