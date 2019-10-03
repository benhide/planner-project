import * as React from 'react';
import { EventBus, GameEvent } from '../engine/EventBus';
import { Widgets } from '../engine/Widgets';

// The planner class initialisation
export const Planner: React.FunctionComponent = () => {
    // Width of the canvas will match width of the screen
    const sizeCanvas = (canvas: HTMLCanvasElement) => {
        canvas.width = window.innerWidth * 0.625;
        canvas.height = window.innerHeight * 0.875;
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

    // Called from init creates the canvas and adds it to the docuumnet
    const createCanvas = (): HTMLCanvasElement => {
        const wrapper = document.getElementById('canvasWrapper');
        const canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        if (wrapper) {
            wrapper.appendChild(canvas);
        }

        document.body.style.margin = '0px';
        sizeCanvas(canvas);

        // Adds an event listener to where the canvas has clicked
        canvas.addEventListener('click', (e: MouseEvent) => {
            // Gets where the mouse has clicked on the canvas
            const bounds = canvas.getBoundingClientRect();
            const x = e.clientX - bounds.left - scrollX;
            const y = e.clientY - bounds.top - scrollY;

            // the position of the click
            EventBus.publish(GameEvent.MouseClick, { x, y });
        });

        // Adds an event listener to where the mouse moved on the canvas
        canvas.addEventListener('mousemove', (e: MouseEvent) => {
            // Gets where the mouse has clicked on the canvas
            const bounds = canvas.getBoundingClientRect();
            const x = e.clientX - bounds.left - scrollX;
            const y = e.clientY - bounds.top - scrollY;

            // the position of the click
            EventBus.publish(GameEvent.MouseMove, { x, y });
        });

        // Adds an event listener to where the canvas has clicked
        canvas.addEventListener('mousedown', (e: MouseEvent) => {
            // Gets where the mouse has clicked on the canvas
            const bounds = canvas.getBoundingClientRect();
            const x = e.clientX - bounds.left - scrollX;
            const y = e.clientY - bounds.top - scrollY;

            // the position of the click
            EventBus.publish(GameEvent.MouseDown, { x, y });
        });

        // Adds an event listener to where the mouse moved on the canvas
        canvas.addEventListener('mouseup', (e: MouseEvent) => {
            // Gets where the mouse has clicked on the canvas
            const bounds = canvas.getBoundingClientRect();
            const x = e.clientX - bounds.left - scrollX;
            const y = e.clientY - bounds.top - scrollY;

            // the position of the click
            EventBus.publish(GameEvent.MouseUp, { x, y });
        });

        return canvas;
    };

    // Called first initialises the canvas, context and kitchen
    const init = (): void => {
        const canvas = createCanvas();
        styleCanvas(canvas);

        const ctx = canvas.getContext('2d');
        const kitchen = Widgets.get();

        // Draw function
        const draw = () => {
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                kitchen.draw();
                window.requestAnimationFrame(draw);
            }
        };

        // Draw called
        draw();
    };

    // When the dom has loaded initialise!
    window.addEventListener('DOMContentLoaded', () => init());

    // Return the canvas wrapper id
    return <div id="canvasWrapper" />;
};
