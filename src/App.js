import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Prueba from './Componentes/Prueba';
import ListarProductos from './Componentes/ListarProductos';
import LoginUsuario from './Componentes/LoginUsuario'
import Principal from './Componentes/Principal'
import Navegacion from './Componentes/Navegacion';
import CrearProducto from './Componentes/CrearProducto';

class App extends React.Component{
  render(){
    return (
      <Router>  
            <Navegacion/>    
            <Route path="/prueba" component={Prueba} />
            <Route path="/lista" component={ListarProductos} />
            <Route path="/usuarios" component={LoginUsuario} />
            <Route path="/" exact component={Principal}/>
            <Route path="/crear" component={CrearProducto}/>

      </Router>
    );
  }
}

export default App;
