import React, {Component} from 'react';
import {createMatrix} from '../Utils';

class Board extends Component {
    constructor(){
        super();
        this.draw= this.draw.bind(this);
    }

    draw(){
        this.props.matrix.forEach( (row, y) => {
            row.forEach( (col, x) => {
                this.ctx.fillStyle = (col === 1) ? 'Red' : 'Black';
                this.ctx.fillRect(x,y,1,1);
            })
        })

        this.props.piece.forEach( (row,y) => {
            row.forEach( (col, x) => {
                this.ctx.fillStyle = (col === 1) ? 'Red' : 'Black';
                this.ctx.fillRect(x,y,1,1);
            })
        })

    }
    
    componentDidMount(){
        this.canvas = this.refs.canvas;
        if(this.canvas){
            this.ctx = this.canvas.getContext('2d');
            this.ctx.fillStyle = 'black';
            this.ctx.scale(20,20);
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        this.draw();
    }

    
    render(){
        return(
            <canvas 
                style={{marginLeft: 20, marginTop: 20}}
                ref={'canvas'} width={300} height={600} />
        )
    }
}

export default Board 