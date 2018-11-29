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
    let header = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }

    fetch("https://localhost:44328/api/Produtos", {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify(produtoData),
      headers: header
    }).then(response => {
      switch(response.status) {
        case 400:
          console.log(response.json);
      }
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
        </form>
      </div>
    );
  }
}

export default App;
