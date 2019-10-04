// Dimensions of a unit
export class Dimensions {
    constructor(public width: number, public length: number) {}
}

// Vector 2 class
export class Vec2 {
    constructor(public x: number, public y: number) {}

    // Magnitude of vector between this vector and other
    public magnitude(other: Vec2): number {
        return Math.hypot(other.x - this.x, other.y - this.y);
    }

    // Squared magnitude of vector between this vector and other
    public squaredMagnitude(other: Vec2): number {
        const xSq: number = Math.pow(other.x - this.x, 2);
        const ySq: number = Math.pow(other.y - this.y, 2);
        return xSq + ySq;
    }

    // Direction from this vector to other vector
    public vectorBetweenOtherVector(other: Vec2): Vec2 {
        return new Vec2(other.x - this.x, other.y - this.y);
    }

    // Angle between this vector and other in radians
    public getAngleRadians(other: Vec2): number {
        return Math.atan2(other.y - this.y, other.x - this.x);
    }

    // Angle between this vector and other in degrees
    public getAngleDegrees(other: Vec2): number {
        return this.convertToDegrees(Math.atan2(other.y - this.y, other.x - this.x));
    }

    // Convert radians to degrees
    private convertToDegrees(radians: number) {
        return radians * (180 / Math.PI);
    }
}
