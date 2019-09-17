import { Dimensions, Vec2 } from '../engine/index';
import { IRenderable, IRotatable, IScalable, ISelectable } from '../engine/Interfaces/index';
import { BaseWidget } from './index';

// The unit class which inherits from base class BaseWidget
// can be render and selected
export class Unit extends BaseWidget implements IRenderable, IRotatable, IScalable, ISelectable {
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

    // Draw the unit
    public draw(): void {
        if (this.isRotating) {
            // tslint:disable-next-line:no-console
            console.log('draw rotated');

            this.ctx.save();
            this.ctx.translate(this.position.x + this.dimensions.w * 0.5, this.position.y + this.dimensions.l * 0.5);
            this.ctx.rotate(this.angle);

            // Draw unit
            // If its been selected change color
            this.ctx.fillStyle = this.isSelected && this.isHeld ? this.getColour(0.5) : this.getColour(0.9);
            this.ctx.strokeStyle = `rgba(0, 0, 0, 1)`;

            // Just some drawing stuff
            this.ctx.fillRect(this.position.x, this.position.y, this.dimensions.w, this.dimensions.l);
            this.ctx.strokeRect(this.position.x, this.position.y, this.dimensions.w, this.dimensions.l);

            // this.ctx.translate(-(this.position.x + this.dimensions.w * 0.5), -(this.position.y + this.dimensions.l * 0.5));

            this.ctx.restore();
        } else {
            this.ctx.beginPath();

            // Draw unit
            // If its been selected change color
            this.ctx.fillStyle = this.isSelected && this.isHeld ? this.getColour(0.5) : this.getColour(0.9);
            this.ctx.strokeStyle = `rgba(0, 0, 0, 1)`;

            // Just some drawing stuff
            this.ctx.fillRect(this.position.x, this.position.y, this.dimensions.w, this.dimensions.l);
            this.ctx.strokeRect(this.position.x, this.position.y, this.dimensions.w, this.dimensions.l);
            this.drawHandle(new Vec2(0, 0));
            super.drawDetails();
        }
    }

    // Just get the colour of te unit
    private getColour(opacity = 1): string {
        return `rgb(39, 174, 96, ${opacity})`;
    }

    // Draw handle
    private drawHandle(handleSide: Vec2): void {
        this.ctx.fillStyle = this.getColour();
        this.ctx.arc(this.position.x + (this.dimensions.w / 5) * 4, this.position.y + this.dimensions.l, 5, 0, Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
    }
}
