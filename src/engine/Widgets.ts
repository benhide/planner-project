// import { AddUnit, AddWall, AddWallunit, AddWorktop, RemoveWidget } from '../redux/actions/KitchenActions';
// import { Store } from '../redux/ConfigureStore';
// import { DEFAULT_UNIT_ZINDEX, DEFAULT_WALLUNIT_ZINDEX, DEFAULT_WALL_ZINDEX, DEFAULT_WORKTOP_ZINDEX } from './Defaults';
// import { ID } from './ID';
import { BaseWidget } from './widgets/BaseWidget';
// import { Unit } from './widgets/Unit';
// import { Wall } from './widgets/Wall';
// import { WallUnit } from './widgets/WallUnit';
// import { WorkTop } from './widgets/Worktop';

// Array of objects of type BaseWidget
export const Widgets = new Array<BaseWidget>();

// // Sort the array for what to draw first
// export function SortArrayByZIndex(): void {
//     Widgets.sort((a, b) => (a.zIndex > b.zIndex ? 1 : -1));

//     // // tslint:disable-next-line:no-console
//     // console.log(Widgets);
// }

// // Add an item
// export function AddItem(
//     width: number,
//     length: number,
//     x: number,
//     y: number,
//     isScalable: boolean,
//     isRotatable: boolean,
//     type: string,
// ): void {
//     switch (type) {
//         case 'add_unit':
//             const unit = new Unit(width, length, x, y, DEFAULT_UNIT_ZINDEX, ID(DEFAULT_UNIT_ZINDEX), isScalable, isRotatable);
//             unit.isSelected = true;
//             unit.isHeld = true;
//             Widgets.push(unit);
//             Store.dispatch(AddUnit(unit));
//             break;
//         case 'add_worktop':
//             const worktop = new WorkTop(width, length, x, y, DEFAULT_WORKTOP_ZINDEX, ID(DEFAULT_WORKTOP_ZINDEX), isScalable, isRotatable);
//             worktop.isSelected = true;
//             worktop.isHeld = true;
//             Widgets.push(worktop);
//             Store.dispatch(AddWorktop(worktop));
//             break;
//         case 'add_wallunit':
//             const wallunit = new WallUnit(width, length, x, y, DEFAULT_WALLUNIT_ZINDEX, ID(DEFAULT_WALLUNIT_ZINDEX), isScalable, isRotatable);
//             wallunit.isSelected = true;
//             wallunit.isHeld = true;
//             Widgets.push(wallunit);
//             Store.dispatch(AddWallunit(wallunit));
//             break;
//         case 'add_wall':
//             const wall = new Wall(width, length, x, y, DEFAULT_WALL_ZINDEX, ID(DEFAULT_WALL_ZINDEX), isScalable, isRotatable);
//             wall.isSelected = true;
//             wall.isHeld = true;
//             Widgets.push(wall);
//             Store.dispatch(AddWall(wall));
//             break;
//         default:
//             break;
//     }

//     SortArrayByZIndex();
// }

// // Remove an item
// export function RemoveItem(id: number): void {
//     for (let i = 0; i < Widgets.length; i++) {
//         if (Widgets[i].id === id) {
//             Store.dispatch(RemoveWidget(Widgets[i]));
//             Widgets.splice(i, 1);
//         }
//     }
// }

// export function SelectTopItem(): void {
//     let index = -1;
//     if (Widgets.length > 0) {
//         for (let i = 0; i < Widgets.length; i++) {
//             if (Widgets[i].isSelected) {
//                 index = i;
//                 Widgets[i].isSelected = false;
//             }
//         }
//         if (index >= 0) {
//             Widgets[index].isSelected = true;
//         }
//     }
// }

// export function RemoveTopItem(): void {
//     let index = -1;
//     if (Widgets.length > 0) {
//         for (let i = 0; i < Widgets.length; i++) {
//             if (Widgets[i].isDeleting) {
//                 index = i;
//                 Widgets[i].isDeleting = false;
//             }
//         }
//         if (index >= 0) {
//             Widgets[index].isDeleting = true;
//         }
//     }
// }
