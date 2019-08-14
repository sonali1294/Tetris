import { Piece } from './Piece';

function makeCounting(a, b) {}
//input a,b => 9, 4
//return [9,8,7,6,5,4]

export class Game {
  constructor() {
    this.currentPiece = {
      piece: new Piece.getRandomPiece(),
      x: 2,
      y: 2
    };

    this.data = [
      ['B', 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
      [0, 0, 'G', 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 'G', 0, 0, 0, 0, 0, 0, 0],
      ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
      [0, 0, 'B', 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 'B', 0, 0, 0, 0, 0, 0, 0],
      [0, 'B', 'B', 0, 0, 0, 0, 0, 0, 0]
    ];
  }

  pasteCurrentPiece() {
    var locx = this.currentPiece.x;
    var locy = this.currentPiece.y;
    this.currentPiece.piece.shapeData.map((row, x) => {
      row.map((col, y) => {
        this.data[y + locy][x + locx] = this.currentPiece.piece.shapeData[y][x];
      });
    });
  }

  removeCurrentPiece() {}

  isRowFull(rowNum) {
    return this.data[rowNum].includes(0) !== true;
  }

  detectFullRowFromBottom() {
    for (var i = this.data.length - 1; i >= 0; i--) {
      var boolean = this.isRowFull(i);
      if (boolean == true) {
        return i;
      }
    }
    this.sendUpdate();
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
