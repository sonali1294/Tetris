import React, { Component } from 'react';
import { Game } from '../Logic/Game';
import { Piece } from '../Logic/Piece';

class Board extends Component {
  constructor() {
    super();
    // this.draw= this.draw.bind(this);
    var game = new Game();
    this.state = {
      data: game.data
    };
    game.onUpdate(() => {
      this.setState({
        data: game.data
      });
    });
    game.pasteCurrentPieceOnBoard();
    window.game = game;
  }

  setColours = (num) => {
    return num !== 0
      ? (num === 'R' ? 'redClass' : null) || (num === 'P' ? 'purpleClass' : null) || (num === 'G' ? 'greenClass' : null)
      : 'blackClass';
  };

  render() {
    return (
      <table>
        <tbody>
          {this.state.data.map((numList, i) => (
            <tr key={i}>
              {numList.map((num, j) => (
                //  <td className={`block ${this.setColours(num)}`} key={j}>{num}</td>
                <td key={j}>{num}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Board;
