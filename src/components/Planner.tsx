import * as React from 'react';
import { EventBus, GameEvent } from '../engine/EventBus';
import { Widgets } from '../engine/Widgets';

// Adds an event listener to where the mouse moved on the canvas
function onMouseMove(canvas: HTMLCanvasElement | null, e: React.MouseEvent) {
    // Check it exsists
    if (!canvas) {
        return;
    }
    // Gets where the mouse has clicked on the canvas
    const bounds = canvas.getBoundingClientRect();
    const x = e.clientX - bounds.left - scrollX;
    const y = e.clientY - bounds.top - scrollY;

    // the position of the click
    EventBus.publish(GameEvent.MouseMove, { x, y });
}

// Adds an event listener to where the canvas has clicked
function onMouseDown(canvas: HTMLCanvasElement | null, e: React.MouseEvent) {
    // Check it exsists
    if (!canvas) {
        return;
    }
    // Gets where the mouse has clicked on the canvas
    const bounds = canvas.getBoundingClientRect();
    const x = e.clientX - bounds.left - scrollX;
    const y = e.clientY - bounds.top - scrollY;

    // the position of the click
    EventBus.publish(GameEvent.MouseDown, { x, y });
}

// Adds an event listener to where the mouse moved on the canvas
function onMouseUp(canvas: HTMLCanvasElement | null, e: React.MouseEvent) {
    if (!canvas) {
        return;
    }
    // Gets where the mouse has clicked on the canvas
    const bounds = canvas.getBoundingClientRect();
    const x = e.clientX - bounds.left - scrollX;
    const y = e.clientY - bounds.top - scrollY;

    // the position of the click
    EventBus.publish(GameEvent.MouseUp, { x, y });
}

// The planner class initialisation
export const Planner: React.FunctionComponent = () => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    React.useEffect(() => {
        const { current: canvas } = canvasRef;

        // Check it exsists
        if (!canvas) {
            return;
        }

        // Style the canvas
        styleCanvas(canvas);
        const ctx = canvas.getContext('2d');
        const kitchen = Widgets.get();

        // Draw function
        const draw = () => {
            if (ctx) {
                // Width and height of the canvas 
                canvas.width = window.innerWidth * 0.825;
                canvas.height = window.innerHeight * 0.875;
                canvas.style.position = 'absolute';
                canvas.style.left = '17%';

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                kitchen.draw();
                window.requestAnimationFrame(draw);
            }
        };

        // Draw called
        draw();
    }, [canvasRef]);

    // Return the canvas wrapper id
    return (
        <div id="canvasWrapper">
            <canvas
                id="canvas"
                ref={canvasRef}
                onMouseMove={(e) => onMouseMove(canvasRef.current, e)}
                onMouseDown={(e) => onMouseDown(canvasRef.current, e)}
                onMouseUp={(e) => onMouseUp(canvasRef.current, e)}
            ></canvas>
        </div>
    );
};

// Style the canvas
const styleCanvas = (canvas: HTMLCanvasElement): void => {
    canvas.style.padding = '0px';
    canvas.style.margin = '0px auto';
    canvas.style.marginTop = '20px';
    canvas.style.zIndex = '-10';
    canvas.style.display = 'block';
    canvas.style.border = `0.1px solid rgba(224, 224, 224, 1)`;
    canvas.style.boxShadow = `0px 5px 5px 1px rgba(224, 224, 224, 1)`;
};
