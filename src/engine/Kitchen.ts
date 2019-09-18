import { ID } from '.';
import { Store } from '..';
import * as actions from '../redux/actions/KitchenActions';
import * as widgets from './widgets';
import * as defaults from './widgets/defaults';

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
    public widgets = new Array<widgets.BaseWidget>();

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

    // Add an item
    public addItem(width: number, length: number, x: number, y: number, isScalable: boolean, isRotatable: boolean, type: string): void {
        let item: widgets.BaseWidget;
        switch (type) {
            case 'add_unit':
                item = new widgets.Unit(
                    width,
                    length,
                    x,
                    y,
                    defaults.DEFAULT_UNIT_ZINDEX,
                    ID(defaults.DEFAULT_UNIT_ZINDEX),
                    isScalable,
                    isRotatable,
                );
                item.isSelected = true;
                item.isHeld = true;
                this.widgets.push(item);
                Store.dispatch(actions.AddUnit(item));
                break;
            case 'add_worktop':
                item = new widgets.WorkTop(
                    width,
                    length,
                    x,
                    y,
                    defaults.DEFAULT_WORKTOP_ZINDEX,
                    ID(defaults.DEFAULT_WORKTOP_ZINDEX),
                    isScalable,
                    isRotatable,
                );
                item.isSelected = true;
                item.isHeld = true;
                this.widgets.push(item);
                Store.dispatch(actions.AddWorktop(item));
                break;
            case 'add_wallunit':
                item = new widgets.WallUnit(
                    width,
                    length,
                    x,
                    y,
                    defaults.DEFAULT_WALLUNIT_ZINDEX,
                    ID(defaults.DEFAULT_WALLUNIT_ZINDEX),
                    isScalable,
                    isRotatable,
                );
                item.isSelected = true;
                item.isHeld = true;
                this.widgets.push(item);
                Store.dispatch(actions.AddWallunit(item));
                break;
            case 'add_wall':
                item = new widgets.Wall(
                    width,
                    length,
                    x,
                    y,
                    defaults.DEFAULT_WALL_ZINDEX,
                    ID(defaults.DEFAULT_WALL_ZINDEX),
                    isScalable,
                    isRotatable,
                );
                item.isSelected = true;
                item.isHeld = true;
                this.widgets.push(item);
                Store.dispatch(actions.AddWall(item));
                break;
            default:
                break;
        }

        this.sortArrayByZIndex();
    }

    // Remove an item
    public removeItem(id: number): void {
        for (let i = 0; i < this.widgets.length; i++) {
            if (this.widgets[i].id === id) {
                this.widgets.splice(i, 1);
            }
        }

        // tslint:disable-next-line:no-console
        console.log(this.widgets);
    }

    // Sort the array for what to draw first
    private sortArrayByZIndex(): void {
        this.widgets.sort((a, b) => (a.zIndex > b.zIndex ? 1 : -1));

        // tslint:disable-next-line:no-console
        console.log(this.widgets);
    }
}
