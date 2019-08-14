import React, { Component } from 'react';
import Board from './Components/Board';

import { createMatrix, createPieces } from './Utils';

class App extends Component {
  constructor() {
    super();
    this.matrix = createMatrix(10, 20);

    this.piece = createPieces();
  }

  render() {
    return (
      <div className='App'>
        <Board matrix={this.matrix} piece={this.piece} />
      </div>
    );
  }
}

export default App;
