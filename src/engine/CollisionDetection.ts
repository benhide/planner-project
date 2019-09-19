import { Dimensions, Vec2 } from './Transform';
import { BaseWidget } from './widgets/BaseWidget';

// Simple AABB collision detection returns true/false? if intersecting
export function IsIntersecting(posToChck: Vec2, objPos: Vec2, objDim: Dimensions): boolean {
    if (posToChck.y > objPos.y && posToChck.y < objPos.y + objDim.l && posToChck.x > objPos.x && posToChck.x < objPos.x + objDim.w) {
        return true;
    } else {
        return false;
    }
}

// Simple AABB collision detection returns true/false? if colliding
export function IsColliding(objA: BaseWidget, objB: BaseWidget): boolean {
    if (
        objA.position.x < objB.position.x + objB.dimensions.w &&
        objA.position.x + objA.dimensions.w > objB.position.x &&
        objA.position.y < objB.position.y + objB.dimensions.l &&
        objA.position.y + objA.dimensions.l > objB.position.y
    ) {
        return true;
    } else {
        return false;
    }
}
