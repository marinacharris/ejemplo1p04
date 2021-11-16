
import React, { Component } from 'react'
import { Container, Row } from 'reactstrap';
import Producto from './Producto';

export default class ListarProductos extends Component {
  constructor() {
    super();
    this.state = {
      titulo: "",
      imagen: "",
      descripcion: "",
      precio: "",
      stock: "",
      listaProductos: [],
    };
  }
  componentDidMount() {
    this.fetchProductos();
  }

  fetchProductos() {
    fetch("http://localhost:5000/api/articulos")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ listaProductos: data });
        console.log(this.state.listaProductos);
      });
  }
  render() {
    var arrayComponente = this.state.listaProductos.map((listaProductos, i) => {
      return (
        <Producto
          Key={i}
          titulo={listaProductos.titulo}
          imagen={listaProductos.imagen}
          descripcion={listaProductos.descripcion}
          precio={listaProductos.precio}
          stock={listaProductos.stock}
        />
      );
    });
    return (
      <Container>
        <Row>{arrayComponente}</Row>
      </Container>
    );
  }
}


