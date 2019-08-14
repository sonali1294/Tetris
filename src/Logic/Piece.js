var possibleColors = ['red', 'green', 'blue'];
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
      case 'l':
        this.shapeData = [[0, 1, 0], [0, 1, 0], [0, 1, 1]];
        break;
      case 'o':
        this.shapeData = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
        break;
      case 't':
        this.shapeData = [[1, 1, 1], [0, 1, 0], [0, 0, 0]];
        break;
      case 'i':
        this.shapeData = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];
        break;
      case 'p':
        this.shapeData = [[0, 1, 0], [1, 1, 1], [0, 1, 0]];
        break;
      case 'j':
        this.shapeData = [[0, 1, 0], [0, 1, 0], [1, 1, 0]];
        break;
      default:
        break;
    }
    this.setColor(color);
  }
  rotatePiece() {
    var currentPiece = {
      piece: { shapeData: [[0, 1, 1], [1, 1, 0], [0, 0, 0]] },
      x: 5,
      y: 2
    };
    let n = currentPiece.piece.shapeData.length - 1;
    let result = currentPiece.piece.shapeData.map((row, i) =>
      row.map((val, j) => currentPiece.piece.shapeData[n - j][i])
    );
    currentPiece.piece.shapeData.length = 0;
    currentPiece.piece.shapeData.push(...result);
    console.log(currentPiece.piece.shapeData);
  }
  shiftRight() {}
  shiftLeft() {}
  setColor(color) {}
}

Piece.getRandomPiece = function() {
  var randomShapeLetter = possibleShapes[Math.floor(Math.random() * possibleShapes.length)];
  var randomShapeColor = possibleColors[Math.floor(Math.random() * possibleColors.length)];
  var s = new Piece(randomShapeLetter, randomShapeColor);
  console.log('s', s);
  return s;
};
