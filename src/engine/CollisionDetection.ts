import { Dimensions, Vec2 } from './Transform';
import { BaseWidget } from './widgets/BaseWidget';

// Simple AABB collision detection returns true/false? if intersecting
export const isIntersecting = (posToChck: Vec2, objPos: Vec2, objDim: Dimensions): boolean => {
    if (
        posToChck.y > objPos.y &&
        posToChck.y < objPos.y + objDim.length &&
        posToChck.x > objPos.x &&
        posToChck.x < objPos.x + objDim.width
    ) {
        return true;
    } else {
        return false;
    }
};

// Simple AABB collision detection returns true/false? if colliding
export const isColliding = (objOne: BaseWidget, objTwo: BaseWidget): boolean => {
    const { x: objOneX, y: objOneY } = objOne.position;
    const { x: objTwoX, y: objTwoY } = objTwo.position;
    const { width: objOneWidth, length: objOneLength } = objOne.dimensions;
    const { width: objTwoWidth, length: objTwoLength } = objTwo.dimensions;

    if (
        objOneX < objTwoX + objTwoWidth &&
        objOneX + objOneWidth > objTwoX &&
        objOneY < objTwoY + objTwoLength &&
        objOneY + objOneLength > objTwoY
    ) {
        return true;
    } else {
        return false;
    }
};
