import { UNIT_ID_PREFIX, WALLUNIT_ID_PREFIX, WALL_ID_PREFIX, WORKTOP_ID_PREFIX } from '../../utilities/Defaults';

// Generate IDs
export class GenerateIDs {
    private _unitId: number = 1;
    private _worktopId: number = 1;
    private _wallunitId: number = 1;
    private _wallId: number = 1;

    // Singleton
    public static get(): GenerateIDs {
        if (!GenerateIDs.instance) {
            GenerateIDs.instance = new GenerateIDs();
        }
        return GenerateIDs.instance;
    }
    // Singleton
    private static instance: GenerateIDs;
    private constructor() {}

    // Get the next widget id
    public nextUnitId = (): number => {
        return UNIT_ID_PREFIX + this._unitId++;
    };

    // Get the next worktop id
    public nextWorktopId = (): number => {
        return WORKTOP_ID_PREFIX + this._worktopId++;
    };

    // Get the next wallunit id
    public nextWallunitId = (): number => {
        return WALLUNIT_ID_PREFIX + this._wallunitId++;
    };

    // Get the next wall id
    public nextWallId = (): number => {
        return WALL_ID_PREFIX + this._wallId++;
    };

    public resetUnitId = () => {
        this._unitId = 1;
    };

    public resetWallUnitId = () => {
        this._wallunitId = 1;
    };

    public resetWorktopId = () => {
        this._worktopId = 1;
    };

    public resetWallId = () => {
        this._wallId = 1;
    };

    public resetAllIds = () => {
        this.resetUnitId();
        this.resetWallUnitId();
        this.resetWorktopId();
        this.resetWallId();
    };
}

// // Generate IDs - IIFE
// export const GenerateId = (() => {
//     // Starting widget ids
//     let UNIT_ID = 1;
//     let WORKTOP_ID = 1;
//     let WALLUNIT_ID = 1;
//     let WALL_ID = 1;

//     // Get the next widget id
//     const nextUnitId = (): number => {
//         return UNIT_ID_PREFIX + UNIT_ID++;
//     };

//     // Get the next worktop id
//     const nextWorktopId = (): number => {
//         return WORKTOP_ID_PREFIX + WORKTOP_ID++;
//     };

//     // Get the next wallunit id
//     const nextWallunitId = (): number => {
//         return WALLUNIT_ID_PREFIX + WALLUNIT_ID++;
//     };

//     // Get the next wall id
//     const nextWallId = (): number => {
//         return WALL_ID_PREFIX + WALL_ID++;
//     };

//     const resetUnitId = () => {
//         UNIT_ID = 1;
//     };

//     const resetWallUnitId = () => {
//         WALLUNIT_ID = 1;
//     };

//     const resetWorktopId = () => {
//         WORKTOP_ID = 1;
//     };

//     const resetWallId = () => {
//         WALL_ID = 1;
//     };

//     const resetAllIds = () => {
//         resetUnitId();
//         resetWallUnitId();
//         resetWorktopId();
//         resetWallId();
//     };

//     // Return the functions (public access)
//     return {
//         nextUnitId,
//         nextWorktopId,
//         nextWallunitId,
//         nextWallId,
//         resetAllIds,
//         resetUnitId,
//         resetWallUnitId,
//         resetWorktopId,
//         resetWallId,
//     };
// })();
