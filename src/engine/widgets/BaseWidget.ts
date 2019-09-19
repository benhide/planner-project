import { IsColliding, IsIntersecting } from '../CollisionDetection';
import { EventBus, GameEvent } from '../EventBus';
import { Kitchen } from '../Kitchen';
import { CheckBounding, CollisionSnapping, SnapToGrid, SnapToSize } from '../Snapping';
import { RemoveTopItem, SelectTopItem } from '../TopItem';
import { Dimensions, Vec2 } from '../Transform';
import { DrawWidgets } from '../widgets/DrawWidgets';

export class BaseWidget {
    // Booleans for the widget
    public isSelected: boolean = false;
    public isHeld: boolean = false;
    public isScaling: boolean = false;
    public isRotating: boolean = false;
    public isColliding: boolean = false;
    public isDeleting: boolean = false;

    // Catch the defualt width and height
    public defaultWidth: number;
    public defaultLength: number;

    // Rotational stuff
    public mouseDownPos: Vec2 = new Vec2(0, 0);
    public dirToRotate: Vec2 = new Vec2(0, 0);
    public angle: number = 0;

    // The last valid position to place item
    private lastValidPosition: Vec2;

    // Draw functionality
    private drawWidget: DrawWidgets;

    constructor(
        public dimensions: Dimensions,
        public position: Vec2,
        public zIndex: number,
        public id: number,
        public isScalable: boolean,
        public isRotatable: boolean,
    ) {
        // Draw widget class
        this.drawWidget = new DrawWidgets();

        // Catch the original dimensions
        this.defaultWidth = this.dimensions.w;
        this.defaultLength = this.dimensions.l;

        // Set the initial position
        this.setPosition(position.x, position.y);
        this.lastValidPosition = position;

        // Subscribe to the events
        EventBus.subscribe(GameEvent.MouseClick, (e: any) => {
            return;
        });

        EventBus.subscribe(GameEvent.MouseMove, (e: any) => {
            if (this.isSelected && this.isHeld) {
                this.move(e);
            }
            if (this.isScalable && this.isScaling) {
                this.scale(e);
            }
            if (this.isRotatable && this.isRotating) {
                this.rotate(e);
            }
        });

        EventBus.subscribe(GameEvent.MouseDown, (e: any) => {
            this.shouldSelect(e);
            this.shouldScale(e);
            this.shouldDelete(e);
            this.mouseDownPos = this.shouldRotate(e);

            if (this.isScaling || this.isRotating) {
                this.isSelected = false;
            }
            if (this.isSelected) {
                this.isHeld = true;
            }
        });

        EventBus.subscribe(GameEvent.MouseUp, (e: any) => {
            this.isSelected = false;
            this.isScaling = false;
            this.isHeld = false;
            this.isColliding = false;
            this.isRotating = false;

            // Only remove the top item
            if (this.isDeleting) {
                this.delete();
                this.isDeleting = false;
            }

            // this.dirToRotate.x = 0;
            // this.dirToRotate.y = 0;
        });
    }

    // Can set the position of the item
    public setPosition(x: number, y: number): void {
        this.position = new Vec2(x, y);
    }

    // Draw function
    public draw(ctx: CanvasRenderingContext2D): void {
        // Call the child class draw
        this.draw(ctx);
    }

    // Draw other item details
    public drawDetails(ctx: CanvasRenderingContext2D): void {
        // Get the canvas and context for reference
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;

        if (this.isRotatable) {
            this.drawWidget.drawRotatingBox(ctx, this.position, this.dimensions);
        }
        if (this.isScalable) {
            this.drawWidget.drawScalingBox(ctx, this.position, this.dimensions);
        }
        if (this.isScaling || this.isSelected) {
            this.drawWidget.drawLines(ctx, canvas.width, canvas.height, this.position, this.dimensions);
        }
        this.drawWidget.drawItemInfo(ctx, this.position, this.dimensions, this.id);
        this.drawWidget.drawRemoveBox(ctx, this.position, this.dimensions);
    }

