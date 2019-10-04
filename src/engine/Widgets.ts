import { GREY } from '../utilities/Defaults';
import { getCanvas } from './CanvasReferences';
import { BaseWidget } from './widgets/BaseWidget';

// The kitchen class
export class Widgets {
    // Singleton
    public static get(): Widgets {
        if (!Widgets.instance) {
            Widgets.instance = new Widgets();
        }
        return Widgets.instance;
    }
    // Singleton
    private static instance: Widgets;

    // Array of objects of type BaseWidget
    private _widgets = new Array<BaseWidget>();
    private _lastSelected: BaseWidget | null = null;

    // The rendering context
    private _ctx: CanvasRenderingContext2D;

    // Constructor
    private constructor() {
        this._ctx = getCanvas().getContext('2d') as CanvasRenderingContext2D;
    }

    // Update the objects
    public update(): void {}

    // Loop through and render objects
    public draw(): void {
        this.drawGrid();

        // Draw the widget items
        this._widgets.forEach((widget) => {
            widget.draw(this._ctx);
        });
    }

    // Draw the canvas grid
    private drawGrid(): void {
        const { width, height } = getCanvas();

        // Draw the grid on the canvas
        this._ctx.save();
        this._ctx.strokeStyle = GREY;
        this._ctx.setLineDash([1, 1]);
        this._ctx.lineWidth = 0.5;

        for (let i = 0; i < width; i += 10) {
            this._ctx.beginPath();
            this._ctx.moveTo(i, 0);
            this._ctx.lineTo(i, height);
            this._ctx.stroke();

            this._ctx.beginPath();
            this._ctx.moveTo(0, i);
            this._ctx.lineTo(width, i);
            this._ctx.stroke();
        }
        this._ctx.restore();
    }

    // Add to widget array
    public addWidget(widget: BaseWidget): void {
        this._widgets.push(widget);
        this._widgets.sort((a, b) => (a.zIndex > b.zIndex ? 1 : -1));
        this._lastSelected = widget;
    }

    // Remove from widget array
    public removeWidget(widget: BaseWidget): void {
        this._widgets.splice(this._widgets.indexOf(widget), 1);
    }

    // Reset the kitchen to defualt values
    public resetWidgets(): void {
        this._widgets = [];
    }

    // Update the widgets
    public updateWidgets(widgets: BaseWidget[]): void {
        this._widgets = widgets;
    }

    // Set the widget as selected
    public setSelected(pos: number, selected: boolean): void {
        this._widgets[pos].isSelected = selected;
        this._widgets[pos].isHeld = selected;
    }

    // Is the widget selected
    public isSelected(pos: number): boolean {
        return this._widgets[pos].isSelected;
    }

    // Set the widget as deleting
    public setDeleting(pos: number, deleting: boolean): void {
        this._widgets[pos].isDeleting = deleting;
    }

    // Is the widget being deleted
    public isDeleting(pos: number): boolean {
        return this._widgets[pos].isDeleting;
    }

    // Is the widget being scaled
    public isScaling(pos: number): boolean {
        return this._widgets[pos].isScaling;
    }
}
