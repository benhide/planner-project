import { Vec2 } from "./Transform";

export class Point {
    public _point: Vec2;
    constructor(x: number, y: number) {
        this._point = new Vec2(x, y);
    }

    public get point() {
        return this._point;
    }
}