    // Scale an item
    private scale(e: any): void {
        const collidingIDs = this.collisionDetection();
        for (const id of collidingIDs) {
            if (id !== -1) {
                this.isColliding = true;
                CollisionSnapping(this, Kitchen.getInstance().widgets.find((item) => item.id === id)!);
                return;
            }
        }

        //
        CheckBounding(this);

        const canvas = document.createElement('canvas');
        //
        this.dimensions.w = e.x - this.position.x;
        this.dimensions.l = e.y - this.position.y;

        //
        if (this.dimensions.w < this.defaultWidth) {
            this.dimensions.w = this.defaultWidth;
        } else if (this.dimensions.w > canvas.width) {
            this.dimensions.w = canvas.width;
        }

        //
        if (this.dimensions.l < this.defaultLength) {
            this.dimensions.l = this.defaultLength;
        } else if (this.dimensions.l > canvas.height) {
            this.dimensions.l = canvas.height;
        }

        //
        SnapToSize(this);
    }

    // Move an item
    private move(e: any): void {
        const offset = new Vec2(this.dimensions.w * 0.5, this.dimensions.l * 0.5);

        //
        this.lastValidPosition = this.position;
        this.setPosition(-offset.x + e.x, -offset.y + e.y);
        CheckBounding(this);

        //
        const collidingIDs = this.collisionDetection();
        for (const id of collidingIDs) {
            if (id !== -1) {
                this.isColliding = true;
                CollisionSnapping(this, Kitchen.getInstance().widgets.find((item) => item.id === id)!);
            }
        }

        //
        for (const id of collidingIDs) {
            if (IsColliding(this, Kitchen.getInstance().widgets.find((item) => item.id === id)!)) {
                this.setPosition(this.lastValidPosition.x, this.lastValidPosition.y);
            }
        }

        //
        SnapToGrid(this);
    }

    // Roate an item
    private rotate(e: any): Vec2 {
        this.angle = this.mouseDownPos.getAngleDegrees(new Vec2(e.x as number, e.y as number)) + 180;

        // tslint:disable-next-line:no-console
        console.log(this.angle);

        //
        if (this.angle > 45 && this.angle < 135) {
            return new Vec2(0, 1);
        } else if (this.angle > 135 && this.angle < 225) {
            return new Vec2(1, 0);
        } else if (this.angle > 225 && this.angle < 315) {
            return new Vec2(0, -1);
        } else {
            return new Vec2(-1, 0);
        }
    }

    // Delete an item
    private delete(): void {
        Kitchen.getInstance().removeItem(this.id);
    }

    // Collision detection
    private collisionDetection(): number[] {
        const id = [];
        for (const item of Kitchen.getInstance().widgets.values()) {
            if (this.id === item.id) {
                continue;
            }

            if (this.zIndex === item.zIndex || (this.zIndex === 4 || item.zIndex === 4)) {
                if (IsColliding(this, item)) {
                    id.push(item.id);
                }
            }
        }
        return id;
    }

    // Should we try to scale the item
    private shouldScale(e: any): void {
        if (this.isScalable) {
            this.isScaling = IsIntersecting(
                new Vec2(e.x as number, e.y as number),
                new Vec2(this.position.x + this.dimensions.w - 15, this.position.y + this.dimensions.l - 15),
                new Dimensions(15, 15),
            );
        }
    }

    // Should we try to delete the item
    private shouldDelete(e: any) {
        this.isDeleting = IsIntersecting(
            new Vec2(e.x as number, e.y as number),
            new Vec2(this.position.x, this.position.y),
            new Dimensions(15, 15),
        );
        RemoveTopItem();
    }

    // Should we try to rotate the item
    private shouldRotate(e: any): Vec2 {
        if (this.isRotatable) {
            this.isRotating = IsIntersecting(
                new Vec2(e.x as number, e.y as number),
                new Vec2(this.position.x + this.dimensions.w - 15, this.position.y),
                new Dimensions(20, 20),
            );
            return new Vec2(e.x as number, e.y as number);
        }
        return new Vec2(0, 0);
    }

    // Should we try to select the item
    private shouldSelect(e: any): void {
        this.isSelected = IsIntersecting(new Vec2(e.x as number, e.y as number), this.position, this.dimensions);
        SelectTopItem();
    }
}