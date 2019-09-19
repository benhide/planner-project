// import { AddUnit, AddWall, AddWallunit, AddWorktop } from '../redux/actions/KitchenActions';
// import { Store } from '../redux/ConfigureStore';
// import { DEFAULT_UNIT_ZINDEX, DEFAULT_WALLUNIT_ZINDEX, DEFAULT_WALL_ZINDEX, DEFAULT_WORKTOP_ZINDEX } from './Defaults';
// import { ID } from './ID';
// import { BaseWidget } from './widgets/BaseWidget';
// import { Unit } from './widgets/Unit';
// import { Wall } from './widgets/Wall';
// import { WallUnit } from './widgets/WallUnit';
// import { WorkTop } from './widgets/Worktop';

// // Add an item
// export function AddItem(width: number, length: number, x: number, y: number, isScalable: boolean, isRotatable: boolean, type: string): void {
//     let item: BaseWidget;
//     switch (type) {
//         case 'add_unit':
//             item = new Unit(width, length, x, y, DEFAULT_UNIT_ZINDEX, ID(DEFAULT_UNIT_ZINDEX), isScalable, isRotatable);
//             item.isSelected = true;
//             item.isHeld = true;
//             this.widgets.push(item);
//             Store.dispatch(AddUnit(item));
//             break;
//         case 'add_worktop':
//             item = new WorkTop(width, length, x, y, DEFAULT_WORKTOP_ZINDEX, ID(DEFAULT_WORKTOP_ZINDEX), isScalable, isRotatable);
//             item.isSelected = true;
//             item.isHeld = true;
//             this.widgets.push(item);
//             Store.dispatch(AddWorktop(item));
//             break;
//         case 'add_wallunit':
//             item = new WallUnit(width, length, x, y, DEFAULT_WALLUNIT_ZINDEX, ID(DEFAULT_WALLUNIT_ZINDEX), isScalable, isRotatable);
//             item.isSelected = true;
//             item.isHeld = true;
//             this.widgets.push(item);
//             Store.dispatch(AddWallunit(item));
//             break;
//         case 'add_wall':
//             item = new Wall(width, length, x, y, DEFAULT_WALL_ZINDEX, ID(DEFAULT_WALL_ZINDEX), isScalable, isRotatable);
//             item.isSelected = true;
//             item.isHeld = true;
//             this.widgets.push(item);
//             Store.dispatch(AddWall(item));
//             break;
//         default:
//             break;
//     }
// }
