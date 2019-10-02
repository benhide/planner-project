import * as React from 'react';
import { useSelector } from 'react-redux';
import { EventBus, GameEvent } from '../engine/EventBus';
import { Kitchen } from '../engine/Kitchen';
import { BaseWidget } from '../engine/widgets/BaseWidget';
import { Unit } from '../engine/widgets/Unit';
import { Wall } from '../engine/widgets/Wall';
import { WallUnit } from '../engine/widgets/WallUnit';
import { WorkTop } from '../engine/widgets/Worktop';
import { DEFAULT_UNIT_TYPE, DEFAULT_WALLUNIT_TYPE, DEFAULT_WALL_TYPE, DEFAULT_WORKTOP_TYPE } from '../utilities/Defaults';
import { IPlannerState, IReduxPlannerState } from '../utilities/Interfaces';
import { store } from '../redux/ConfigureStore';

// The planner class initialisation
export const Planner: React.FunctionComponent = () => {
    let widgets = new Array<BaseWidget>();

    // Width of the canvas will match width of the screen
    const sizeCanvas = (canvas: HTMLCanvasElement) => {
        canvas.width = window.innerWidth * 0.6;
        canvas.height = window.innerHeight * 0.9;
        canvas.style.padding = '0px';
        canvas.style.margin = '0px auto';
        canvas.style.marginTop = '20px';
        canvas.style.display = 'block';
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
            // console.log("mouse down on the canvas");
            const bounds = canvas.getBoundingClientRect();
            const x = e.clientX - bounds.left - scrollX;
            const y = e.clientY - bounds.top - scrollY;

            // the position of the click
            EventBus.publish(GameEvent.MouseDown, { x, y });
        });

        // Adds an event listener to where the mouse moved on the canvas
        canvas.addEventListener('mouseup', (e: MouseEvent) => {
            // Gets where the mouse has clicked on the canvas
            // console.log("mouse up on the canvas");
            const bounds = canvas.getBoundingClientRect();
            const x = e.clientX - bounds.left - scrollX;
            const y = e.clientY - bounds.top - scrollY;

            // the position of the click
            EventBus.publish(GameEvent.MouseUp, { x, y });
        });

        return canvas;
    };

    // Populate the kitchen array
    const populateWidgetArray = (kitchen: IPlannerState): BaseWidget[] => {
        // console.log(kitchen);
        return kitchen.widgets.map((widget) => {
            if (widget.type === DEFAULT_UNIT_TYPE) {
                return new Unit(
                    widget.dimensions.w,
                    widget.dimensions.l,
                    widget.position.x,
                    widget.position.y,
                    widget.zIndex,
                    widget.id,
                    widget.isScalable,
                    widget.isRotatable,
                    widget.type,
                );
            }
            if (widget.type === DEFAULT_WALLUNIT_TYPE) {
                return new WallUnit(
                    widget.dimensions.w,
                    widget.dimensions.l,
                    widget.position.x,
                    widget.position.y,
                    widget.zIndex,
                    widget.id,
                    widget.isScalable,
                    widget.isRotatable,
                    widget.type,
                );
            }
            if (widget.type === DEFAULT_WALL_TYPE) {
                return new Wall(
                    widget.dimensions.w,
                    widget.dimensions.l,
                    widget.position.x,
                    widget.position.y,
                    widget.zIndex,
                    widget.id,
                    widget.isScalable,
                    widget.isRotatable,
                    widget.type,
                );
            }
            if (widget.type === DEFAULT_WORKTOP_TYPE) {
                return new WorkTop(
                    widget.dimensions.w,
                    widget.dimensions.l,
                    widget.position.x,
                    widget.position.y,
                    widget.zIndex,
                    widget.id,
                    widget.isScalable,
                    widget.isRotatable,
                    widget.type,
                );
            }
        }) as BaseWidget[];
    };

    // Called first initialises the canvas, context and kitchen
    const init = (): void => {
        const canvas = createCanvas();
        canvas.style.border = `1px solid rgba(55, 55, 55, 0.15)`;

        const ctx = canvas.getContext('2d');
        const kitchen = Kitchen.getInstance();

        // Draw function
        const draw = () => {
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                kitchen.update();
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
