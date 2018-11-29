import React, { Component } from 'react';
import './Produto.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      nome: "",
    }
  };

  updateStatus = evt => {
    const propert = evt.target.name;
    this.setState({[propert]: evt.target.value});
  };

  Add = evt => {
    evt.preventDefault();
    
    let produtoData = {
      "nome": this.state.nome
    }
    let header = new Headers({
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      'Accept': 'application/json',
    });

    const options = {
      method: 'POST',
      header: header,
      crossDomain: true,
      body: JSON.stringify(produtoData),
    }

    fetch("https://localhost:44328/api/Produtos", options)
    .then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
    
  }

  Update = evt => {
    evt.preventDefault();

    let produtoData = {
      "nome": this.state.nome
    }
    let header = new Headers({
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    });

    const options = {
      method: 'PUT',
      header: header,
      body: JSON.stringify(produtoData),
    }

    fetch("https://localhost:44328/api/Produtos/" + this.state.id, options)
    .then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }

  Delete = evt => {
    evt.preventDefault();

    let header = new Headers({
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    });

    const options = {
      method: 'DELETE',
      header: header,
    }

    fetch("https://localhost:44328/api/Produtos/" + this.state.id, options)
    .then(response => {
      console.log(response.status);
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <form>
          <div className="container">
            <label>Identificador: </label>
            <input type="text" name="id" value={this.props.id} onChange={this.updateStatus}></input>

            <label>Nome: </label>
            <input type="text" name="nome" value={this.props.nome} onChange={this.updateStatus}></input>
          </div>
          <button onClick={this.Add}>Cadastrar</button>
          <button onClick={this.Update}>Editar</button>
          <button onClick={this.Delete}>Delete</button>
        </form>
        <div className="status">
          {this.props.lastStatus}
        </div>
      </div>
    );
  }
}

export default App;
