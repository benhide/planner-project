// Dimensions of a unit
export class Dimensions {
    constructor(public width: number, public length: number) {}
}

// Vector 2 class
export class Vec2 {
    constructor(public x: number, public y: number) {}

    // Magnitude of vector between this vector and other
    public magnitudeBetweenVectors(other: Vec2): number {
        return Math.hypot(other.x - this.x, other.y - this.y);
    }

    // Squared magnitude of vector between this vector and other
    public squaredMagnitudeBetweenVectors(other: Vec2): number {
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

    public rotate(degrees: number) {
        const theta = this.convertToRadians(degrees);
        const sin = Math.sin(theta);
        const cos = Math.cos(theta);

        const newX = this.x * cos - this.y * sin;
        const newY = this.x * sin + this.y * cos;

        return new Vec2(newX, newY);
    }

    public rotateObjectAroundCenter(objectPosition: Vec2, degrees: number) {
        const theta = this.convertToRadians(degrees);
        const sin = Math.sin(theta);
        const cos = Math.cos(theta);

        const newX = (objectPosition.x - this.x) * cos + (objectPosition.y - this.y) * sin + this.x;
        const newY = (objectPosition.y - this.y) * cos - (objectPosition.x - this.x) * sin + this.y;
        return new Vec2(newX, newY);
    }

    // Convert radians to degrees
    private convertToDegrees(radians: number): number {
        return radians * (180 / Math.PI);
    }

    private convertToRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    // Dot product
    public dot(other: Vec2): number {
        return this.x * other.x + this.y * other.y;
    }

    // Standard math functions
    public add(other: Vec2): Vec2 {
        return new Vec2(this.x + other.x, this.y + other.y);
    }
    public subtract(other: Vec2): Vec2 {
        return new Vec2(this.x - other.x, this.y - other.y);
    }
    public multiply(scalar: number): Vec2 {
        return new Vec2(this.x * scalar, this.y * scalar);
    }
    public divide(scalar: number): Vec2 {
        return new Vec2(this.x / scalar, this.y / scalar);
    }
    public normal(): Vec2 {
        return new Vec2(this.y, -this.x);
    }
    public magnitude(): number {
        return Math.sqrt(this.dot(this));
    }
    public normalise() {
        const magnitude = this.magnitude();

        this.x /= magnitude;
        this.y /= magnitude;

        return this;
    }
}
