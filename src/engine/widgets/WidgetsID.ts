import { UNIT_ID_PREFIX, WALLUNIT_ID_PREFIX, WALL_ID_PREFIX, WORKTOP_ID_PREFIX } from '../../utilities/Defaults';

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

    const resetUnitId = () => {
        UNIT_ID = 1;
    };

    const resetWallUnitId = () => {
        WALLUNIT_ID = 1;
    };

    const resetWorktopId = () => {
        WORKTOP_ID = 1;
    };

    const resetWallId = () => {
        WALL_ID = 1;
    };

    const resetAllIds = () => {
        resetUnitId();
        resetWallUnitId();
        resetWorktopId();
        resetWallId();
    };

    // Return the functions (public access)
    return {
        nextUnitId,
        nextWorktopId,
        nextWallunitId,
        nextWallId,
        resetAllIds,
        resetUnitId,
        resetWallUnitId,
        resetWorktopId,
        resetWallId,
    };
})();
