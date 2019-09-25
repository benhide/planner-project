import { UNIT_ID_PREFIX, WALLUNIT_ID_PREFIX, WALL_ID_PREFIX, WORKTOP_ID_PREFIX } from '../utilities/Defaults';

// ************************************************
// TODO: UPDATE WIDGET ITEMS ON REMOVAL OF WIDGET
// ************************************************

// Generate IDs - IIFE
export const GenerateId = (() => {
    // Starting widget ids
    let UNIT_ID = 1;
    let WORKTOP_ID = 1;
    let WALLUNIT_ID = 1;
    let WALL_ID = 1;

    // Get the next widget id
    const nextUnitId = (): number => {
        return UNIT_ID_PREFIX + UNIT_ID++;
    };

    // Get the next worktop id
    const nextWorktopId = (): number => {
        return WORKTOP_ID_PREFIX + WORKTOP_ID++;
    };

    // Get the next wallunit id
    const nextWallunitId = (): number => {
        return WALLUNIT_ID_PREFIX + WALLUNIT_ID++;
    };

    // Get the next wall id
    const nextWallId = (): number => {
        return WALL_ID_PREFIX + WALL_ID++;
    };

    // Return the functions (public access)
    return {
        nextUnitId,
        nextWorktopId,
        nextWallunitId,
        nextWallId,
    };
})();

// export function generateId(zIndex: number): number {
//     if (zIndex === 1) {
//         return 100 + UNIT_ID++;
//     } else if (zIndex === 2) {
//         return 200 + WORKTOP_ID++;
//     } else if (zIndex === 3) {
//         return 300 + WALLUNIT_ID++;
//     } else if (zIndex === 4) {
//         return 400 + WALL_ID++;
//     } else {
//         return -1;
//     }
// }
