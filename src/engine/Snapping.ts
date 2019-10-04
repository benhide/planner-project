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
    position.x = position.x < 0 ? 0 : position.x;
    position.y = position.y < 0 ? 0 : position.y;
    position.x = position.x + dimensions.width > canvasWidth ? canvasWidth - dimensions.width : position.x;
    position.y = position.y + dimensions.length > canvasHeight ? canvasHeight - dimensions.length : position.y;
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

    // Left and right collisions
    if (Math.abs(left) > 0) {
        direction.x = left;
    } else if (right > 0) {
        direction.x = right;
    } else if (Math.abs(left) > 0 && right > 0) {
        direction.x = 0;
    }

    // Top and bottom collisions
    if (Math.abs(top) > 0) {
        direction.y = top;
    } else if (bottom > 0) {
        direction.y = bottom;
    } else if (Math.abs(left) > 0 && right > 0) {
        direction.y = 0;
    }

    // Covered collision
    if (Math.abs(top) === 0 && Math.abs(left) === 0 && right === 0 && bottom === 0) {
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
    if (Math.abs(left) > right) {
        direction.x = left;
    } else {
        direction.x = right;
    }

    // Move up or down
    if (Math.abs(top) > bottom) {
        direction.y = top;
    } else {
        direction.y = bottom;
    }

    // Choose shorest direction of movement
    if (Math.abs(direction.x) < Math.abs(direction.y)) {
        direction.y = 0;
    } else if (Math.abs(direction.y) < Math.abs(direction.x)) {
        direction.x = 0;
    }

    // Set position
    positionOne.x += direction.x;
    positionOne.y += direction.y;
};
