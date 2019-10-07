// Static reference to the canvas
export class CanvasReference {

    // Singleton
    private static _instance: CanvasReference;

    // Cmavs element
    private _canvas: HTMLCanvasElement;

    // Singleton
    public static get(): HTMLCanvasElement {
        if (!CanvasReference._instance) {
            CanvasReference._instance = new CanvasReference();
        }
        return CanvasReference._instance._canvas;
    }
    private constructor() {
        this._canvas = document.getElementById('canvas') as HTMLCanvasElement;
    }
}
