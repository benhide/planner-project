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
    public drawRemoveBox(ctx: CanvasRenderingContext2D, position: Vec2): void {
        const { x, y } = position;

        ctx.fillStyle = WHITE;
        ctx.strokeStyle = BLACK;

        ctx.fillRect(x, y, 10, 10);
        ctx.strokeRect(x, y, 10, 10);

        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.moveTo(x + 2, y + 2);
        ctx.lineTo(x + 8, y + 8);
        ctx.moveTo(x + 8, y + 2);
        ctx.lineTo(x + 2, y + 8);
        ctx.stroke();
        ctx.lineWidth = 1;
    }

    // Draw the rotating box
    public drawRotatingBox(ctx: CanvasRenderingContext2D, position: Vec2, dimensions: Dimensions): void {
        const { x, y } = position;
        const { width } = dimensions;

        ctx.fillStyle = WHITE;
        ctx.strokeStyle = BLACK;

        ctx.fillRect(x + width - 10, y, 10, 10);
        ctx.strokeRect(x + width - 10, y, 10, 10);
    }

    // Draw the guide lines
    public drawLines(
        ctx: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeight: number,
        position: Vec2,
        dimensions: Dimensions,
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
    public drawWidgetInfo(ctx: CanvasRenderingContext2D, position: Vec2, dimensions: Dimensions, id: number): void {
        const { x, y } = position;
        const { width, length } = dimensions;

        ctx.fillStyle = BLACK;
        ctx.font = '8px Arial';
        ctx.fillText(id.toString(), x + 0.5 * width - 5, y + 0.5 * length);

        const positionText = '(' + x + ':' + y + ')';
        ctx.fillText(positionText, x - 45, y - 5);

        const dim = '(' + width + ':' + length + ')';
        ctx.fillText(dim, x + width + 5, y + length + 10);
    }
}
