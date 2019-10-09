import { RemoveWidget, UpdateInfoWidget, UpdateWidget } from '../../redux/actions/WidgetActions';
import { store } from '../../redux/ConfigureStore';
import { IEventBusData, IReduxPlannerState, IWidgetInfo } from '../../utilities/Interfaces';
import { CanvasReference } from '../CanvasReferences';
import { isColliding, isIntersecting } from '../CollisionDetection';
import { EventBus, GameEvent } from '../EventBus';
import { collisionSnapping, forceWidgetInCanvasBounds, snapToGrid, snapToSize } from '../Snapping';
import { Dimensions, Vec2 } from '../Transform';
import { canDeleteWidget, selectTopWidget, setTopWidgetAsDeleting } from '../ZIndexControls';
import { DrawWidgets } from './DrawWidgets';
import { ThemeProvider } from '@material-ui/styles';

// The basewidget clas which all widgets inherit from
export abstract class BaseWidget {
    // Booleans for the widget
    private _isSelected: boolean = false;
    private _isHeld: boolean = false;
    private _isScaling: boolean = false;
    private _isRotating: boolean = false;
    private _isDeleting: boolean = false;
    private _isUpdatingInfo: boolean = false;

    // Catch the defualt width and height
    private _defaultWidth: number;
    private _defaultLength: number;

    // The last valid position to place widget
    private _lastValidPosition: Vec2;
    private _lastValidDimensions: Dimensions;

    protected _points: Vec2[];
    protected _angle: number;

    protected _lastAngle: number;
    protected _worldPoints: Vec2[];

    protected _removeBox: Vec2[];
    private _mouseDownPos: Vec2 = new Vec2(0, 0);

    // Draw functionality
    protected _drawWidget: DrawWidgets;

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

        this._angle = 0;
        this._lastAngle = 0;
        this._points = Array<Vec2>(4);
        this._points[0] = new Vec2(-50, -50);
        this._points[1] = new Vec2(50, -50);
        this._points[2] = new Vec2(50, 50);
        this._points[3] = new Vec2(-50, 50);
        this._worldPoints = Array<Vec2>();
        this._removeBox = Array<Vec2>();

        this._worldPoints = [];
        for (const p of this._points) {
            const worldPoint = this.position.add(p.rotate(this._angle));
            this._worldPoints.push(worldPoint);
        }

        // Subscribe to the events
        EventBus.subscribe(GameEvent.MouseMove, (e: IEventBusData) => {
            if (this._isSelected && this._isHeld) {
                this.move(e);
            }
            if (this.isScalable && this._isScaling) {
                this.scale(e);
            }
            if (this.isRotatable && this._isRotating) {
                this.rotate(e);
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
            if (this._isRotating) {
                this._isRotating = false;
                this._lastAngle = this._angle;
                this.update();
            }

            // Only remove the top widget
            if (this._isDeleting) {
                this.delete();
                this._isDeleting = false;
            }
        });

        EventBus.subscribe(GameEvent.ColorChange, (e: IEventBusData) => {
            // REDUX STORE -> IMUTABLE STATE INVARIANT ERROR HERE!!!!
            // if (e.colorChange) {
            //     if (e.colorChange.type === widgetInfo.type) {
            //         const { r, g, b } = e.colorChange.color;
            //         widgetInfo.color = { r, g, b };
            //     }
            // }
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
            this._drawWidget.drawRotatingBox(ctx, this.position, this.dimensions, this._angle);
        }
        if (this.isScalable) {
            this._drawWidget.drawScalingBox(ctx, this.position, this.dimensions);
        }
        if (this._isScaling || this._isSelected) {
            this._drawWidget.drawLines(ctx, canvas.width, canvas.height, this.position, this.dimensions, this._worldPoints);
        }
        this._drawWidget.drawWidgetInfo(ctx, this.position, this.dimensions, this.id, this._angle);
        this._drawWidget.drawRemoveBox(ctx, this.position, this.dimensions, this._angle);
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

        // Check it exsists
        if (!e.x || !e.y) {
            return;
        }

        // Scale the widget
        this.setDimensions(e.x - this.position.x, e.y - this.position.y);

        // Get the canvas and keep the scaled size inside the canvas bounds (width)
        const { width, height } = CanvasReference.get();
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

        // // Set the world points
        // this._worldPoints = [];
        // for (const p of this._points) {
        //     const worldPoint = this.position.add(p.rotate(this._angle));
        //     this._worldPoints.push(worldPoint);
        // }

        // The last valid position the object was in without colliding
        this._lastValidPosition = this.position;

        // Check it exsists
        if (!e.x || !e.y) {
            return;
        }

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

    // Roate an widget
    private rotate(e: IEventBusData): void {
        this._angle = this._mouseDownPos.getAngleDegrees(new Vec2(e.x as number, e.y as number)) - this._lastAngle;
    }

    // Update the store
    private update(): void {
        store.dispatch(UpdateWidget(this));
    }

    private updateInfo(): void {
        store.dispatch(UpdateInfoWidget(this));
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
    private shouldRotate(e: IEventBusData): void {
        if (this.isRotatable) {
            this._isRotating = isIntersecting(
                new Vec2(e.x as number, e.y as number),
                new Vec2(this.position.x + this.dimensions.width - 15, this.position.y),
                new Dimensions(20, 20),
            );
        }
        console.log(this._isRotating);
        this._lastAngle = this._mouseDownPos.getAngleDegrees(new Vec2(e.x as number, e.y as number)) - this._angle;
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
