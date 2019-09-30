import { Dimensions } from '../engine/Transform';

// Module for holding default values for ease of access and reusability

// Z indexs of widgets
export const DEFAULT_UNIT_ZINDEX: number = 1;
export const DEFAULT_WORKTOP_ZINDEX: number = 2;
export const DEFAULT_WALLUNIT_ZINDEX: number = 3;
export const DEFAULT_WALL_ZINDEX: number = 4;

// Widget dimensions
export const DEFUALT_UNIT_DIM: Dimensions = new Dimensions(100, 100);
export const DEFUALT_WALLUNIT_DIM: Dimensions = new Dimensions(100, 50);
export const DEFUALT_WORKTOP_DIM: Dimensions = new Dimensions(100, 100);
export const DEFUALT_WALL_DIM: Dimensions = new Dimensions(40, 40);

// Widget prices
export const DEFUALT_UNIT_PRICE: number = 44.99;
export const DEFUALT_WALLUNIT_PRICE: number = 34.99;
export const DEFUALT_WORKTOP_PRICE: number = 40.99;

// Widgets descriptions
export const UNITS_BASKET_DESC = 'Units';
export const WALLUNITS_BASKET_DESC = 'Wall-units';
export const WORKTOP_BASKET_DESC = 'Worktops';

// Basket component rates
export const TAX_RATE = 0.2;
export const SHIPPING_RATE = 0.25;

// Widget ids prefixs
export const UNIT_ID_PREFIX = 100;
export const WORKTOP_ID_PREFIX = 200;
export const WALLUNIT_ID_PREFIX = 300;
export const WALL_ID_PREFIX = 400;

export const DEFAULT_KITCHEN = {
    id: 0,
    widgets: [],
    name: '',
};
