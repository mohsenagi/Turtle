import React, { useEffect } from 'react';

function Path(props) {
    let {id, arraysDic, lineColour, lineWidth, dotSize, dotColor} = props;

    useEffect(() => {
        let locationHistory = arraysDic.locationHistory;
        let duplicates = arraysDic.duplicates;
        const canvas = document.getElementById(id);
        const context = canvas.getContext("2d");
        canvas.width = 2500;
        canvas.height = 2500;
        context.clearRect(0, 0, canvas.width, canvas.height);

        const drawDot = (centerX, centerY, dotSize, dotColor, lineWidth, timeFactor) => {
            let centerXCanvas = 1250+centerX*20;
            let centerYCanvas = 1250-centerY*20;
            setTimeout(() => {
                context.beginPath();
                context.arc(centerXCanvas, centerYCanvas, dotSize, 0, 2 * Math.PI, false);
                context.fillStyle = dotColor;
                context.fill();
                context.lineWidth = lineWidth;
                context.strokeStyle = dotColor;
                context.stroke();
            }, timeFactor*10);
        };
        
        const drawStep = (startIndex, locationHistory, lineWidth, lineColour, duplicates, dotSize, dotColor) => {
            let [startX, startY] = locationHistory[startIndex];
            if (startIndex === locationHistory.length-1) {
                setTimeout(() => {
                    drawDot(startX, startY, dotSize*3, "rgb(0, 0, 0)", 0);
                    for (let j = 0; j < duplicates.length; j++) {
                        drawDot(duplicates[j][0], duplicates[j][1], dotSize, dotColor, lineWidth, 50);
                    };
                }, startIndex*10+500);
            } else {
                let [endX, endY] = locationHistory[startIndex+1];
                let startXCanvas = 1250+startX*20;
                let startYCanvas = 1250-startY*20;
                let endXCanvas = 1250+endX*20;
                let endYCanvas = 1250-endY*20;
                setTimeout(() => {
                    context.lineWidth = lineWidth;
                    context.strokeStyle = lineColour;
                    context.beginPath();
                    context.moveTo(startXCanvas, startYCanvas);
                    context.lineTo(endXCanvas, endYCanvas);
                    context.stroke();
                }, (startIndex+1)*10);
            };
        };

        for (let i = 0; i < locationHistory.length; i++) {
            drawStep(i, locationHistory, lineWidth, lineColour, duplicates, dotSize, dotColor);
        };
    });

    return (
        <div className="grid">
            <canvas id={id}></canvas>
        </div>
    );
};

export { Path };