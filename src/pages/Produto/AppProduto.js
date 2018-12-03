import React, { Component } from 'react';
import './Produto.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      nome: "",
      lastStatus: "",
    }
  };

  updateStatus = evt => {
    const propert = evt.target.name;
    this.setState({[propert]: evt.target.value});
  };

  Add = evt => {
    evt.preventDefault();
    
    const options = {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "nome": this.state.nome
      })
    }

    fetch("https://localhost:44328/api/Produtos", options)
    .then(response => {
      this.setState({
        lastStatus: response.status
      });
    });
    
  }

  Update = evt => {
    evt.preventDefault();

    const options = {
      method: 'PUT',
      crossDomain: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "nome": this.state.nome
      })
    }

    fetch("https://localhost:44328/api/Produtos/" + this.state.id, options)
    .then(response => {
      this.setState({
        lastStatus: response.status
      });
    });
  }

  Delete = evt => {
    evt.preventDefault();

    const options = {
      method: 'DELETE',
      crossDomain: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }

    fetch("https://localhost:44328/api/Produtos/" + this.state.id, options)
    .then(response => {
      this.setState({
        lastStatus: response.status
      });
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
          {this.state.lastStatus}
        </div>
      </div>
    );
  }
}

export default App;
