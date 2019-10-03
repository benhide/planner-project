import { GREY } from '../utilities/Defaults';
import { canvasHeight, canvasWidth, getCtx } from './CanvasReferences';
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

    // Constructor
    private constructor() {}

    // Update the objects
    public update(): void {}

    // Loop through and render objects
    public draw(): void {
        // Get the context darw the grid
        const ctx = getCtx();
        this.drawGrid(ctx);

        // Draw the widget items
        this._widgets.forEach((widget) => {
            widget.draw(ctx);
        });
    }

    // Draw the canvas grid
    private drawGrid(ctx: CanvasRenderingContext2D): void {
        const cw = canvasWidth();
        const ch = canvasHeight();

        // Draw the grid on the canvas
        ctx.save();
        ctx.strokeStyle = GREY;
        ctx.setLineDash([1, 1]);
        ctx.lineWidth = 0.5;

        for (let i = 0; i < cw; i += 10) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, ch);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(cw, i);
            ctx.stroke();
        }
        ctx.restore();
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
