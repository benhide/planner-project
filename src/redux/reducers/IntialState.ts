import { BaseWidget } from '../../engine/widgets/BaseWidget';
import { IPlannerState } from '../../utilities/Interfaces';

// Initial state of the planner
const initialState: IPlannerState = {
    kitchen: {
        id: 0,
        name: '',
        widgets: new Array<BaseWidget>(),
    },
};
export default initialState;
