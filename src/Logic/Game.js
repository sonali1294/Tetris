import { Piece } from './Piece';

export class Game {
  constructor() {
    this.currentPiece = {
      piece: new Piece.getRandomPiece(),
      x: 3,
      y: 2
    };

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

  pasteCurrentPiece() {
    let x = this.currentPiece.y;
    this.currentPiece.piece.shapeData.map((row, i) => {
      let y = this.currentPiece.x;
      row.map((col, j) => {
        this.data[x][y] = this.currentPiece.piece.shapeData[i][j];
        y++;
      });
      x++;
    });
  }

  createEmptyBoard() {}

  isAnyRowFull() {
    for (var i = 1; i < this.data.length; i++) {
      if (!this.data[i].includes(0)) {
        this.data[i].splice(0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      }
    }
  }

  checkIfNextRowIsAvailable() {}

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
