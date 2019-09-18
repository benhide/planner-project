export function KitchenReducer(state: any = [], action: any) {
    switch (action.type) {
        case 'UNIT_ADDED':
            return [...state, { ...action.unit }];
        case 'WALLUNIT_ADDED':
            return [...state, { ...action.wallunit }];
        case 'WORKTOP_ADDED':
            return [...state, { ...action.worktop }];
        case 'WALL_ADDED':
            return [...state, { ...action.wall }];
        default:
            return state;
    }
}
