import { getCanvas } from './CanvasReferences';
import { Vec2 } from './Transform';
import { BaseWidget } from './widgets/BaseWidget';

// Snap to grid
export const snapToGrid = (obj: BaseWidget): void => {
    const { position } = obj;
    if (position.x % 10 !== 0) {
        position.x = Math.ceil(position.x / 10) * 10;
    }
    if (position.y % 10 !== 0) {
        position.y = Math.ceil(position.y / 10) * 10;
    }
};

// Snap to size
export const snapToSize = (obj: BaseWidget): void => {
    const { dimensions } = obj;
    if (dimensions.width % 10 !== 0) {
        dimensions.width = Math.ceil(dimensions.width / 10) * 10;
    }
    if (dimensions.length % 10 !== 0) {
        dimensions.length = Math.ceil(dimensions.length / 10) * 10;
    }
};

// Keep obj in bounds
export const forceWidgetInCanvasBounds = (obj: BaseWidget): void => {
    const { height: canvasHeight, width: canvasWidth } = getCanvas();
    const { position, dimensions } = obj;
    position.x = Math.max(0, Math.min(position.x, canvasWidth - dimensions.width));
    position.y = Math.max(0, Math.min(position.y, canvasHeight - dimensions.length));
};

// Snap units together
export const collisionSnapping = (objOne: BaseWidget, objTwo: BaseWidget): void => {
    const { position: positionOne } = objOne;
    const { width: widthOne, length: lengthOne } = objOne.dimensions;
    const { position: positionTwo } = objTwo;
    const { width: widthTwo, length: lengthTwo } = objTwo.dimensions;

    const objACenter = new Vec2(positionOne.x + widthOne * 0.5, positionOne.y + lengthOne * 0.5);
    const objBCenter = new Vec2(positionTwo.x + widthTwo * 0.5, positionTwo.y + lengthTwo * 0.5);

    let left = 0;
    let right = 0;
    let top = 0;
    let bottom = 0;

    const direction = new Vec2(0, 0);

    // left collision - / right collision +
    if (positionOne.x + widthOne > positionTwo.x && positionOne.x + widthOne < positionTwo.x + widthTwo) {
        left = positionTwo.x - (positionOne.x + widthOne);
    } else if (positionOne.x < positionTwo.x + widthTwo && positionOne.x >= positionTwo.x) {
        right = positionTwo.x + widthTwo - positionOne.x;
    }

    // top collision - / bottom collision +
    if (positionOne.y + lengthOne > positionTwo.y && positionOne.y + lengthOne < positionTwo.y + lengthTwo) {
        top = positionTwo.y - (positionOne.y + lengthOne);
    } else if (positionOne.y < positionTwo.y + lengthTwo && positionOne.y >= positionTwo.y) {
        bottom = positionTwo.y + lengthTwo - positionOne.y;
    }

    const absLeft = Math.abs(left);
    const absTop = Math.abs(top);

    // Left and right collisions
    if (absLeft > 0) {
        direction.x = left;
    } else if (right > 0) {
        direction.x = right;
    }

    // Top and bottom collisions
    if (absTop > 0) {
        direction.y = top;
    } else if (bottom > 0) {
        direction.y = bottom;
    }

    // Covered collision
    if (absTop === 0 && absLeft === 0 && right === 0 && bottom === 0) {
        const moveDirection = objACenter.vectorBetweenOtherVector(objBCenter);
        if (moveDirection.x > 0) {
            positionOne.x = positionTwo.x - widthOne;
        } else if (moveDirection.x <= 0) {
            positionOne.x = positionTwo.x + widthTwo;
        } else if (moveDirection.y > 0) {
            positionOne.y = positionTwo.y - lengthOne;
        } else if (moveDirection.y <= 0) {
            positionOne.y = positionTwo.y + lengthTwo;
        }
    }

    // Both horizontal sides or both vertical sides collisions
    if (direction.x === 0) {
        positionOne.y += direction.y;
    } else if (direction.y === 0) {
        positionOne.x += direction.x;
    }

    // Move left or right
    if (absLeft > right) {
        direction.x = left;
    } else {
        direction.x = right;
    }

    // Move up or down
    if (absTop > bottom) {
        direction.y = top;
    } else {
        direction.y = bottom;
    }

    // Choose shorest direction of movement
    const absX = Math.abs(direction.x);
    const absY = Math.abs(direction.y);

    if (absX < absY) {
        direction.y = 0;
    } else if (absY < absX) {
        direction.x = 0;
    }

    // Set position
    positionOne.x += direction.x;
    positionOne.y += direction.y;
};
