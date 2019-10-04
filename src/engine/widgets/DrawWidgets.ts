import { BLACK, GREY, WHITE } from '../../utilities/Defaults';
import { Dimensions, Vec2 } from '../Transform';

// Draws additional widget detail
export class DrawWidgets {
    // Draw box for scaling
    public drawScalingBox(ctx: CanvasRenderingContext2D, position: Vec2, dimensions: Dimensions): void {
        ctx.fillStyle = WHITE;
        ctx.strokeStyle = BLACK;

        ctx.fillRect(position.x + dimensions.width - 10, position.y + dimensions.length - 10, 10, 10);
        ctx.strokeRect(position.x + dimensions.width - 10, position.y + dimensions.length - 10, 10, 10);
    }

    // Draw box for scaling
    public drawRemoveBox(ctx: CanvasRenderingContext2D, position: Vec2, dimensions: Dimensions): void {
        ctx.fillStyle = WHITE;
        ctx.strokeStyle = BLACK;

        ctx.fillRect(position.x, position.y, 10, 10);
        ctx.strokeRect(position.x, position.y, 10, 10);

        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.moveTo(position.x + 2, position.y + 2);
        ctx.lineTo(position.x + 8, position.y + 8);
        ctx.moveTo(position.x + 8, position.y + 2);
        ctx.lineTo(position.x + 2, position.y + 8);
        ctx.stroke();
        ctx.lineWidth = 1;
    }

    // Draw the rotating box
    public drawRotatingBox(ctx: CanvasRenderingContext2D, position: Vec2, dimensions: Dimensions): void {
        ctx.fillStyle = WHITE;
        ctx.strokeStyle = BLACK;

        ctx.fillRect(position.x + dimensions.width - 10, position.y, 10, 10);
        ctx.strokeRect(position.x + dimensions.width - 10, position.y, 10, 10);
    }

    // Draw the guide lines
    public drawLines(
        ctx: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeight: number,
        position: Vec2,
        dimensions: Dimensions,
    ): void {
        ctx.save();
        ctx.strokeStyle = GREY;

        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(position.x, 0);
        ctx.lineTo(position.x, canvasHeight);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(position.x + dimensions.width, 0);
        ctx.lineTo(position.x + dimensions.width, canvasHeight);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, position.y);
        ctx.lineTo(canvasWidth, position.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, position.y + dimensions.length);
        ctx.lineTo(canvasWidth, position.y + dimensions.length);
        ctx.stroke();

        ctx.restore();
    }

    // Draw widget info
    public drawWidgetInfo(ctx: CanvasRenderingContext2D, position: Vec2, dimensions: Dimensions, id: number): void {
        ctx.fillStyle = BLACK;
        ctx.font = '8px Arial';
        ctx.fillText(id.toString(), position.x + 0.5 * dimensions.width - 5, position.y + 0.5 * dimensions.length);

        const pos = '(' + position.x + ':' + position.y + ')';
        ctx.fillText(pos, position.x - 45, position.y - 5);

        const dim = '(' + dimensions.width + ':' + dimensions.length + ')';
        ctx.fillText(dim, position.x + dimensions.width + 5, position.y + dimensions.length + 10);
    }
}
