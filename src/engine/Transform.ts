// Dimensions of a unit
export class Dimensions {
    constructor(public w: number, public l: number) {}
}

// Vector 2 class
export class Vec2 {
    constructor(public x: number, public y: number) {}

    // Magnitude of vector between this vector and other
    public magnitude(other: Vec2): number {
        const xSq: number = Math.pow(other.x - this.x, 2);
        const ySq: number = Math.pow(other.y - this.y, 2);
        return Math.sqrt(xSq + ySq);
    }

    // Squared magnitude of vector between this vector and other
    public sqrdMagnitude(other: Vec2): number {
        const xSq: number = Math.pow(other.x - this.x, 2);
        const ySq: number = Math.pow(other.y - this.y, 2);
        return xSq + ySq;
    }

    // Direction from this vector to other vector
    public direction(other: Vec2): Vec2 {
        return new Vec2(other.x - this.x, other.y - this.y);
    }

    // Angle between this vector and other in radians
    public getAngleRadians(other: Vec2): number {
        const radians = Math.atan2(other.y - this.y, other.x - this.x);
        return radians;
    }

    // Angle between this vector and other in degrees
    public getAngleDegrees(other: Vec2): number {
        const radians = Math.atan2(other.y - this.y, other.x - this.x);
        return this.convertToDegrees(radians);
    }

    // Convert radians to degrees
    private convertToDegrees(radians: number) {
        const degrees = radians * (180 / Math.PI);
        return degrees;
    }
}
