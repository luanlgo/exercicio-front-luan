import React, { Component } from 'react';
import './Produto.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      nome: "",
      lastStatus: null,
      produtos: []
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

  Delete = id => {
    const options = {
      method: 'DELETE',
      crossDomain: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }

    fetch("https://localhost:44328/api/Produtos/" + id, options)
    .then(response => {
      this.setState({
        lastStatus: response.status
      });
    });
  }

  Listar = evt => {
    evt.preventDefault();

    const options = {
      method: 'GET',
      crossDomain: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }

    fetch("https://localhost:44328/api/Produtos/" + this.state.id, options)
    .then(response => response.json())
    .then(produtos => {
      produtos.forEach(element => {
        this.setState({
          produtos: [...this.state.produtos, { id: element.id, nome: element.nome }]
        });
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
          <button onClick={this.Listar}>Listar</button>
        </form>
        <div className="status">
          <label>Status: {this.state.lastStatus}</label>
        </div>
        <div className="ListaProdutos">
          <ul>
            {
              this.state.produtos.map((produto, interador) => 
                <li key={interador}>{produto.id} - {produto.nome}</li>
              )
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
