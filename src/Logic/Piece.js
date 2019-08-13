var possibleColors = ['red', 'green', 'blue'];
var possibleShapes = ['z', 's']; //, 'l', 'j', 'o', 't', 'p', 'i'];

export class Piece {
  constructor(type, color) {
    console.log('type', type);
    switch (type) {
      case 's':
        this.shapeData = [[1, 1, 0], [0, 1, 1], [0, 0, 0]];
        break;
      case 'z':
        this.shapeData = [[0, 1, 1], [1, 1, 0], [0, 0, 0]];
        break;

      default:
        break;
    }
    this.setColor(color);
    // this.s = [[1, 1, 0], [0, 1, 1], [0, 0, 0]];
    // this.l = [[0, 1, 0], [0, 1, 0], [0, 1, 1]];
    // this.o = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
    // this.t = [[1, 1, 1], [0, 1, 0], [0, 0, 0]];
    // this.i = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];
    // this.p = [[0, 1, 0], [1, 1, 1], [0, 1, 0]];
    // this.pieceList = [this.s, this.l, this.o, this.t, this.i, this.p]
  }
  rotateRight() {}
  rotateLeft() {}
  setColor(color) {}
}

Piece.getRandomPiece = function() {
  debugger;
  var randomShapeLetter = possibleShapes[Math.floor(Math.random() * possibleShapes.length)];
  var randomShapeColor = possibleColors[Math.floor(Math.random() * possibleColors.length)];
  var s = new Piece(randomShapeLetter, randomShapeColor);
  console.log('s', s);
  return s;
};
