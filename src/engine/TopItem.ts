import { Kitchen } from './Kitchen';

export function selectTopItem(): void {
    let index = -1;
    if (Kitchen.getInstance().widgets.length > 0) {
        for (let i = 0; i < Kitchen.getInstance().widgets.length; i++) {
            if (Kitchen.getInstance().widgets[i].isSelected) {
                index = i;
                Kitchen.getInstance().widgets[i].isSelected = false;
            }
        }
        if (index >= 0) {
            Kitchen.getInstance().widgets[index].isSelected = true;
        }
    }
}

export function removeTopItem(): void {
    let index = -1;
    if (Kitchen.getInstance().widgets.length > 0) {
        for (let i = 0; i < Kitchen.getInstance().widgets.length; i++) {
            if (Kitchen.getInstance().widgets[i].isDeleting) {
                index = i;
                Kitchen.getInstance().widgets[i].isDeleting = false;
            }
        }
        if (index >= 0) {
            Kitchen.getInstance().widgets[index].isDeleting = true;
        }
    }
}
