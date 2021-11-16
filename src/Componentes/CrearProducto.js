import React, { Component } from "react";
import { Col, Container } from "reactstrap";

export class CrearProducto extends Component {
  constructor() {
    super();
    this.state = {
      titulo: '',
      imagen: '',
      descripcion: '',
      precio: '',
      stock: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.agregarProducto = this.agregarProducto.bind(this);
  }

  handleChange(e){
      const {name, value} = e.target;
      this.setState({
          [name]:value
      })

    }
  agregarProducto(e){
      e.preventDefault();
      fetch("http://localhost:5000/api/articulos",{
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
      }    
      )
  }
     
  render() {
    return (
      <Container>
        <Col sm="5">
          <h5>Crear Producto</h5>
          <form onSubmit= {this.agregarProducto}>
            <div className="mb-3">
              <input
                name="titulo"
                className="form-control"
                type="text"
                placeholder="Ingrese titulo"
                onChange = {this.handleChange}
                value={this.state.titulo}
              />
            </div>
            <div className="mb-3">
              <input
                name="imagen"
                className="form-control"
                type="text"
                placeholder="Ingrese el link de la imagen"
                onChange = {this.handleChange}
                value={this.state.imagen}
              />
            </div>
            <div className="mb-3">
              <input
                name="descripcion"
                className="form-control"
                type="text"
                placeholder="Ingrese descripción del producto"
                onChange = {this.handleChange}
                value={this.state.descripcion}
              />
             </div>
             <div className="mb-3">
              <input
                name="precio"
                className="form-control"
                type="text"
                placeholder="Ingrese el precio"
                onChange = {this.handleChange}
                value={this.state.precio}
              />
             </div>
            <div className="mb-3">
              <input
                name="Stock"
                className="form-control"
                type="number"
                placeholder="Ingrese cantidad de artículos"
                onChange = {this.handleChange}
                value={this.state.stock}
              />
            </div>
            <button type="submit" className= "btn btn-primary">
                Guardar
            </button>
          </form>
        </Col>
      </Container>
    );
  }
}

export default CrearProducto;
