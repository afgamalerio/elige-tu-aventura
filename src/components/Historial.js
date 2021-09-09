import React from 'react';

export default class Main extends React.Component {
  
  render(){
    const historialDeCapitulos = this.props.historial;
    const lista = historialDeCapitulos.map((cap, index) => 
      <li key={index}>{cap}</li> // Acá tengo que arreglar
    )
    return (
      <div className="layout">
        <p className="recordatorio">Seleccion anterior:</p>
        <p className="recordatorio">{this.props.capitulo}</p>
        <p className="recordatorio">Historial de opciones:</p>
        <ul className="recordatorio">{lista}</ul>
      </div>
    );
  }

}