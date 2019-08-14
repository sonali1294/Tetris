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
    game.isAnyRowFull();
    game.pasteCurrentPiece();

    game.onUpdate(() => {
      this.setState({
        data: game.data,
        piece: game.currentPiece.piece.shapeData
      });
    });
    //game.pasteCurrentPieceOnBoard();
    window.game = game;
  }

  setColours = (num) => {
    return num !== 0
      ? (num === 'R' ? 'redClass' : null) || (num === 'P' ? 'purpleClass' : null) || (num === 'G' ? 'greenClass' : null)
      : 'blackClass';
  };

  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.state.data.map((numList, i) => (
              <tr key={i}>
                {numList.map((num, j) => (
                  <td className={`block ${this.setColours(num)}`} key={j}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <p>Shapes</p>
        <table>
          <tbody>
            {this.state.piece.map((numList, i) => (
              <tr key={i}>
                {numList.map((num, j) => (
                  <td className={`block ${this.setColours(num)}`} key={j}></td>
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
