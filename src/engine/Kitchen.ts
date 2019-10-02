
import { BaseWidget } from './widgets/BaseWidget';
import { getCtx, canvasWidth, canvasHeight } from './CanvasReferences';

// The kitchen class
export class Kitchen {
    // Singleton
    public static getInstance(): Kitchen {
        if (!Kitchen.instance) {
            Kitchen.instance = new Kitchen();
        }
        return Kitchen.instance;
    }
    // Singleton
    private static instance: Kitchen;

    // Array of objects of type BaseWidget
    private _widgets = new Array<BaseWidget>();

    // Constructor
    private constructor() {}

    // Update the objects
    public update(): void {
        let itemBeingScaled = false;
        this._widgets.forEach((item) => {
            if (item.isScaling) {
                itemBeingScaled = true;
            }
        });
        if (itemBeingScaled) {
            this._widgets.forEach((item) => {
                item.isSelected = false;
                item.isHeld = false;
            });
        }
    }

    // Loop through and render objects
    public draw(): void {
        const ctx = getCtx();
        const cw = canvasWidth();
        const ch = canvasHeight();

        // Draw the grid on the canvas
        ctx.save();
        ctx.strokeStyle = `rgba(55, 55, 55, 0.5)`;
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

        // Draw the widget items
        this._widgets.forEach((item) => {
            item.draw(ctx);
        });
    }

    // Get access to the widgets array
    public get widgets(): BaseWidget[] {
        return this._widgets;
    }

    // Update the widgets array
    public pushToWidgetArray(widget: BaseWidget): void {
        this.widgets.push(widget);
        this._widgets.sort((a, b) => (a.zIndex > b.zIndex ? 1 : -1));
    }

    // Reset the kitchen to defualt values
    public resetWidgets(): void {
        this._widgets = [];
    }
    public updateWidgets(widgets: BaseWidget[]): void {
        this._widgets = widgets;
    }
}
