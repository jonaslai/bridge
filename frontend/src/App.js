import React, { Component } from "react";
import api from "./api";
import logo from "./logo.png";

class App extends Component {
  state = {
    input: "",
    history: [],
    number: "",
    resultIsPrime: "",
    resultDividers: []
  };

  submitForm = async e => {
    e.preventDefault();
    const { history, input } = this.state;
    this.setState({ number: input });

    history.push(input);
    const result = await api.post("/", { number: input });
    console.log(result);
    this.setState({
      resultIsPrime: result.data.resultPrime,
      resultDividers: result.data.resultDividers,
      history
    });
  };

  handleClearHistory = () => {
    this.setState({ history: [] });
  };

  handleClearCalculate = e => {
    e.preventDefault();
    this.setState({
      number: "",
      input: "",
      resultIsPrime: "",
      resultDividers: []
    });
  };

  handleInput = e => {
    this.setState({ input: e.target.value });
  };

  render() {
    const {
      input,
      history,
      resultDividers,
      resultIsPrime,
      number
    } = this.state;

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-1">
              <img src={logo} alt="Logo Bridge" height="100" width="100" />
            </div>
            <div className="col">
              <h1 className="font-weight-bold p-4" align="left">
                Calculadora de Divisores
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={this.submitForm}>
                    <div className="form-group">
                      <h5 className="font-weight-bold">Calculadora</h5>
                      <input
                        type="number"
                        min="1"
                        className="form-control"
                        value={input}
                        onChange={this.handleInput}
                      />
                    </div>
                    <div className="row">
                      <div className="col">
                        <button className="btn btn-primary">Calcular</button>
                      </div>
                      <div className="col">
                        <button
                          className="btn btn-danger"
                          onClick={this.handleClearCalculate}
                        >
                          Apagar
                        </button>
                      </div>
                    </div>
                  </form>
                  <h5 className="mt-2">Número: {number}</h5>
                  <h5>
                    É número primo:
                    {resultIsPrime && <span>{resultIsPrime}</span>}
                  </h5>
                  <h5> Divisores: </h5>
                  <ul className="list-group list-group-flush">
                    {resultDividers &&
                      resultDividers.map(divider => (
                        <li
                          className="list-group-item"
                          key={divider + Math.random()}
                        >
                          {divider}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="font-weight-bold">Histórico</h5>
                    <button
                      className="btn btn-danger"
                      onClick={this.handleClearHistory}
                    >
                      Apagar histórico
                    </button>
                  </div>

                  <ul className="list-group list-group-flush">
                    {history.map(number => (
                      <li
                        className="list-group-item"
                        key={number + Math.random()}
                      >
                        {number}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
