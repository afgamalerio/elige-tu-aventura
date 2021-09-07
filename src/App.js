import React from 'react';
import dataJSON from './components/data.json';
//import Swal from 'sweetalert2';

export default class App extends React.Component {
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

  componentDidMount(){
    const data = dataJSON;
    this.setState({
      id: data[0].id,
      historia: data[0].historia,
      opcion1: data[0].opciones.a,
      opcion2: data[0].opciones.b
    })    
  }

  componentDidUpdate(previousProps, previousState){
    
    if(this.state.capitulo){
      const data = dataJSON
      const proxCap = data.find(d => d.id === this.state.capitulo)
      if(previousState.id !== proxCap.id){
        this.setState({
          id: proxCap.id,
          historia: proxCap.historia,
          opcion1: proxCap.opciones.a,
          opcion2: proxCap.opciones.b
        })
      }
    }

  }

  siguienteCapitulo(letra){
    let capitulo;
    let contador = this.state.cuenta;
    const arrayDeCap = this.state.historial
    contador++;
    capitulo = contador + letra;
    arrayDeCap.push(capitulo)
    this.setState({
      historial: arrayDeCap,
      cuenta: contador,
      capitulo: capitulo
    })
  }
  
  render(){
    const historialDeCapitulos = this.state.historial;
    const lista = historialDeCapitulos.map((cap) => 
      <li key={cap}>{cap}</li> // Acá tengo que arreglar
    )
    return (
      <div className="layout">
        <p className="historia">{this.state.historia}</p>
        <div className="opcion">
          <button type="button" className="botones" onClick={() => this.siguienteCapitulo("a")}>A</button>
          <p className="opciones">{this.state.opcion1}</p>
          <button type="button" className="botones" onClick={() => this.siguienteCapitulo("b")}>B</button>
          <p className="opciones">{this.state.opcion2}</p>
        </div>
        <p className="recordatorio">Seleccion anterior:</p>
        <p className="recordatorio">{this.state.capitulo}</p>
        <p className="recordatorio">Historial de opciones:</p>
        <ul className="recordatorio">{lista}</ul>
      </div>
    );
  }

}
