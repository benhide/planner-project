export default function UnitReducer(state: any = [], action: any) {
    switch (action.type) {
        case 'UNIT_ADDED':
            return [...state, { ...action.unit }];
        default:
            return state;
    }
}
