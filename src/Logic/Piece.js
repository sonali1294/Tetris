var possibleColors = ['red', 'green', 'blue', 'purple', 'orange', 'yellow'];
var possibleShapes = ['z', 's', 'l', 'o', 't', 'p', 'i', 'j'];

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
        this.shapeData = [[1, 1], [1, 1]];
        break;
      case 'i':
        this.shapeData = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];
        break;
      case 'p':
        this.shapeData = [[0, 1, 0], [1, 1, 1], [0, 1, 0]];
        break;
      default:
        break;
    }
    this.setColor(color);
  }
  rotatePiece() {
    let n = this.shapeData.length - 1;
    let result = this.shapeData.map((row, i) => row.map((val, j) => this.shapeData[n - j][i]));
    this.shapeData.length = 0;
    this.shapeData.push(...result);
    console.log(this.shapeData);
  }
  shiftRight() {}
  shiftLeft() {}
  setColor(color) {
    this.shapeData.map((row, y) => {
      row.map((val, x) => {
        if (val !== 0) {
          this.shapeData[y][x] = color[0].toUpperCase();
        }
      });
    });
  }
}

Piece.getRandomPiece = function() {
  var randomShapeLetter = possibleShapes[Math.floor(Math.random() * possibleShapes.length)];
  var randomShapeColor = possibleColors[Math.floor(Math.random() * possibleColors.length)];
  var s = new Piece(randomShapeLetter, randomShapeColor);
  return s;
};
console.log('test', Piece.getRandomPiece());
