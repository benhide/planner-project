import { BaseWidget } from '../../engine/widgets/BaseWidget';

// Redux planner state
export interface IPlannerState {
    kitchens: IKitchen[];
}

// TODO
export interface IKitchen {
    widgets: BaseWidget[];
    id: number;
}
// Initial state of the planner
const initialState: IPlannerState = {
    kitchens: [],
};
export default initialState;

// Units: [],
// Worktops: [],
// Walls: [],
// Wallunits: [],
