import React, { Component } from 'react';
import { Game } from '../Logic/Game';
// import { Piece } from '../Logic/Piece';
import { HotKeys } from 'react-hotkeys';
import SweetAlert from 'sweetalert-react';

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
    this.isPaused = false;
    game.evtBus.subscribe('REFRESH_UI', () => {
      this.setState({
        data: game.data,
        piece: game.currentPiece.piece.shapeData,
        nextPiece: game.nextPiece.piece.shapeData,
        score: game.score,
        gameStatus: game.gameStatus
      });
    });
    game.startGame();
    this.state = {
      data: game.data,
      piece: game.currentPiece.piece.shapeData,
      nextPiece: game.nextPiece.piece.shapeData,
      score: game.score,
      gameStatus: game.gameStatus
    };
    window.game = game;
    // game.startMainLoop();
  }

  onRightKeyPressEvent = () => {
    if (!this.isPaused) {
      this.game.tryMoveRight();
    }
  };
  onLeftKeyPressEvent = () => {
    if (!this.isPaused) {
      this.game.tryMoveLeft();
    }
  };
  onDownKeyPressEvent = () => {
    if (!this.isPaused) {
      this.game.tryMoveDown();
    }
  };
  onUpKeyPressEvent = () => {
    if (!this.isPaused) {
      this.game.rotateCurrentPiece();
    }
  };
  pauseGame = () => {
    if (!this.isPaused) {
      this.isPaused = true;
      this.game.pauseGame();
    }
  };
  resumeGame = () => {
    if (this.isPaused) {
      this.game.resumeGame();
      this.isPaused = false;
    }
  };
  restartGame = () => {
    this.isPaused = false;
    this.game.restartGame();
  };

  onConfirm = () => {
    this.game.onConfirm();
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
      <div className='container'>
        <HotKeys
          keyMap={keyMap}
          handlers={{
            RIGHT_KEY: this.onRightKeyPressEvent,
            LEFT_KEY: this.onLeftKeyPressEvent,
            UP_KEY: this.onUpKeyPressEvent,
            DOWN_KEY: this.onDownKeyPressEvent
          }}>
          <SweetAlert show={this.game.show} title='Ooopss!!' text='.Game Over.' onConfirm={this.onConfirm} />
          <div className='box'>
            <div className='box-row'>
              <div className='box-cell box1'>
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
              </div>
              <div className='box-cell box2'>
                <br />
                <div className='score'>
                  <strong>SCORE : {this.state.score}</strong>
                </div>
                <p>
                  <strong>Next Piece</strong>
                </p>
                <table>
                  <tbody>
                    {this.state.nextPiece.map((numList, i) => (
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
                  <button className='button' onClick={this.pauseGame}>
                    Pause
                  </button>
                  <br />
                  <button className='button' onClick={this.resumeGame}>
                    Resume
                  </button>
                  <br />
                  <button className='button' onClick={this.restartGame}>
                    Restart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </HotKeys>
      </div>
    );
  }
}

export default Board;
