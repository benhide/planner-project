import { Dimensions } from '../engine/Transform';
import { IPlannerState, IWidgetInfo } from './Interfaces';

// Module for holding default values for ease of access and reusability

// Z indexs of widgets
export const UNIT_ZINDEX: number = 1;
export const WORKTOP_ZINDEX: number = 2;
export const WALLUNIT_ZINDEX: number = 3;
export const WALL_ZINDEX: number = 4;

// Widget dimensions
export const UNIT_DIMENSIONS: Dimensions = new Dimensions(100, 100);
export const WALLUNIT_DIMENSIONS: Dimensions = new Dimensions(100, 50);
export const WORKTOP_DIMENSIONS: Dimensions = new Dimensions(100, 100);
export const DEFAULT_WALL_DIMENSIONS: Dimensions = new Dimensions(40, 40);

// Widget prices
export const UNIT_PRICE: number = 44.99;
export const WALLUNIT_PRICE: number = 34.99;
export const WORKTOP_PRICE: number = 40.99;

// Widgets descriptions
export const UNITS_BASKET_DESCRIPTION = 'Units';
export const WALLUNITS_BASKET_DESCRIPTION = 'Wallunits';
export const WORKTOP_BASKET_DESCRIPTION = 'Worktops';

// Basket component rates
export const TAX_RATE = 0.2;
export const SHIPPING_RATE = 0.15;

// Widget ids prefixs
export const UNIT_ID_PREFIX = 100;
export const WORKTOP_ID_PREFIX = 200;
export const WALLUNIT_ID_PREFIX = 300;
export const WALL_ID_PREFIX = 400;

// Default kitchen state
export const DEFAULT_KITCHEN: IPlannerState = {
    id: 0,
    widgets: [],
    name: '',
};

// Default basewidget types
export const UNIT_TYPE = 'UNIT';
export const WALLUNIT_TYPE = 'WALLUNIT';
export const WORKTOP_TYPE = 'WORKTOP';
export const WALL_TYPE = 'WALL';

// Defualt colours
export const WREN_GREEN = '#2BB673';
export const GREY = '#808080';
export const BLACK = '#000000';
export const WHITE = '#FFFFFF';

// Defualt widget descriptions
export const UNIT_DESCRIPTION = `This is a unit, information about units goes here ...`;
export const WALLUNIT_DESCRIPTION = `This is a wallunit, information about wallunits goes here ...`;
export const WORKTOP_DESCRIPTION = `This is a worktop, information about worktops goes here ...`;

export const UNIT_LONG_DESCRIPTION = `This is a unit, information about units goes here. Lorem ipsum dolor 
sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Pellentesque habitant morbi tristique senectus et netus et. Orci nulla pellentesque dignissim enim sit amet 
venenatis. Dictum non consectetur a erat nam at lectus urna duis. Ac ut consequat semper viverra nam. Egestas 
purus viverra accumsan in nisl nisi scelerisque. Id volutpat lacus laoreet non curabitur. Nullam eget felis 
eget nunc. Iaculis eu non diam phasellus. Quis commodo odio aenean sed adipiscing. Aliquam nulla facilisi cras 
fermentum odio eu feugiat pretium. `;
export const WALLUNIT_LONG_DESCRIPTION = `This is a wallunit, information about wallunits goes here. Lorem ipsum 
dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Pellentesque habitant morbi tristique senectus et netus et. Orci nulla pellentesque dignissim enim sit amet venenatis. 
Dictum non consectetur a erat nam at lectus urna duis. Ac ut consequat semper viverra nam. Egestas purus viverra 
accumsan in nisl nisi scelerisque. Id volutpat lacus laoreet non curabitur. Nullam eget felis eget nunc. Iaculis 
eu non diam phasellus. Quis commodo odio aenean sed adipiscing. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium. `;
export const WORKTOP_LONG_DESCRIPTION = `This is a worktop, information about worktops goes here. Lorem ipsum 
dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Pellentesque habitant morbi tristique senectus et netus et. Orci nulla pellentesque dignissim enim sit amet venenatis. 
Dictum non consectetur a erat nam at lectus urna duis. Ac ut consequat semper viverra nam. Egestas purus viverra 
accumsan in nisl nisi scelerisque. Id volutpat lacus laoreet non curabitur. Nullam eget felis eget nunc. Iaculis eu 
non diam phasellus. Quis commodo odio aenean sed adipiscing. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium. `;

// Default widget info
export const WIDGET_INFO: IWidgetInfo = {
    type: '',
    shortDescription: '',
    longDescription: '',
    colour: '',
    price: 0,
    image: '',
};
export const UNIT_INFO: IWidgetInfo = {
    type: 'Unit',
    shortDescription: UNIT_DESCRIPTION,
    longDescription: UNIT_LONG_DESCRIPTION,
    colour: '',
    price: UNIT_PRICE,
    image: '/images/unit.png',
};
export const WALLUNIT_INFO: IWidgetInfo = {
    type: 'Wallunit',
    shortDescription: WALLUNIT_DESCRIPTION,
    longDescription: WALLUNIT_LONG_DESCRIPTION,
    colour: '',
    price: WALLUNIT_PRICE,
    image: '/images/wallunit.png',
};
export const WORKTOP_INFO: IWidgetInfo = {
    type: 'Worktop',
    shortDescription: WORKTOP_DESCRIPTION,
    longDescription: WORKTOP_LONG_DESCRIPTION,
    colour: '',
    price: WORKTOP_PRICE,
    image: '/images/worktop.png',
};
