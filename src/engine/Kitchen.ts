import { BaseWidget } from './widgets/BaseWidget';

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

    // Current kitchen id
    private _kitchenId: number = 0;

    // The canvas for reference
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    // Constructor
    private constructor() {
        // Get the canvas and context for reference
        this._canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D;
    }

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
        // Draw the grid on the canvas
        this._ctx.save();
        this._ctx.strokeStyle = `rgba(255, 255, 255, 0.5)`;
        this._ctx.setLineDash([5, 5]);

        for (let i = 0; i < this._canvas.width; i += 10) {
            this._ctx.beginPath();
            this._ctx.moveTo(i, 0);
            this._ctx.lineTo(i, this._canvas.height);
            this._ctx.stroke();

            this._ctx.beginPath();
            this._ctx.moveTo(0, i);
            this._ctx.lineTo(this._canvas.width, i);
            this._ctx.stroke();
        }
        this._ctx.restore();

        // Draw the widget items
        this._widgets.forEach((item) => {
            item.draw(this._ctx);
        });
    }

    // Only select the top widget
    public selectTopItem(): void {
        let index = -1;
        if (this._widgets.length > 0) {
            for (let i = 0; i < this._widgets.length; i++) {
                if (this._widgets[i].isSelected) {
                    index = i;
                    this._widgets[i].isSelected = false;
                }
            }
            if (index >= 0) {
                this._widgets[index].isSelected = true;
            }
        }
    }

    // Only remove the top widget
    public removeTopItem(): void {
        let index = -1;
        if (this._widgets.length > 0) {
            for (let i = 0; i < this._widgets.length; i++) {
                if (this._widgets[i].isDeleting) {
                    index = i;
                    this._widgets[i].isDeleting = false;
                }
            }
            if (index >= 0) {
                this._widgets[index].isDeleting = true;
            }
        }
    }

    // Remove an item
    public removeItem(id: number): boolean {
        for (let i = 0; i < this._widgets.length; i++) {
            if (this._widgets[i].id === id) {
                this._widgets.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    // Sort the array for what to draw first
    public sortArrayByZIndex(): void {
        this._widgets.sort((a, b) => (a.zIndex > b.zIndex ? 1 : -1));
    }

    // Canvas dimensions getters
    public get canvasWidth(): number {
        return this._canvas.width;
    }
    public get canvasHeight(): number {
        return this._canvas.height;
    }

    // Kitchen id getters and setters
    public get kitchenID(): number {
        return this._kitchenId;
    }
    public set kitchenID(id: number) {
        if (id >= 0) {
            this._kitchenId = id;
        }
        // console.log('from kitchen id: ' + this._kitchenId);
    }

    // Get access to the widgets array
    public get widgets(): BaseWidget[] {
        return this._widgets;
    }
}
