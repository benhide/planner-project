// Vector 2 class for
export class Vec2 {
    constructor(public x: number, public y: number) {}

    public magnitude(other: Vec2): number {
        const xSq: number = Math.pow(other.x - this.x, 2);
        const ySq: number = Math.pow(other.y - this.y, 2);
        return Math.sqrt(xSq + ySq);
    }

    public sqrdMagnitude(other: Vec2): number {
        const xSq: number = Math.pow(other.x - this.x, 2);
        const ySq: number = Math.pow(other.y - this.y, 2);
        return xSq + ySq;
    }

    public direction(other: Vec2): Vec2 {
        return new Vec2(other.x - this.x, other.y - this.y);
    }

    public getAngleRadians(other: Vec2): number {
        const radians = Math.atan2(other.y - this.y, other.x - this.x);
        return radians;
    }

    public getAngleDegrees(other: Vec2): number {
        const radians = Math.atan2(other.y - this.y, other.x - this.x);
        return this.convertToDegrees(radians);
    }

    private convertToDegrees(radians: number) {
        const degrees = radians * (180 / Math.PI);
        return degrees;
    }
}
