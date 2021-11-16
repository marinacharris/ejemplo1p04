import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";

export class CrearProducto extends Component {
  constructor() {
    super();
    this.state = {
      titulo: "",
      imagen: "",
      descripcion: "",
      precio: "",
      stock: "",
      _id: "",
      productos: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.agregarProducto = this.agregarProducto.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  agregarProducto(e) {
    e.preventDefault();
    if (this.state._id){
      fetch(`http://localhost:5000/api/articulos/${this.state._id}`,{
        method: 'PUT',
        body: JSON.stringify({
          titulo: this.state.titulo,
          imagen: this.state.imagen,
          descripcion: this.state.descripcion,
          precio: this.state.precio,
          stock: this.state.stock
        }),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(data =>{
        alert('Producto actualizado');
        this.setState({
          titulo: "",
          imagen: "",
          descripcion: "",
          precio: "",
          stock: "",
          _id: ""
        })
        this.fetchProductos();
      })

    }else{
      fetch("http://localhost:5000/api/articulos", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });

    }

    
  }
  componentDidMount() {
    this.fetchProductos();
  }
  fetchProductos() {
    fetch("http://localhost:5000/api/articulos")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ productos: data });
        console.log(this.state.productos);
      });
  }
  deleteProducto(id) {
    fetch(`http://localhost:5000/api/articulos/${id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
    .then(res =>res.json())
    .then(data => {
      console.log(data);
      alert("Producto eliminado");
      this.fetchProductos();
    })`http://localhost:5000/api/articulos/${id}`
  }

  editProducto(id){
    fetch(`http://localhost:5000/api/articulos/${id}`)
    .then(res => res.json())
    .then(data =>{
      console.log(data);
      this.setState({
        titulo: data.titulo,
        imagen: data.imagen,
        descripcion: data.descripcion,
        precio: data.precio,
        stock: data.stock,
        _id: data._id
      })
    })

  }

  

  render() {
    return (
      <Container>
        <Col sm="5">
          <h5>Crear Producto</h5>
          <form onSubmit={this.agregarProducto}>
            <div className="mb-3">
              <input
                name="titulo"
                className="form-control"
                type="text"
                placeholder="Ingrese titulo"
                onChange={this.handleChange}
                value={this.state.titulo}
              />
            </div>
            <div className="mb-3">
              <input
                name="imagen"
                className="form-control"
                type="text"
                placeholder="Ingrese el link de la imagen"
                onChange={this.handleChange}
                value={this.state.imagen}
              />
            </div>
            <div className="mb-3">
              <input
                name="descripcion"
                className="form-control"
                type="text"
                placeholder="Ingrese descripción del producto"
                onChange={this.handleChange}
                value={this.state.descripcion}
              />
            </div>
            <div className="mb-3">
              <input
                name="precio"
                className="form-control"
                type="text"
                placeholder="Ingrese el precio"
                onChange={this.handleChange}
                value={this.state.precio}
              />
            </div>
            <div className="mb-3">
              <input
                name="stock"
                className="form-control"
                type="number"
                placeholder="Ingrese cantidad de artículos"
                onChange={this.handleChange}
                value={this.state.stock}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </form>
        </Col>
        <Col sm="7">
          <table className="table">
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Imagen</th>
                <th>Descripcion</th>
                <th>Precio</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {this.state.productos.map((producto) => {
                return (
                  <tr key={producto._id}>
                    <td>{producto.titulo}</td>
                    <td>{producto.imagen}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.stock}</td>
                    <td>
                      <button onClick={() => this.editProducto(producto._id)}>
                        Editar
                      </button>
                      <button onClick={() => this.deleteProducto(producto._id)}>
                        Borrar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Col>
      </Container>
    );
  }
}

export default CrearProducto;
