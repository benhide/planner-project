import { IRenderable, IRotatable, IScalable, ISelectable } from '../../utilities/Interfaces';
import { Dimensions, Vec2 } from '../Transform';
import { BaseWidget } from '../widgets/BaseWidget';

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
    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();

        // If its been selected change color
        ctx.fillStyle = this.isSelected && this.isHeld ? this.getColour(0.5) : this.getColour(0.9);
        ctx.strokeStyle = `rgba(0, 0, 0, 1)`;

        // Just some drawing stuff
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.w, this.dimensions.l);
        ctx.strokeRect(this.position.x, this.position.y, this.dimensions.w, this.dimensions.l);
        super.drawDetails(ctx);
    }

    // Just get the colour of te unit
    private getColour(opacity = 0.9): string {
        return `rgb(75, 75, 96, ${opacity})`;
    }
}
