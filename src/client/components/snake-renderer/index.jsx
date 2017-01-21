import React, {Component} from 'react';

export class SnakeRenderer extends Component {
    canvasContext = null;

    componentDidMount() {
        this.canvasContext.fillStyle = "green";
        this.canvasContext.fillRect(0, 0, 300, 300);
        this.canvasContext.fillRect(25,25,100,100);
        this.canvasContext.clearRect(45,45,60,60);
        this.canvasContext.strokeRect(50,50,50,50);
    }

    render() {
        return (
            <canvas ref={(canvas) => this.canvasContext = canvas.getContext('2d')} width={800} height={600}></canvas>
        )
    }
}