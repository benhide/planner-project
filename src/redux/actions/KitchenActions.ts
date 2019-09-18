import * as types from '../actions/ActionTypes';
import { BaseWidget } from '../../engine/widgets';

// Action creator
export function AddUnit(unit: BaseWidget) {
    return { type: types.UNIT_ADDED, unit };
}

// Action creator
export function RemoveUnit(unit: BaseWidget) {
    return { type: types.UNIT_REMOVED, unit };
}

// Action creator
export function AddWallunit(wallunit: BaseWidget) {
    return { type: 'WALLUNIT_ADDED', wallunit };
}

// Action creator
export function AddWall(wall: BaseWidget) {
    return { type: 'WALL_ADDED', wall };
}

// Action creator
export function AddWorktop(worktop: BaseWidget) {
    return { type: 'WORKTOP_ADDED', worktop };
}
