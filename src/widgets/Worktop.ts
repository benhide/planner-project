import { Dimensions, Vec2 } from '../engine/index';
import { IRenderable, IRotatable, IScalable, ISelectable } from '../engine/Interfaces/index';
import { BaseWidget } from './index';

// The unit class which inherits from base class BaseWidget
// can be render and selected
export class WorkTop extends BaseWidget implements IRenderable, IRotatable, IScalable, ISelectable {
    constructor(
        width: number,
        length: number,
        x: number,
        y: number,
        zIndex: number,
        id: number,
        isScalable: boolean,
        isRotatable: boolean,
    ) {
        super(new Dimensions(width, length), new Vec2(x, y), zIndex, id, isScalable, isRotatable);
    }

    // Draw the worktop
    public draw(): void {
        this.ctx.beginPath();

        // If its been selected change color
        this.ctx.fillStyle = this.isSelected && this.isHeld ? this.getColour(0.5) : this.getColour(0.9);
        this.ctx.strokeStyle = `rgba(0, 0, 0, 1)`;

        // Just some drawing stuff
        this.ctx.fillRect(this.position.x, this.position.y, this.dimensions.w, this.dimensions.l);
        this.ctx.strokeRect(this.position.x, this.position.y, this.dimensions.w, this.dimensions.l);
        super.drawDetails();
    }

    // Just get the colour of te unit
    private getColour(opacity = 0.9): string {
        return `rgb(75, 75, 96, ${opacity})`;
    }
}
