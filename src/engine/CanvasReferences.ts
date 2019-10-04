// Canvas and ctx reference
export const getCanvas = (): HTMLCanvasElement => {
    return document.getElementById('canvas') as HTMLCanvasElement;
};
export const getCtx = (): CanvasRenderingContext2D => {
    return getCanvas().getContext('2d') as CanvasRenderingContext2D;
};
