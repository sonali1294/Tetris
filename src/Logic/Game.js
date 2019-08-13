import { Piece } from './Piece';

export class Game {
  constructor() {
    this.currentPiece = {
      piece: new Piece.getRandomPiece(),
      x: 5,
      y: 2
    };
    this.data = [
      [0, 0, 0, 'R', 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 'R', 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 'R', 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 'R', 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 'P', 'P', 0, 0],
      [0, 0, 0, 0, 0, 0, 'P', 'P', 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 'G', 'G', 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 'G', 'G', 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 0]
    ];
  }

  //cons??
  createEmptyBoard() {}

  isAnyRowFull() {
    console.log(this.data.length);
    for (var i = 0; i < this.data.length - 1; i++) {
      if (this.data[i].includes(0)) {
        console.log('0');
      } else {
        console.log('no 0');
      }
    }
  }
  pasteCurrentPiece() {}
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
