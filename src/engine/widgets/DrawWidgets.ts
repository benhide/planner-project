import { Dimensions, Vec2 } from '../Transform';

// Draw widget class
export class DrawWidgets {
    // Draw box for scaling
    public drawScalingBox(ctx: CanvasRenderingContext2D, position: Vec2, dimensions: Dimensions): void {
        ctx.fillStyle = `rgba(255, 255, 255, 1)`;
        ctx.strokeStyle = `rgba(0, 0, 0, 1)`;

        ctx.fillRect(position.x + dimensions.w - 10, position.y + dimensions.l - 10, 10, 10);
        ctx.strokeRect(position.x + dimensions.w - 10, position.y + dimensions.l - 10, 10, 10);
    }

    // Draw box for scaling
    public drawRemoveBox(ctx: CanvasRenderingContext2D, position: Vec2, dimensions: Dimensions): void {
        ctx.fillStyle = `rgba(255, 255, 255, 1)`;
        ctx.strokeStyle = `rgba(0, 0, 0, 1)`;

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
        ctx.fillStyle = `rgba(255, 255, 255, 1)`;
        ctx.strokeStyle = `rgba(0, 0, 0, 1)`;

        ctx.fillRect(position.x + dimensions.w - 10, position.y, 10, 10);
        ctx.strokeRect(position.x + dimensions.w - 10, position.y, 10, 10);
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
        ctx.strokeStyle = `rgba(255, 255, 255, 1)`;

        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(position.x, 0);
        ctx.lineTo(position.x, canvasHeight);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(position.x + dimensions.w, 0);
        ctx.lineTo(position.x + dimensions.w, canvasHeight);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, position.y);
        ctx.lineTo(canvasWidth, position.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, position.y + dimensions.l);
        ctx.lineTo(canvasWidth, position.y + dimensions.l);
        ctx.stroke();

        ctx.restore();
    }

    // Draw item info
    public drawItemInfo(ctx: CanvasRenderingContext2D, position: Vec2, dimensions: Dimensions, id: number): void {
        ctx.fillStyle = `rgba(0, 0, 0, 1)`;
        ctx.font = '8px Arial';
        ctx.fillText(id.toString(), position.x + 0.5 * dimensions.w - 5, position.y + 0.5 * dimensions.l);

        const pos = '(' + position.x + ':' + position.y + ')';
        ctx.fillText(pos, position.x - 45, position.y - 5);

        const dim = '(' + dimensions.w + ':' + dimensions.l + ')';
        ctx.fillText(dim, position.x + dimensions.w + 5, position.y + dimensions.l + 10);
    }
}
