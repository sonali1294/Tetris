var possibleColors = ['red', 'green', 'blue', 'purple', 'orange'];
var possibleShapes = ['z', 's', 'j', 't', 'l', 'o', 'i'];

export class Piece {
  constructor(type, color) {
    switch (type) {
      case 's':
        this.shapeData = [[0, 1, 1], [1, 1, 0], [0, 0, 0]];
        break;
      case 'z':
        this.shapeData = [[1, 1, 0], [0, 1, 1], [0, 0, 0]];
        break;
      case 'j':
        this.shapeData = [[0, 1, 0], [0, 1, 0], [1, 1, 0]];
        break;
      case 't':
        this.shapeData = [[0, 0, 0], [1, 1, 1], [0, 1, 0]];
        break;
      case 'l':
        this.shapeData = [[0, 1, 0], [0, 1, 0], [0, 1, 1]];
        break;
      case 'o':
        this.shapeData = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
        break;
      case 'i':
        this.shapeData = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];
        break;

      default:
        break;
    }
    this.setColor(color);
  }
  rotateRight() {}
  rotateLeft() {}
  setColor(color) {}
}

Piece.getRandomPiece = function() {
  var randomShapeLetter = possibleShapes[Math.floor(Math.random() * possibleShapes.length)];
  var randomShapeColor = possibleColors[Math.floor(Math.random() * possibleColors.length)];
  // console.log('random color is', randomShapeColor);
  var s = new Piece(randomShapeLetter, randomShapeColor);
  console.log('random shape is', s);
  return s;
};
