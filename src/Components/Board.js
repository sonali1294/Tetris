import React, { Component } from 'react';
import { Game } from '../Logic/Game';
// import { Piece } from '../Logic/Piece';
import { HotKeys } from 'react-hotkeys';
const keyMap = {
  RIGHT_KEY: 'right',
  LEFT_KEY: 'left'
};
class Board extends Component {
  constructor() {
    super();
    var game = new Game();
    this.game = game;
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
      // setTimeout(() => {
      //   game.removeCurrentPiece();
      // }, 1000);
    }
  }
  onRightKeyPressEvent = () => {
    this.game.tryMoveRight();
  };
  onLeftKeyPressEvent = () => {
    this.game.tryMoveLeft();
  };

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
        <HotKeys
          keyMap={keyMap}
          handlers={{
            RIGHT_KEY: this.onRightKeyPressEvent,
            LEFT_KEY: this.onLeftKeyPressEvent
          }}>
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
        </HotKeys>
      </div>
    );
  }
}

export default Board;
