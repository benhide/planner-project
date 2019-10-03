import { Dimensions } from '../engine/Transform';
import { IPlannerState, IWidgetInfo } from './Interfaces';

// Module for holding default values for ease of access and reusability

// Z indexs of widgets
export const DEFAULT_UNIT_ZINDEX: number = 1;
export const DEFAULT_WORKTOP_ZINDEX: number = 2;
export const DEFAULT_WALLUNIT_ZINDEX: number = 3;
export const DEFAULT_WALL_ZINDEX: number = 4;

// Widget dimensions
export const DEFAULT_UNIT_DIM: Dimensions = new Dimensions(100, 100);
export const DEFAULT_WALLUNIT_DIM: Dimensions = new Dimensions(100, 50);
export const DEFAULT_WORKTOP_DIM: Dimensions = new Dimensions(100, 100);
export const DEFAULT_WALL_DIM: Dimensions = new Dimensions(40, 40);

// Widget prices
export const DEFAULT_UNIT_PRICE: number = 44.99;
export const DEFAULT_WALLUNIT_PRICE: number = 34.99;
export const DEFAULT_WORKTOP_PRICE: number = 40.99;

// Widgets descriptions
export const UNITS_BASKET_DESC = 'Units';
export const WALLUNITS_BASKET_DESC = 'Wallunits';
export const WORKTOP_BASKET_DESC = 'Worktops';

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
export const DEFAULT_UNIT_TYPE = 'UNIT';
export const DEFAULT_WALLUNIT_TYPE = 'WALLUNIT';
export const DEFAULT_WORKTOP_TYPE = 'WORKTOP';
export const DEFAULT_WALL_TYPE = 'WALL';

// Defualt colours
export const WREN_GREEN = '#2BB673';
export const GREY = '#808080';
export const BLACK = '#000000';
export const WHITE = '#FFFFFF';

// Defualt widget descriptions
export const DEFAULT_UNIT_DESC = `This is a unit, information about units goes here ...`;
export const DEFAULT_WALLUNIT_DESC = `This is a wallunit, information about wallunits goes here ...`;
export const DEFAULT_WORKTOP_DESC = `This is a worktop, information about worktops goes here ...`;

// Default widget info
export const DEFAULT_UNIT_INFO: IWidgetInfo = {
    type: 'Unit',
    shortDesc: DEFAULT_UNIT_DESC,
    longDesc: DEFAULT_UNIT_DESC + DEFAULT_UNIT_DESC + DEFAULT_UNIT_DESC,
    colour: '',
    price: DEFAULT_UNIT_PRICE,
    image: 'img',
};
export const DEFAULT_WALLUNIT_INFO: IWidgetInfo = {
    type: 'Wallunit',
    shortDesc: DEFAULT_WALLUNIT_DESC,
    longDesc: DEFAULT_WALLUNIT_DESC + DEFAULT_WALLUNIT_DESC + DEFAULT_WALLUNIT_DESC,
    colour: '',
    price: DEFAULT_WALLUNIT_PRICE,
    image: 'img',
};
export const DEFAULT_WORKTOP_INFO: IWidgetInfo = {
    type: 'Worktop',
    shortDesc: DEFAULT_WORKTOP_DESC,
    longDesc: DEFAULT_WORKTOP_DESC + DEFAULT_WORKTOP_DESC + DEFAULT_WORKTOP_DESC,
    colour: '',
    price: DEFAULT_WORKTOP_PRICE,
    image: 'img',
};
