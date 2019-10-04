import { BLACK } from '../../utilities/Defaults';
import { IRenderable, IRotatable, IScalable, ISelectable, IWidgetInfo } from '../../utilities/Interfaces';
import { Dimensions, Vec2 } from '../Transform';
import { BaseWidget } from './BaseWidget';

// The unit class which inherits from base class BaseWidget
// can be render and selected
export class WallUnit extends BaseWidget implements IRenderable, IRotatable, IScalable, ISelectable {
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
    }

    // Draw the unit
    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();

        // If its been selected change color
        ctx.fillStyle = this.isSelected && this.isHeld ? this.getColour(0.5) : this.getColour(0.9);
        ctx.strokeStyle = BLACK;

        // Just some drawing stuff
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.length);
        ctx.strokeRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.length);
        this.drawHandle(ctx, new Vec2(0, 0));
        super.drawDetails(ctx);
    }

    // Just get the colour of te unit
    private getColour(opacity = 0.9): string {
        return `rgb(174, 174, 96, ${opacity})`;
    }

    // Draw handle
    private drawHandle(ctx: CanvasRenderingContext2D, handleSide: Vec2): void {
        ctx.fillStyle = this.getColour();
        ctx.arc(this.position.x + (this.dimensions.width / 5) * 4, this.position.y + this.dimensions.length, 5, 0, Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}
