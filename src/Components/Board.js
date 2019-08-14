import React, { Component } from 'react';
import { Game } from '../Logic/Game';
// import { Piece } from '../Logic/Piece';

class Board extends Component {
  constructor() {
    super();
    var game = new Game();
    this.state = {
      data: game.data,
      piece: game.currentPiece.piece.shapeData
    };
    game.onUpdate(() => {
      this.setState({
        data: game.data,
        piece: game.currentPiece.piece.shapeData
      });
    });
    window.game = game;

    console.log('isPastable', game.isCurrentPiecePastable());
    if (game.isCurrentPiecePastable() === true) {
      game.pasteCurrentPiece();
      setTimeout(() => {
        game.removeCurrentPiece();
      }, 1000);
    }
  }

  setColours = (num) => {
    var colorSymbolToClassMap = {
      R: 'redClass',
      P: 'purpleClass',
      B: 'blueClass',
      O: 'orangeClass',
      Y: 'yellowClass',
      G: 'greenClass',
      0: 'blackClass'
    };
    return colorSymbolToClassMap[num];
  };

  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.state.data.map((numList, i) => (
              <tr key={i}>
                {numList.map((num, j) => (
                  <td className={`block ${this.setColours(num)}`} key={j} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <p>Shapes</p>
        <table>
          <tbody>
            {this.state.piece.map((numList, i) => (
              <tr key={i}>
                {numList.map((num, j) => (
                  <td className={`block ${this.setColours(num)}`} key={j} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
