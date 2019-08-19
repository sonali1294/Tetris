import { Piece } from './Piece';

function makeCounting(a, b) {}
//input a,b => 9, 4
//return [9,8,7,6,5,4]

var gameBoardDimentions = {
  width: 10,
  height: 20
};
export class Game {
  constructor() {
    this.currentPiece = {
      piece: new Piece.getRandomPiece(),
      x: 3,
      y: 0
    };
    this.score = 0;
    this.gameStatus = 'Play';
    this.data = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 0]
    ];
  }

  startMainLoop() {
    this.intId = setInterval(() => {
      debugger;
      this.mainLoop();
    }, 1000);
  }

  mainLoop() {
    //This will execute every tick
    if (this.isCurrentPiecePasteable() === true) {
      this.pasteCurrentPiece();
      this.tryMoveDown();
      this.clearFullRowFromBottom();
    }
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
    this.sendUpdate();
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
    var locx = this.currentPiece.x;
    var locy = this.currentPiece.y;
    this.currentPiece.piece.shapeData.map((row, x) => {
      row.map((col, y) => {
        if (this.currentPiece.piece.shapeData[y][x] !== 0) {
          this.data[y + locy][x + locx] = this.currentPiece.piece.shapeData[y][x];
        }
      });
    });
    this.sendUpdate();
  }

  tryMoveRight() {
    //1 test can it move right
    //if yes - then
    if (this.canCurrentPieceMoveRight() === true) {
      this.removeCurrentPiece();
      this.currentPiece.x = this.currentPiece.x + 1;
      this.pasteCurrentPiece();
    }
    this.sendUpdate();
  }
  tryMoveLeft() {
    //1 test can it move right
    //if yes - then
    if (this.canCurrentPieceMoveLeft() === true) {
      this.removeCurrentPiece();
      this.currentPiece.x = this.currentPiece.x - 1;
      this.pasteCurrentPiece();
    }
    this.sendUpdate();
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
  tryMoveDown() {
    if (this.canCurrentPieceMoveDown()) {
      this.removeCurrentPiece();
      this.currentPiece.y = this.currentPiece.y + 1;
      this.pasteCurrentPiece();
      this.sendUpdate();
    } else {
      if (!this.detectIfGameOver()) {
        this.currentPiece.piece = new Piece.getRandomPiece();
        this.currentPiece.x = 3;
        this.currentPiece.y = 0;
        this.sendUpdate();
      }
    }
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
    this.sendUpdate();
  }

  isRowFull(rowNum) {
    return this.data[rowNum].includes(0) !== true;
  }

  clearFullRowFromBottom() {
    for (var y = this.data.length - 1; y >= 0; y--) {
      if (this.isRowFull(y)) {
        var rowNum = y;
        var row = this.data[rowNum];
        row.map((value, index) => {
          this.data[rowNum][index] = 0;
        });
        this.moveAllBoardRowsDown(rowNum);
        this.sendUpdate();
      }
    }
  }

  // clearFilledRow(rowNum) {
  //   var row = this.data[rowNum];
  //   row.map((value, index) => {
  //     this.data[rowNum][index] = 0;
  //   });
  //   this.moveAllBoardRowsDown(rowNum);
  //   this.sendUpdate();
  // }

  moveAllBoardRowsDown(rowNum) {
    // console.log(this.data);
    for (let y = rowNum; y >= 0; y--) {
      var row = this.data[y];
      if (y === 0) {
        row.map((col, x) => {
          this.data[y][x] = 0;
        });
      } else {
        row.map((col, x) => {
          this.data[y][x] = this.data[y - 1][x];
        });
      }
    }
    this.score++;
    this.sendUpdate();
  }
  detectIfGameOver() {
    this.data.map((row, i) => {
      row.map((col, y) => {
        if (this.data[0][y] !== 0) {
          this.gameStatus = 'gameOver';
          this.sendUpdate();
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
    this.sendUpdate();
  }

  onUpdate(callback) {
    this.callback = callback;
  }
  sendUpdate() {
    setImmediate(() => {
      this.callback();
    });
  }
}
