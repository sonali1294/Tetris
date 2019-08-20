import { Piece } from './Piece';
import { Interval } from './Timer';
import loopObject from 'loopobject';
import EventBus from '@nsisodiya/eventbus';
import keyMirror from 'keymirror';

function clone(x) {
  return JSON.parse(JSON.stringify(x));
}
function generateArray(l) {
  return clone(new Array(l));
}

var GAME_STATUS = keyMirror({ PAUSE: null, RUNNING: null, ENDED: null });

function makeCounting(a, b) {}
//input a,b => 9, 4
//return [9,8,7,6,5,4]

var gameBoardDimentions = {
  width: 10,
  height: 20
};
export class Game {
  constructor() {
    this.currentPiece = null;
    this.evtBus = new EventBus();
    this.setUpEvents();
  }

  setUpEvents() {
    ['EVENT_GAME_OVER', 'EVENT_GAME_TICK'].forEach((evtName) => {
      this.evtBus.subscribe(evtName, this[evtName].bind(this));
    });
  }
  EVENT_GAME_OVER() {
    this.timer.end();
    alert('GAME OVER');
    this.generateBoard();
    this.currentPiece = null;
    this.score = 0;
    this.startGame();
    console.log('EVENT GAME OVER CALLED');
  }
  EVENT_GAME_TICK() {
    if (this.currentPiece) {
      this.pasteCurrentPiece();
      this.tryMoveDown();
      if (!this.canCurrentPieceMoveDown) {
        this.gameStuck();
      }
    }
  }

  gameStuck() {
    this.currentPiece = null;
    this.clearFullRowFromBottom();
    this.currentPiece = this.nextPiece;
    // console.log(this.isCurrentPiecePasteable());
    if (!this.isCurrentPiecePasteable()) {
      this.evtBus.publish('EVENT_GAME_OVER');
    } else {
      this.pasteCurrentPiece();
    }
    this.generateNextPiece();
  }
  generateBoard() {
    this.data = [];
    generateArray(gameBoardDimentions.height).forEach((v, y) => {
      generateArray(gameBoardDimentions.width).forEach((u, x) => {
        // console.log('this.data[y]', this.data[y]);
        if (!Array.isArray(this.data[y])) {
          this.data[y] = [];
        }
        this.data[y][x] = 0;
      });
    });
  }
  startGame() {
    //1. Score Zero
    this.score = 0;
    //2. Create empty board
    this.generateBoard();
    //3. Generate New Piece
    this.generateCurrentPieceWithDimensions();
    //4.Generate Next Piece
    this.generateNextPiece();
    //5. Paste Current Piece
    if (this.isCurrentPiecePasteable()) {
      //Oh yes, it is pastable. now we will paste.
      this.pasteCurrentPiece();
    } else {
      console.log('game over');
      //GAME OVER
      //TODO - fire GameOverEvent
      this.evtBus.publish('EVENT_GAME_OVER');
    }
    //6. Start Game Ticker
    this.timer = new Interval(() => {
      this.evtBus.publish('EVENT_GAME_TICK');
    }, 1000);
    // console.log(this.timer);
    this.timer.start();
    this.status = GAME_STATUS.RUNNING;
  }
  pauseGame() {
    this.timer.pause();
  }

  resumeGame() {
    this.timer.resume();
  }
  restartGame() {
    this.currentPiece = null;
    this.timer.end();
    this.startGame();
  }
  generateCurrentPieceWithDimensions() {
    if (this.currentPiece !== null) {
      throw new Error('Something is wrong. Why this currentPiece is not null');
    }
    // this.currentPiece = {
    //   piece: new Piece.getRandomPiece(),
    //   x: 3,
    //   y: 0
    // };
    this.currentPiece = this.generateNextPiece();
  }

  generateNextPiece() {
    this.nextPiece = {
      piece: new Piece.getRandomPiece(),
      x: 3,
      y: 0
    };
    return this.nextPiece;
  }

  removeCurrentPiece() {
    var locx = this.currentPiece.x;
    var locy = this.currentPiece.y;
    this.currentPiece.piece.shapeData.map((row, x) => {
      row.map((col, y) => {
        if (this.currentPiece.piece.shapeData[y][x] !== 0) {
          this.data[y + locy][x + locx] = 0;
        }
      });
    });
    this.refreshUI();
  }
  isCurrentPiecePasteable() {
    var locx = this.currentPiece.x;
    var locy = this.currentPiece.y;
    var isPiecePastable = true;
    this.currentPiece.piece.shapeData.map((row, x) => {
      row.map((col, y) => {
        try {
          if (this.currentPiece.piece.shapeData[y][x] !== 0 && this.data[y + locy][x + locx] !== 0) {
            isPiecePastable = isPiecePastable && false;
          }
        } catch (error) {
          isPiecePastable = isPiecePastable && false;
        }
      });
    });
    return isPiecePastable;
  }
  pasteCurrentPiece() {
    // console.log(this.data);
    var locx = this.currentPiece.x;
    var locy = this.currentPiece.y;
    this.currentPiece.piece.shapeData.map((row, x) => {
      row.map((col, y) => {
        if (this.currentPiece.piece.shapeData[y][x] !== 0) {
          this.data[y + locy][x + locx] = this.currentPiece.piece.shapeData[y][x];
        }
      });
    });
    this.refreshUI();
  }

