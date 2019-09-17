let ID_1 = 1;
let ID_2 = 1;
let ID_3 = 1;
let ID_4 = 1;

export function ID(zIndex: number): number {
    if (zIndex === 1) {
        return 100 + ID_1++;
    } else if (zIndex === 2) {
        return 200 + ID_2++;
    } else if (zIndex === 3) {
        return 300 + ID_3++;
    } else if (zIndex === 4) {
        return 400 + ID_4++;
    } else {
        return -1;
    }
}
