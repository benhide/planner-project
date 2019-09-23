// import { DEFAULT_UNIT_ZINDEX, DEFAULT_WALLUNIT_ZINDEX, DEFAULT_WALL_ZINDEX, DEFAULT_WORKTOP_ZINDEX } from '../Defaults';
import { BaseWidget } from '../engine/widgets/BaseWidget';
// import { Unit } from '../engine/widgets/Unit';
// import { Wall } from '../engine/widgets/Wall';
// import { WallUnit } from '../engine/widgets/WallUnit';
// import { WorkTop } from '../engine/widgets/Worktop';
// import { AddUnit, AddWall, AddWallunit, AddWorktop, RemoveUnit, RemoveWallunit, RemoveWorktop } from '../redux/actions/KitchenActions';
// import { Store } from '../redux/ConfigureStore';
// import { ID } from './ID';

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
    public widgets = new Array<BaseWidget>();

    // The canvas for reference
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    // Constructor
    private constructor() {
        // Get the canvas and context for reference
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    // Update the objects
    public update(): void {
        let itemBeingScaled = false;
        this.widgets.forEach((item) => {
            if (item.isScaling) {
                itemBeingScaled = true;
            }
        });
        if (itemBeingScaled) {
            this.widgets.forEach((item) => {
                item.isSelected = false;
                item.isHeld = false;
            });
        }
    }

    // Loop through and render objects
    public draw(): void {
        this.ctx.save();
        this.ctx.strokeStyle = `rgba(255, 255, 255, 0.5)`;
        this.ctx.setLineDash([5, 5]);

        for (let i = 0; i < this.canvas.width; i += 10) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.canvas.height);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.canvas.width, i);
            this.ctx.stroke();
        }
        this.ctx.restore();
        this.widgets.forEach((item) => {
            item.draw(this.ctx);
        });
    }

    // Only select the top widget
    public selectTopItem(): void {
        let index = -1;
        if (this.widgets.length > 0) {
            for (let i = 0; i < this.widgets.length; i++) {
                if (this.widgets[i].isSelected) {
                    index = i;
                    this.widgets[i].isSelected = false;
                }
            }
            if (index >= 0) {
                this.widgets[index].isSelected = true;
            }
        }
    }

    // Only remove the top widget
    public removeTopItem(): void {
        let index = -1;
        if (this.widgets.length > 0) {
            for (let i = 0; i < this.widgets.length; i++) {
                if (this.widgets[i].isDeleting) {
                    index = i;
                    this.widgets[i].isDeleting = false;
                }
            }
            if (index >= 0) {
                this.widgets[index].isDeleting = true;
            }
        }
    }

    // Remove an item
    public removeItem(id: number): boolean {
        for (let i = 0; i < this.widgets.length; i++) {
            if (this.widgets[i].id === id) {
                this.widgets.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    // Sort the array for what to draw first
    public sortArrayByZIndex(): void {
        this.widgets.sort((a, b) => (a.zIndex > b.zIndex ? 1 : -1));
    }

    // Canvas dimensions getters
    get canvasWidth(): number {
        return this.canvas.width;
    }
    get canvasHeight(): number {
        return this.canvas.height;
    }
}
