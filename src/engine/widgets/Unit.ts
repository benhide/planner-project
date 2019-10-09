import { BLACK } from '../../utilities/Defaults';
import { IRenderable, IRotatable, IScalable, ISelectable, IWidgetInfo } from '../../utilities/Interfaces';
import { Dimensions, Vec2 } from '../Transform';
import { BaseWidget } from './BaseWidget';

// The unit class which inherits from base class BaseWidget
// can be render and selected
export class Unit extends BaseWidget implements IRenderable, IRotatable, IScalable, ISelectable {
    // private _points: Vec2[];

    // Constructor
    constructor(
        width: number,
        length: number,
        x: number,
        y: number,
        zIndex: number,
        id: number,
        isScalable: boolean,
        isRotatable: boolean,
        type: string,
        widgetInfo: IWidgetInfo,
    ) {
        super(new Dimensions(width, length), new Vec2(x, y), zIndex, id, isScalable, isRotatable, type, widgetInfo);
        // this._points = Array<Vec2>(4);
        // this._points[0] = new Vec2(this.position.x, this.position.y);
        // this._points[1] = new Vec2(this.position.x + this.dimensions.width, this.position.y);
        // this._points[2] = new Vec2(this.position.x + this.dimensions.width, this.position.y + this.dimensions.length);
        // this._points[3] = new Vec2(this.position.x, this.position.y + this.dimensions.length);
    }

    // Draw the unit
    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();

        // Draw unit
        // If its been selected change color
        ctx.fillStyle = this.isSelected && this.isHeld ? this.getColour(0.5) : this.getColour(0.9);
        ctx.strokeStyle = BLACK;

        this._worldPoints = [];
        for (const p of this._points) {
            const worldPoint = this.position.add(p.rotate(this._angle));
            this._worldPoints.push(worldPoint);
        }

        ctx.moveTo(this._worldPoints[0].x, this._worldPoints[0].y);
        for (const point of this._worldPoints) {
            ctx.lineTo(point.x, point.y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        // Just some drawing stuff
        // ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.length);
        // ctx.strokeRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.length);
        this.drawHandle(ctx, new Vec2(0, 0));
        super.drawDetails(ctx);
    }

    // Just get the colour of te unit
    private getColour(opacity = 1): string {
        const { r, g, b } = this.widgetInfo.color;
        return `rgb(${r}, ${g}, ${b}, ${opacity})`;
    }

    // Draw handle
    private drawHandle(ctx: CanvasRenderingContext2D, handleSide: Vec2): void {
        ctx.fillStyle = this.getColour();
        ctx.moveTo(this.position.x + (this.dimensions.width / 5) * 4, this.position.y + this.dimensions.length);
        ctx.arc(this.position.x + (this.dimensions.width / 5) * 4, this.position.y + this.dimensions.length, 5, 0, Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}

// if (this.isRotating) {
//     // tslint:disable-next-line:no-console
//     console.log('draw rotated');

//     ctx.save();
//     ctx.translate(this.position.x + this.dimensions.w * 0.5, this.position.y + this.dimensions.l * 0.5);
//     ctx.rotate(this.angle);

//     // Draw unit
//     // If its been selected change color
//     ctx.fillStyle = this.isSelected && this.isHeld ? this.getColour(0.5) : this.getColour(0.9);
//     ctx.strokeStyle = `rgba(0, 0, 0, 1)`;

//     // Just some drawing stuff
//     ctx.fillRect(this.position.x, this.position.y, this.dimensions.w, this.dimensions.l);
//     ctx.strokeRect(this.position.x, this.position.y, this.dimensions.w, this.dimensions.l);

//     // ctx.translate(-(this.position.x + this.dimensions.w * 0.5), -(this.position.y + this.dimensions.l * 0.5));

//     ctx.restore();
// } else {