  tryMoveRight() {
    //1 test can it move right
    //if yes - then
    if (this.canCurrentPieceMoveRight() === true) {
      this.removeCurrentPiece();
      this.currentPiece.x = this.currentPiece.x + 1;
      this.pasteCurrentPiece();
    }
    this.refreshUI();
  }
  tryMoveLeft() {
    //1 test can it move right
    //if yes - then
    if (this.canCurrentPieceMoveLeft() === true) {
      this.removeCurrentPiece();
      this.currentPiece.x = this.currentPiece.x - 1;
      this.pasteCurrentPiece();
    }
    this.refreshUI();
  }
  canCurrentPieceMoveRight() {
    //remove piece
    this.removeCurrentPiece();
    //update x by 1 position
    this.currentPiece.x = this.currentPiece.x + 1;
    var isPastable = this.isCurrentPiecePasteable();
    //UnDo
    this.currentPiece.x = this.currentPiece.x - 1;
    this.pasteCurrentPiece();
    return isPastable;
  }
  canCurrentPieceMoveLeft() {
    //remove piece
    this.removeCurrentPiece();
    //update x by 1 position
    this.currentPiece.x = this.currentPiece.x - 1;
    var isPastable = this.isCurrentPiecePasteable();
    //UnDo
    this.currentPiece.x = this.currentPiece.x + 1;
    this.pasteCurrentPiece();
    return isPastable;
  }

  canCurrentPieceRotate() {
    this.removeCurrentPiece();
    if (this.checkRotationForCurrentPiece()) {
      this.pasteCurrentPiece();
      return true;
    } else {
      this.pasteCurrentPiece();
      return false;
    }
  }

  checkRotationForCurrentPiece() {
    let result = [];
    let matrix = this.currentPiece.piece.shapeData;
    for (let i = 0; i < this.currentPiece.piece.shapeData[0].length; i++) {
      let row = this.currentPiece.piece.shapeData.map((e) => e[i]).reverse();
      result.push(row);
    }
    this.currentPiece.piece.shapeData = result;
    if (this.isCurrentPiecePasteable()) {
      this.currentPiece.piece.shapeData = matrix;
      return true;
    } else {
      this.currentPiece.piece.shapeData = matrix;
      return false;
    }
  }

  rotateCurrentPiece() {
    if (this.canCurrentPieceRotate()) {
      this.removeCurrentPiece();
      let result = [];
      for (let i = 0; i < this.currentPiece.piece.shapeData[0].length; i++) {
        let row = this.currentPiece.piece.shapeData.map((e) => e[i]).reverse();
        result.push(row);
      }
      this.currentPiece.piece.shapeData = result;
      this.pasteCurrentPiece();
    }
  }

  canCurrentPieceMoveDown() {
    this.removeCurrentPiece();
    this.currentPiece.y = this.currentPiece.y + 1;
    var isPastable = this.isCurrentPiecePasteable();
    this.currentPiece.y = this.currentPiece.y - 1;
    this.pasteCurrentPiece();
    return isPastable;
  }

  // tryMoveDown() {
  //   if (this.canCurrentPieceMoveDown() === true) {
  //     this.removeCurrentPiece();
  //     this.currentPiece.y = this.currentPiece.y + 1;
  //     this.pasteCurrentPiece();
  //   }
  //   console.log(this.data);
  //   this.refreshUI();
  // }
  tryMoveDown() {
    // console.log(this.canCurrentPieceMoveDown());
    if (this.canCurrentPieceMoveDown()) {
      this.removeCurrentPiece();
      this.currentPiece.y = this.currentPiece.y + 1;
      this.pasteCurrentPiece();
    } else {
      // console.log('trymovedown else');
      this.gameStuck();
    }
    this.refreshUI();
  }
  removeCurrentPiece() {
    var locX = this.currentPiece.x;
    var locY = this.currentPiece.y;

    this.currentPiece.piece.shapeData.map((row, i) => {
      row.map((col, j) => {
        if (this.currentPiece.piece.shapeData[j][i] !== 0) {
          this.data[j + locY][i + locX] = 0;
        }
      });
    });
    this.refreshUI();
  }

  isRowFull(rowNum) {
    return this.data[rowNum].includes(0) !== true;
  }

  clearFullRowFromBottom() {
    var arr = [];
    for (var y = this.data.length - 1; y >= 0; y--) {
      if (this.isRowFull(y)) {
        arr.push(y);
      }
    }
    arr.reverse().map((value, index) => {
      this.moveAllBoardRowsDown(value);
    });
    this.refreshUI();
  }
  moveAllBoardRowsDown(rowNum) {
    // console.log();
    for (let y = rowNum; y >= 0; y--) {
      var row = this.data[y];
      if (y === 0) {
        row.map((col, x) => {
          this.data[y][x] = 0;
        });
      } else {
        row.map((col, x) => {
          // console.log('before', this.data);
          this.data[y][x] = this.data[y - 1][x];
          // console.log('after', this.data);
        });
      }
    }
    this.score++;
    this.refreshUI();
  }
  detectIfGameOver() {
    this.data.map((row, i) => {
      row.map((col, y) => {
        if (this.data[0][y] !== 0) {
          this.gameStatus = 'gameOver';
          this.refreshUI();
          // alert('Game Over');
          this.resetGame();
        }
      });
    });
  }

  resetGame() {
    this.data.map((row, i) => {
      row.map((col, j) => {
        this.data[i][j] = 0;
      });
    });
    this.score = 0;
    this.gameStatus = 'Play';
    this.refreshUI();
  }

  gameOver() {
    this.timer.switchTimer(this.status);
  }
  refreshUI() {
    setImmediate(() => {
      this.evtBus.publish('REFRESH_UI');
    });
  }
}
