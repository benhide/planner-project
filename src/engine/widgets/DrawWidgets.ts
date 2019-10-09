import { BLACK, GREY, WHITE } from '../../utilities/Defaults';
import { Dimensions, Vec2 } from '../Transform';

// Draws additional widget detail
export class DrawWidgets {
    // Draw box for scaling
    public drawScalingBox(ctx: CanvasRenderingContext2D, position: Vec2, dimensions: Dimensions): void {
        const { x, y } = position;
        const { width, length } = dimensions;

        ctx.fillStyle = WHITE;
        ctx.strokeStyle = BLACK;

        ctx.fillRect(x + width - 10, y + length - 10, 10, 10);
        ctx.strokeRect(x + width - 10, y + length - 10, 10, 10);
    }

    // Draw box for scaling
    public drawRemoveBox(ctx: CanvasRenderingContext2D, position: Vec2, dimensions: Dimensions, degrees: number): void {
        const { x, y } = position;
        const { width, length } = dimensions;

        const { x: x1, y: y1 } = this.rotateAroundPoint(degrees, new Vec2(x - width * 0.5, y - length * 0.5), position);
        const { x: x2, y: y2 } = this.rotateAroundPoint(degrees, new Vec2(x - width * 0.4, y - length * 0.5), position);
        const { x: x3, y: y3 } = this.rotateAroundPoint(degrees, new Vec2(x - width * 0.4, y - length * 0.4), position);
        const { x: x4, y: y4 } = this.rotateAroundPoint(degrees, new Vec2(x - width * 0.5, y - length * 0.4), position);

        ctx.fillStyle = WHITE;
        ctx.strokeStyle = BLACK;

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x4, y4);
        ctx.closePath();
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.fill();

        // ctx.beginPath();
        // ctx.lineWidth = 1.5;
        // ctx.moveTo(x + 2, y + 2);
        // ctx.lineTo(x + 8, y + 8);
        // ctx.moveTo(x + 8, y + 2);
        // ctx.lineTo(x + 2, y + 8);
        // ctx.stroke();
        // ctx.lineWidth = 1;
    }

    // Draw the rotating box
    public drawRotatingBox(ctx: CanvasRenderingContext2D, position: Vec2, dimensions: Dimensions, degrees: number): void {
        const { x, y } = position;
        const { width, length } = dimensions;

        const { x: x1, y: y1 } = this.rotateAroundPoint(degrees, new Vec2(x + width * 0.5, y - length * 0.5), position);
        const { x: x2, y: y2 } = this.rotateAroundPoint(degrees, new Vec2(x + width * 0.4, y - length * 0.5), position);
        const { x: x3, y: y3 } = this.rotateAroundPoint(degrees, new Vec2(x + width * 0.4, y - length * 0.4), position);
        const { x: x4, y: y4 } = this.rotateAroundPoint(degrees, new Vec2(x + width * 0.5, y - length * 0.4), position);

        ctx.fillStyle = WHITE;
        ctx.strokeStyle = BLACK;

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x4, y4);
        ctx.closePath();
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.fill();
    }

    // Draw the guide lines
    public drawLines(
        ctx: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeight: number,
        position: Vec2,
        dimensions: Dimensions,
        worldPoints: Vec2[],
    ): void {
        const { x, y } = position;
        const { width, length } = dimensions;

        ctx.save();
        ctx.strokeStyle = GREY;

        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + width, 0);
        ctx.lineTo(x + width, canvasHeight);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, y + length);
        ctx.lineTo(canvasWidth, y + length);
        ctx.stroke();

        ctx.restore();
    }

    // Draw widget info
    public drawWidgetInfo(ctx: CanvasRenderingContext2D, position: Vec2, dimensions: Dimensions, id: number, degrees: number): void {
        const { x, y } = position;
        const { width, length } = dimensions;

        // const { x: x1, y: y1 } = this.rotateAroundPoint(degrees, new Vec2(x - width * 0.35, y - length * 0.35), position);
        // const { x: x2, y: y2 } = this.rotateAroundPoint(degrees, new Vec2(x + width * 0.1, y + length * 0.45), position);

        ctx.fillStyle = BLACK;
        ctx.font = '8px Arial';
        ctx.fillText(id.toString(), x, y);

        // const positionText = '(' + x + ':' + y + ')';
        // ctx.fillText(positionText, x1, y1);

        // const dim = '(' + width + ':' + length + ')';
        // ctx.fillText(dim, x2, y2);
    }

    private rotateAroundPoint(degrees: number, point: Vec2, centerPoint: Vec2): Vec2 {
        const theta = degrees * (Math.PI / -180);
        const sin = Math.sin(theta);
        const cos = Math.cos(theta);

        const newX = (point.x - centerPoint.x) * cos + (point.y - centerPoint.y) * sin + centerPoint.x;
        const newY = (point.y - centerPoint.y) * cos - (point.x - centerPoint.x) * sin + centerPoint.y;

        return new Vec2(newX, newY);
    }
}

// // Draw box for scaling
// public drawRemoveBox(ctx: CanvasRenderingContext2D, dimensions: Dimensions, worldPoints: Vec2[]): void {
//     const { width, length } = dimensions;
//     ctx.fillStyle = WHITE;
//     ctx.strokeStyle = BLACK;

//     ctx.beginPath();
//     ctx.lineWidth = 2;
//     ctx.moveTo(worldPoints[0].x, worldPoints[0].y);
//     ctx.lineTo(worldPoints[1].x - width * 0.9, worldPoints[1].y);
//     ctx.lineTo(worldPoints[2].x - width * 0.9, worldPoints[2].y - length * 0.9);
//     ctx.lineTo(worldPoints[3].x, worldPoints[3].y - length * 0.9);
//     ctx.closePath();
//     ctx.stroke();
//     ctx.lineWidth = 1;
//     ctx.fill();

//     // ctx.fillRect(x, y, 10, 10);
//     // ctx.strokeRect(x, y, 10, 10);

//     // ctx.beginPath();
//     // ctx.lineWidth = 1.5;
//     // ctx.moveTo(x + 2, y + 2);
//     // ctx.lineTo(x + 8, y + 8);
//     // ctx.moveTo(x + 8, y + 2);
//     // ctx.lineTo(x + 2, y + 8);
//     // ctx.stroke();
//     // ctx.lineWidth = 1;
// }

// // Draw the rotating box
// public drawRotatingBox(ctx: CanvasRenderingContext2D, position: Vec2, dimensions: Dimensions, worldPoints: Vec2[]): void {
//     const { width, length } = dimensions;

//     ctx.fillStyle = WHITE;
//     ctx.strokeStyle = BLACK;

//     ctx.beginPath();
//     ctx.lineWidth = 2;
//     ctx.moveTo(worldPoints[0].x + width * 0.9, worldPoints[0].y);
//     ctx.lineTo(worldPoints[1].x, worldPoints[1].y);
//     ctx.lineTo(worldPoints[2].x, worldPoints[2].y - length * 0.9);
//     ctx.lineTo(worldPoints[3].x + width * 0.9, worldPoints[3].y - length * 0.9);
//     ctx.closePath();
//     ctx.stroke();
//     ctx.lineWidth = 1;
//     ctx.fill();
// }
