import { RemoveWidget, UpdateWidget } from '../../redux/actions/WidgetActions';
import { store } from '../../redux/ConfigureStore';
import { IEventBusData, IReduxPlannerState, IWidgetInfo } from '../../utilities/Interfaces';
import { getCanvas } from '../CanvasReferences';
import { isColliding, isIntersecting } from '../CollisionDetection';
import { EventBus, GameEvent } from '../EventBus';
import { collisionSnapping, forceWidgetInCanvasBounds, snapToGrid, snapToSize } from '../Snapping';
import { Dimensions, Vec2 } from '../Transform';
import { canDeleteWidget, selectTopWidget, setTopWidgetAsDeleting } from '../ZIndexControls';
import { DrawWidgets } from './DrawWidgets';

// The basewidget clas which all widgets inherit from
export abstract class BaseWidget {
    // Booleans for the widget
    private _isSelected: boolean = false;
    private _isHeld: boolean = false;
    private _isScaling: boolean = false;
    private _isRotating: boolean = false;
    private _isDeleting: boolean = false;

    // Catch the defualt width and height
    private _defaultWidth: number;
    private _defaultLength: number;

    // The last valid position to place widget
    private _lastValidPosition: Vec2;
    private _lastValidDimensions: Dimensions;

    // Draw functionality
    private _drawWidget: DrawWidgets;

    constructor(
        public dimensions: Dimensions,
        public position: Vec2,
        public zIndex: number,
        public id: number,
        public isScalable: boolean,
        public isRotatable: boolean,
        public type: string,
        public widgetInfo: IWidgetInfo,
    ) {
        // Draw widget class
        this._drawWidget = new DrawWidgets();

        // Catch the original dimensions
        this._defaultWidth = this.dimensions.width;
        this._defaultLength = this.dimensions.length;

        // Set the initial position
        this.setPosition(position.x, position.y);
        this.setDimensions(dimensions.width, dimensions.length);
        this._lastValidPosition = position;
        this._lastValidDimensions = dimensions;

        // Subscribe to the events
        EventBus.subscribe(GameEvent.MouseMove, (e: IEventBusData) => {
            if (this._isSelected && this._isHeld) {
                this.move(e);
            }
            if (this.isScalable && this._isScaling) {
                this.scale(e);
            }
            if (this.isRotatable && this._isRotating) {
                // this.rotate(e);
            }
        });

        EventBus.subscribe(GameEvent.MouseDown, (e: IEventBusData) => {
            this.shouldSelect(e);
            this.shouldScale(e);
            this.shouldDelete(e);
            this.shouldRotate(e);

            if (this._isScaling || this._isRotating) {
                this._isSelected = false;
            }
            if (this._isSelected) {
                this._isHeld = true;
            }
        });

        EventBus.subscribe(GameEvent.MouseUp, (e: IEventBusData) => {
            if (this._isSelected) {
                this._isHeld = false;
                this._isSelected = false;
                this.update();
            }

            if (this._isScaling) {
                this._isScaling = false;
                this.update();
            }
            this._isRotating = false;

            // Only remove the top widget
            if (this._isDeleting) {
                this.delete();
                this._isDeleting = false;
            }
        });
    }

    // Can set the position of the widget
    public setPosition(x: number, y: number): void {
        this.position = new Vec2(x, y);
    }

    // Can set the position of the widget
    public setDimensions(w: number, l: number): void {
        this.dimensions = new Dimensions(w, l);
    }

    // Getters and setters for deleting
    public get isDeleting() {
        return this._isDeleting;
    }
    public set isDeleting(isDeleting) {
        this._isDeleting = isDeleting;
    }

    // Getters and setters for selected
    public get isSelected() {
        return this._isSelected;
    }
    public set isSelected(isSelected) {
        this._isSelected = isSelected;
    }

    // Getters and setters for held
    public get isHeld() {
        return this._isHeld;
    }
    public set isHeld(isHeld) {
        this._isHeld = isHeld;
    }

    // Setter for is held and selected
    public set isHeldAndSelected(heldSelected: boolean) {
        this.isHeld = heldSelected;
        this._isSelected = heldSelected;
    }

    // Getters and setters for scaling
    public get isScaling() {
        return this._isScaling;
    }
    public set isScaling(isScaling) {
        this._isScaling = isScaling;
    }

    // Draw function
    public abstract draw(ctx: CanvasRenderingContext2D): void;

    // Draw other widget details
    public drawDetails(ctx: CanvasRenderingContext2D): void {
        // Get the canvas and context for reference
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;

        // Draw object items if needed
        if (this.isRotatable) {
            this._drawWidget.drawRotatingBox(ctx, this.position, this.dimensions);
        }
        if (this.isScalable) {
            this._drawWidget.drawScalingBox(ctx, this.position, this.dimensions);
        }
        if (this._isScaling || this._isSelected) {
            this._drawWidget.drawLines(ctx, canvas.width, canvas.height, this.position, this.dimensions);
        }
        this._drawWidget.drawWidgetInfo(ctx, this.position, this.dimensions, this.id);
        this._drawWidget.drawRemoveBox(ctx, this.position);
    }

