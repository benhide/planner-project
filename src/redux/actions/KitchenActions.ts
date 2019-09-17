import { Unit } from '../../widgets';

// Action creator
export function AddUnit(units: number) {
    return { type: 'UNIT_ADDED', units };
}
