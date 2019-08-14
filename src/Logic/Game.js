import { Piece } from './Piece';

export class Game {
  constructor() {
    this.currentPiece = {
      piece: new Piece.getRandomPiece(),
      x: 3,
      y: 2
    };

    this.data = [
      [0, 'R', 0, 0, 0, 0, 0, 0, 0, 0],
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
      ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R']
    ];
  }

  pasteCurrentPiece() {
    for (var r = 0; r < this.currentPiece.piece.shapeData.length; r++) {
      var a = this.currentPiece.piece.shapeData[r];
      for (var c = 0; c < a.length; c++) {
        // console.log('a[' + r + '][' + c + '] = ' + a[c]);
        if (a[c] === 1) {
          console.log('a[' + r + '][' + c + ']  ');
          var x = this.currentPiece.x + c;
          var y = this.currentPiece.y + r;
          console.log('x', x, 'y', y);
        }
      }
    }
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