    // Scale an widget
    private scale(e: IEventBusData): void {
        this._lastValidDimensions = this.dimensions;

        // Make sure it is side the canvas bounds
        forceWidgetInCanvasBounds(this);

        const collidingIDs = this.collisionDetection();
        for (const id of collidingIDs) {
            if (id !== -1) {
                this.setDimensions(this._lastValidDimensions.width, this._lastValidDimensions.length);
                return;
            }
        }

        // Scale the widget
        this.setDimensions(e.x - this.position.x, e.y - this.position.y);

        // Get the canvas and keep the scaled size inside the canvas bounds (width)
        const { width, height } = getCanvas();
        if (this.dimensions.width < this._defaultWidth) {
            this.setDimensions(this._defaultWidth, this.dimensions.length);
        } else if (this.dimensions.width > width) {
            this.setDimensions(width, this.dimensions.length);
        }

        // Keep the scaled size inside the canvas bounds (length)
        if (this.dimensions.length < this._defaultLength) {
            this.setDimensions(this.dimensions.width, this._defaultLength);
        } else if (this.dimensions.length > height) {
            this.setDimensions(this.dimensions.width, height);
        }

        snapToSize(this);
    }

    // Move an widget
    private move(e: IEventBusData): void {
        const offset = new Vec2(this.dimensions.width * 0.5, this.dimensions.length * 0.5);

        // The last valid position the object was in without colliding
        this._lastValidPosition = this.position;
        this.setPosition(-offset.x + e.x, -offset.y + e.y);
        forceWidgetInCanvasBounds(this);

        // Widgets from redux store
        const widgets = (store.getState() as IReduxPlannerState).kitchen.widgets;

        // Collision detection
        const collidingIDs = this.collisionDetection();
        for (const id of collidingIDs) {
            if (id !== -1) {
                collisionSnapping(this, widgets.find((widget) => widget.id === id)!);
            }
        }

        // Second phase of collision detection
        for (const id of collidingIDs) {
            if (isColliding(this, widgets.find((widget) => widget.id === id)!)) {
                this.setPosition(this._lastValidPosition.x, this._lastValidPosition.y);
            }
        }

        snapToGrid(this);
    }

    // Update the store
    private update(): void {
        store.dispatch(UpdateWidget(this));
    }

    // Delete an widget
    private delete(): void {
        if (canDeleteWidget(this.id)) {
            store.dispatch(RemoveWidget(this));
        }
    }

    // Collision detection
    private collisionDetection(): number[] {
        const id = [];
        const kitchen = (store.getState() as IReduxPlannerState).kitchen;

        for (const widget of kitchen.widgets.values()) {
            if (this.id === widget.id) {
                continue;
            }

            // Only matching z indexs and z indexs of '4' collide
            if (this.zIndex === widget.zIndex || (this.zIndex === 4 || widget.zIndex === 4)) {
                if (isColliding(this, widget)) {
                    id.push(widget.id);
                }
            }
        }

        // the colliding ids
        return id;
    }

    // Should we try to scale the widget
    private shouldScale(e: IEventBusData): void {
        if (this.isScalable) {
            this._isScaling = isIntersecting(
                new Vec2(e.x as number, e.y as number),
                new Vec2(this.position.x + this.dimensions.width - 15, this.position.y + this.dimensions.length - 15),
                new Dimensions(15, 15),
            );
        }
    }

    // Should we try to delete the widget
    private shouldDelete(e: IEventBusData): void {
        this._isDeleting = isIntersecting(
            new Vec2(e.x as number, e.y as number),
            new Vec2(this.position.x, this.position.y),
            new Dimensions(15, 15),
        );
        setTopWidgetAsDeleting();
    }

    // Should we try to rotate the widget
    private shouldRotate(e: IEventBusData): Vec2 {
        if (this.isRotatable) {
            this._isRotating = isIntersecting(
                new Vec2(e.x as number, e.y as number),
                new Vec2(this.position.x + this.dimensions.width - 15, this.position.y),
                new Dimensions(20, 20),
            );
            return new Vec2(e.x as number, e.y as number);
        }
        return new Vec2(0, 0);
    }

    // Should we try to select the widget
    private shouldSelect(e: IEventBusData): void {
        this._isSelected = isIntersecting(new Vec2(e.x as number, e.y as number), this.position, this.dimensions);
        selectTopWidget();
    }
}

// // Roate an widget
// private rotate(e): Vec2 {
//     this.angle = this.mouseDownPos.getAngleDegrees(new Vec2(e.x as number, e.y as number)) + 180;
//     // tslint:disable-next-line:no-console
//     console.log(this.angle);
//     //
//     if (this.angle > 45 && this.angle < 135) {
//         return new Vec2(0, 1);
//     } else if (this.angle > 135 && this.angle < 225) {
//         return new Vec2(1, 0);
//     } else if (this.angle > 225 && this.angle < 315) {
//         return new Vec2(0, -1);
//     } else {
//         return new Vec2(-1, 0);
//     }
// }

// private _isColliding: boolean = false;
// private _mouseDownPos: Vec2 = new Vec2(0, 0);
// private _dirToRotate: Vec2 = new Vec2(0, 0);
// private _angle: number = 0;
