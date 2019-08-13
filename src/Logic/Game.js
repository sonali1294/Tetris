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
  isLastRowFull() {
    return 'Yes Last row is full';
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
