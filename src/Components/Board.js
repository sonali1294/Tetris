import React, { Component } from 'react';
import { Game } from '../Logic/Game';
// import { Piece } from '../Logic/Piece';
import { HotKeys } from 'react-hotkeys';
const keyMap = {
  RIGHT_KEY: 'right',
  LEFT_KEY: 'left',
  UP_KEY: 'up',
  DOWN_KEY: 'down'
};
class Board extends Component {
  constructor() {
    super();
    var game = new Game();
    this.game = game;
    game.evtBus.subscribe('REFRESH_UI', () => {
      this.setState({
        data: game.data,
        piece: game.currentPiece.piece.shapeData,
        score: game.score,
        gameStatus: game.gameStatus
      });
    });
    game.startGame();
    this.state = {
      data: game.data,
      piece: game.currentPiece.piece.shapeData,
      score: game.score,
      gameStatus: game.gameStatus
    };
    window.game = game;
    game.startMainLoop();
  }

  onRightKeyPressEvent = () => {
    this.game.tryMoveRight();
  };
  onLeftKeyPressEvent = () => {
    this.game.tryMoveLeft();
  };
  onDownKeyPressEvent = () => {
    this.game.tryMoveDown();
  };
  onUpKeyPressEvent = () => {
    this.game.rotateCurrentPiece();
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
            LEFT_KEY: this.onLeftKeyPressEvent,
            UP_KEY: this.onUpKeyPressEvent,
            DOWN_KEY: this.onDownKeyPressEvent
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
          <div>
            <br />
            <strong>SCORE : {this.state.score}</strong>
            <br />
            <strong>STATUS : {this.state.gameStatus}</strong>
            <br />
          </div>
          <p>Current Shape</p>
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
