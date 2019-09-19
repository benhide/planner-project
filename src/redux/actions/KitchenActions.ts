import { BaseWidget } from '../../engine/widgets/BaseWidget';
import * as types from '../actions/ActionTypes';

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
    return { type: types.WALLUNIT_ADDED, wallunit };
}

// Action creator
export function RemoveWallunit(wallunit: BaseWidget) {
    return { type: types.WALLUNIT_REMOVED, wallunit };
}

// Action creator
export function AddWall(wall: BaseWidget) {
    return { type: types.WALL_ADDED, wall };
}

// Action creator
export function RemoveWall(wall: BaseWidget) {
    return { type: types.WALL_REMOVED, wall };
}

// Action creator
export function AddWorktop(worktop: BaseWidget) {
    return { type: types.WORKTOP_ADDED, worktop };
}

// Action creator
export function RemoveWorktop(worktop: BaseWidget) {
    return { type: types.WORKTOP_REMOVED, worktop };
}

// Action creator
export function RemoveWidget(widget: BaseWidget) {
    return { type: types.WIDGET_REMOVED, widget };
}
