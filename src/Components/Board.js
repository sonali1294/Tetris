import React, { Component } from 'react';
// import { createMatrix } from '../Utils';
import { Game } from '../Logic/Game';

class Board extends Component {
  constructor() {
    super();
    // this.draw= this.draw.bind(this);
    var game = new Game();
    this.state = {
      data: game.data
    };
    game.isAnyRowFull();
    game.onUpdate(() => {
      this.setState({
        data: game.data
      });
    });
    window.game = game;
  }

  setColours = (num) => {
    return num !== 0
      ? (num === 'R' ? 'redClass' : null) || (num === 'P' ? 'purpleClass' : null) || (num === 'G' ? 'greenClass' : null)
      : 'blackClass';
  };

  // draw(){
  //     this.props.matrix.forEach( (row, y) => {
  //         row.forEach( (col, x) => {
  //             this.ctx.fillStyle = (col === 1) ? 'Red' : 'Black';
  //             this.ctx.fillRect(x,y,1,1);
  //         })
  //     })

  //     this.props.piece.forEach( (row,y) => {
  //         row.forEach( (col, x) => {
  //             this.ctx.fillStyle = (col === 1) ? 'Red' : 'Black';
  //             this.ctx.fillRect(x,y,1,1);
  //         })
  //     })

  // }

  // componentDidMount(){
  //     this.canvas = this.refs.canvas;
  //     if(this.canvas){
  //         this.ctx = this.canvas.getContext('2d');
  //         this.ctx.fillStyle = 'black';
  //         this.ctx.scale(20,20);
  //         this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  //     }
  //     this.draw();
  // }

  componentDidMount() {}
  render() {
    return (
      <table>
        <tbody>
          {this.state.data.map((numList, i) => (
            <tr key={i}>
              {numList.map((num, j) => (
                <td className={`block ${this.setColours(num)}`} key={j}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Board;
