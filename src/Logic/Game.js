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
      x: 4,
      y: 10
    };
    this.data = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['P', 0, 0, 0, 0, 0, 0, 'P', 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 'P', 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 0],
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
  isCurrentPiecePastable() {
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
  }
  tryMoveLeft() {
    //1 test can it move right
    //if yes - then
    if (this.canCurrentPieceMoveLeft() === true) {
      this.removeCurrentPiece();
      this.currentPiece.x = this.currentPiece.x - 1;
      this.pasteCurrentPiece();
    }
  }
  canCurrentPieceMoveRight() {
    //remove piece
    this.removeCurrentPiece();
    //update x by 1 position
    this.currentPiece.x = this.currentPiece.x + 1;
    var isPastable = this.isCurrentPiecePastable();
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
    var isPastable = this.isCurrentPiecePastable();
    //UnDo
    this.currentPiece.x = this.currentPiece.x + 1;
    this.pasteCurrentPiece();
    return isPastable;
  }

  canCurrentPieceRotate() {
    //ToDo
  }

  canCurrentPieceMoveDown() {
    //ToDo
  }

  removeCurrentPiece() {}

  isRowFull(rowNum) {
    return this.data[rowNum].includes(0) !== true;
  }

  detectFullRowFromBottom() {
    for (var y = this.data.length - 1; y >= 0; y--) {
      if (this.isRowFull(y)) {
        return y;
      }
    }
  }

  moveAllBoardRowsDown(rowNum) {
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
    this.sendUpdate();
  }
  // checkIfNextRowIsAvailable() {}

  onUpdate(callback) {
    this.callback = callback;
  }
  sendUpdate() {
    this.callback();
  }
  checkForNewLinesCreated() {
    //check last row is full
    // If yes, move board to down
    // increase score
    // Do it until last row is not full.
    this.data[0][0] = 'R';
    this.sendUpdate();
  }
}
