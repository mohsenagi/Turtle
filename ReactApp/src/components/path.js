import React, { useEffect } from 'react';

function Path(props) {
    let {id, arraysDict, lineColour, lineWidth, dotSize, dotColor} = props;

    useEffect(() => {
        let locationHistory = arraysDict.locationHistory;
        let duplicates = arraysDict.duplicates;
        const canvas = document.getElementById(id);
        const context = canvas.getContext("2d");

        // canvas size is 2500 by 2500 so the centre (0, 0) is (1250, -1250)
        canvas.width = 2500;
        canvas.height = 2500;
        
        context.clearRect(0, 0, canvas.width, canvas.height);

        const drawDot = (centerX, centerY, dotSize, dotColor, lineWidth) => {
            
            // convert location's X and Y to the corresponding point on Canvas
            let centerXCanvas = 1250+centerX*20;
            let centerYCanvas = 1250-centerY*20;
            
            context.beginPath();
            context.arc(centerXCanvas, centerYCanvas, dotSize, 0, 2 * Math.PI, false);
            context.fillStyle = dotColor;
            context.fill();
            context.lineWidth = lineWidth;
            context.strokeStyle = dotColor;
            context.stroke();
        };
        
        const drawStep = (startIndex, locationHistory, lineWidth, lineColour, duplicates, dotSize, dotColor) => {
            if (locationHistory.length > 0){
                let [startX, startY] = locationHistory[startIndex];
                if (startIndex === locationHistory.length-1) {
    
                    // setTimeout is used to delay the drawing of the final point after the path is drawn
                    setTimeout(() => {
                        drawDot(startX, startY, dotSize*3, "rgb(0, 0, 0)");
                    }, 500);
    
                    // setTimeout is used to delay the drawing of the duplicate points after the path and final point are drawn
                    setTimeout(() => {
                        for (let j = 0; j < duplicates.length; j++) {
                            drawDot(duplicates[j][0], duplicates[j][1], dotSize, dotColor, lineWidth);
                        };
                    }, 750);

                    clearInterval(interval);
                
                } else {
                    let [endX, endY] = locationHistory[startIndex+1];
                    
                    // convert location's X and Y to the corresponding point on Canvas
                    let startXCanvas = 1250+startX*20;
                    let startYCanvas = 1250-startY*20;
                    let endXCanvas = 1250+endX*20;
                    let endYCanvas = 1250-endY*20;
                    
                    context.lineWidth = lineWidth;
                    context.strokeStyle = lineColour;
                    context.beginPath();
                    context.moveTo(startXCanvas, startYCanvas);
                    context.lineTo(endXCanvas, endYCanvas);
                    context.stroke();
                    i+=1;
                };
            } else {
                clearInterval(interval);
            }
        };

        let i = 0;
        // setInterval is used to animate the drawing of the path
        let interval = setInterval(() => drawStep(i, locationHistory, lineWidth, lineColour, duplicates, dotSize, dotColor), 10);

        return () => clearInterval(interval); // to clean up before the component is updated
    });

    return (
        <div className="grid">
            <canvas id={id}></canvas>
        </div>
    );
};

export { Path };