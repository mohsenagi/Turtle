import React, { useEffect } from 'react';
import './gridComp.css';

function Grid(props) {
    useEffect(() => {
        const canvas = document.getElementById("myGrid");
        const context = canvas.getContext("2d");

        // canvas size is 2500 by 2500 so the centre (0, 0) is (1250, -1250)
        canvas.width = 2500;
        canvas.height = 2500;
        const bw = canvas.width;
        const bh = canvas.height;

        const drawTens = () => {
            context.lineWidth = 4;
            for (let x = 50; x <= bw; x += 200) {
                context.moveTo(x, 0);
                context.lineTo(x, bh);
            }

            for (let y = 50; y <= bh; y += 200) {
                context.moveTo(0, y);
                context.lineTo(bw, y);
            }
            context.strokeStyle = "rgb(170, 170, 170)" ;
            context.stroke();
        }

        const drawFives = () => {
            context.lineWidth = 3;
            for (let x = 150; x <= bw; x += 200) {
                context.moveTo(x, 0);
                context.lineTo(x, bh);
            }

            for (let y = 150; y <= bh; y += 200) {
                context.moveTo(0, y);
                context.lineTo(bw, y);
            }
            context.strokeStyle = "rgb(170, 170, 170)" ;
            context.stroke();
        }

        const drawAxis = () => {
            context.lineWidth = 4;
            context.beginPath();
            context.strokeStyle = "rgb(170, 170, 170)";
            context.moveTo(1250, 0);
            context.lineTo(1250, 2500);
            context.stroke();

            context.beginPath();
            context.strokeStyle = "rgb(170, 170, 170)";
            context.moveTo(0, 1250);
            context.lineTo(2500, 1250);
            context.stroke();
        }

        const axesNumbers = () => {
            context.font = "45px Calibri bold";
            context.fillStyle = "rgb(130, 130, 130)";
            for (let x = 50; x <= 1050; x += 200) {
                context.fillText(`${(x/20)-62.5}`, x-10, 1240);
            }
            for (let x = 1450; x <= 2450; x += 200) {
                context.fillText(`${(x/20)-62.5}`, x+5, 1290);
            }
            for (let y = 50; y <= 1050; y += 200) {
                if (y !==1000) context.fillText(`${62.5-(y/20)}`, 1260, y+15);
            }
            for (let y = 1450; y <= 2450; y += 200) {
                if (y !==1000) context.fillText(`${62.5-(y/20)}`, 1180, y+15);
            }
        }
        drawTens();  
        drawFives();  
        drawAxis();
        axesNumbers();
    }, []);
    return (
      <div className="grid">
          <canvas id="myGrid"></canvas>
      </div>
    );
}

export {Grid}