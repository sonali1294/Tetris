export class Game {
  data = [
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
    ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R']
  ];

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

  onUpdate(callback) {
    this.callback = callback;
  }
  sendUpdate() {
    this.callback();
  }
  checkFor() {
    this.data[0][0] = 'R';
    this.sendUpdate();
  }
}
