import { Dimensions, Vec2 } from '../engine/index';

// Draw widget class
export class DrawWidgets {
    // Reference to the canvas and context
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    constructor() {
        // Get the canvas and context for reference
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    // Draw box for scaling
    public drawScalingBox(position: Vec2, dimensions: Dimensions): void {
        this.ctx.fillStyle = `rgba(255, 255, 255, 1)`;
        this.ctx.strokeStyle = `rgba(0, 0, 0, 1)`;

        this.ctx.fillRect(position.x + dimensions.w - 10, position.y + dimensions.l - 10, 10, 10);
        this.ctx.strokeRect(position.x + dimensions.w - 10, position.y + dimensions.l - 10, 10, 10);
    }

    // Draw box for scaling
    public drawRemoveBox(position: Vec2, dimensions: Dimensions): void {
        this.ctx.fillStyle = `rgba(255, 255, 255, 1)`;
        this.ctx.strokeStyle = `rgba(0, 0, 0, 1)`;

        this.ctx.fillRect(position.x, position.y, 10, 10);
        this.ctx.strokeRect(position.x, position.y, 10, 10);

        this.ctx.beginPath();
        this.ctx.lineWidth = 1.5;
        this.ctx.moveTo(position.x + 2, position.y + 2);
        this.ctx.lineTo(position.x + 8, position.y + 8);
        this.ctx.moveTo(position.x + 8, position.y + 2);
        this.ctx.lineTo(position.x + 2, position.y + 8);
        this.ctx.stroke();
        this.ctx.lineWidth = 1;
    }

    // Draw the rotating box
    public drawRotatingBox(position: Vec2, dimensions: Dimensions): void {
        this.ctx.fillStyle = `rgba(255, 255, 255, 1)`;
        this.ctx.strokeStyle = `rgba(0, 0, 0, 1)`;

        this.ctx.fillRect(position.x + dimensions.w - 10, position.y, 10, 10);
        this.ctx.strokeRect(position.x + dimensions.w - 10, position.y, 10, 10);
    }

    // Draw the guide lines
    public drawLines(position: Vec2, dimensions: Dimensions): void {
        this.ctx.save();
        this.ctx.strokeStyle = `rgba(255, 255, 255, 1)`;

        this.ctx.setLineDash([5, 3]);
        this.ctx.beginPath();
        this.ctx.moveTo(position.x, 0);
        this.ctx.lineTo(position.x, this.canvas.height);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(position.x + dimensions.w, 0);
        this.ctx.lineTo(position.x + dimensions.w, this.canvas.height);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(0, position.y);
        this.ctx.lineTo(this.canvas.width, position.y);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(0, position.y + dimensions.l);
        this.ctx.lineTo(this.canvas.width, position.y + dimensions.l);
        this.ctx.stroke();

        this.ctx.restore();
    }

    // Draw item info
    public drawItemInfo(position: Vec2, dimensions: Dimensions, id: number): void {
        this.ctx.fillStyle = `rgba(0, 0, 0, 1)`;
        this.ctx.font = '8px Arial';
        this.ctx.fillText(id.toString(), position.x + 0.5 * dimensions.w - 5, position.y + 0.5 * dimensions.l);

        const pos = '(' + position.x + ':' + position.y + ')';
        this.ctx.fillText(pos, position.x - 45, position.y - 5);

        const dim = '(' + dimensions.w + ':' + dimensions.l + ')';
        this.ctx.fillText(dim, position.x + dimensions.w + 5, position.y + dimensions.l + 10);
    }
}
