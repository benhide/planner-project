import { Vec2 } from './Transform';
import { BaseWidget } from './widgets/BaseWidget';

// Snap to grid
export function SnapToGrid(obj: BaseWidget): void {
    if (obj.position.x % 10 !== 0) {
        obj.position.x = Math.ceil(obj.position.x / 10) * 10;
    }
    if (obj.position.y % 10 !== 0) {
        obj.position.y = Math.ceil(obj.position.y / 10) * 10;
    }
}

// Snap to size
export function SnapToSize(obj: BaseWidget): void {
    if (obj.dimensions.w % 10 !== 0) {
        obj.dimensions.w = Math.ceil(obj.dimensions.w / 10) * 10;
    }
    if (obj.dimensions.l % 10 !== 0) {
        obj.dimensions.l = Math.ceil(obj.dimensions.l / 10) * 10;
    }
}

// Keep obj in bounds
export function CheckBounding(obj: BaseWidget): void {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    obj.position.x = obj.position.x < 0 ? 0 : obj.position.x;
    obj.position.y = obj.position.y < 0 ? 0 : obj.position.y;
    obj.position.x = obj.position.x + obj.dimensions.w > canvas.width ? canvas.width - obj.dimensions.w : obj.position.x;
    obj.position.y = obj.position.y + obj.dimensions.l > canvas.height ? canvas.height - obj.dimensions.l : obj.position.y;
}

// Snap units together
export function CollisionSnapping(objA: BaseWidget, objB: BaseWidget): void {
    const objACenter = new Vec2(objA.position.x + objA.dimensions.w * 0.5, objA.position.y + objA.dimensions.l * 0.5);
    const objBCenter = new Vec2(objB.position.x + objB.dimensions.w * 0.5, objB.position.y + objB.dimensions.l * 0.5);

    let left = 0;
    let right = 0;
    let top = 0;
    let bottom = 0;

    const dir = new Vec2(0, 0);

    // left collision - / right collision +
    if (
        objA.position.x + objA.dimensions.w > objB.position.x &&
        objA.position.x + objA.dimensions.w < objB.position.x + objB.dimensions.w
    ) {
        left = objB.position.x - (objA.position.x + objA.dimensions.w);
    } else if (objA.position.x < objB.position.x + objB.dimensions.w && objA.position.x >= objB.position.x) {
        right = objB.position.x + objB.dimensions.w - objA.position.x;
    }

    // top collision - / bottom collision +
    if (
        objA.position.y + objA.dimensions.l > objB.position.y &&
        objA.position.y + objA.dimensions.l < objB.position.y + objB.dimensions.l
    ) {
        top = objB.position.y - (objA.position.y + objA.dimensions.l);
    } else if (objA.position.y < objB.position.y + objB.dimensions.l && objA.position.y >= objB.position.y) {
        bottom = objB.position.y + objB.dimensions.l - objA.position.y;
    }

    // Left and right collisions
    if (Math.abs(left) > 0) {
        dir.x = left;
    } else if (right > 0) {
        dir.x = right;
    } else if (Math.abs(left) > 0 && right > 0) {
        dir.x = 0;
    }

    // Top and bottom collisions
    if (Math.abs(top) > 0) {
        dir.y = top;
    } else if (bottom > 0) {
        dir.y = bottom;
    } else if (Math.abs(left) > 0 && right > 0) {
        dir.y = 0;
    }

    // Covered collision
    if (Math.abs(top) === 0 && Math.abs(left) === 0 && right === 0 && bottom === 0) {
        const move = objACenter.direction(objBCenter);
        if (move.x > 0) {
            objA.position.x = objB.position.x - objA.dimensions.w;
        } else if (move.x <= 0) {
            objA.position.x = objB.position.x + objB.dimensions.w;
        } else if (move.y > 0) {
            objA.position.y = objB.position.y - objA.dimensions.l;
        } else if (move.y <= 0) {
            objA.position.y = objB.position.y + objB.dimensions.l;
        }
    }

    // Both horizontal sides or both vertical sides collisions
    if (dir.x === 0) {
        objA.position.y += dir.y;
    } else if (dir.y === 0) {
        objA.position.x += dir.x;
    }

    // Move left or right
    if (Math.abs(left) > right) {
        dir.x = left;
    } else {
        dir.x = right;
    }

    // Move up or down
    if (Math.abs(top) > bottom) {
        dir.y = top;
    } else {
        dir.y = bottom;
    }

    // Choose shorest direction of movement
    if (Math.abs(dir.x) < Math.abs(dir.y)) {
        dir.y = 0;
    } else if (Math.abs(dir.y) < Math.abs(dir.x)) {
        dir.x = 0;
    }

    // Set position
    objA.position.x += dir.x;
    objA.position.y += dir.y;
}
