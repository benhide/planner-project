import { Kitchen } from "./Kitchen";

// Only select the top widget
export const selectTopItem = (): void => {
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

// Only remove the top widget
export const removeTopItem = (): void => {
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

// Remove an item
export const removeItem = (id: number): boolean => {
    for (let i = 0; i < Kitchen.getInstance().widgets.length; i++) {
        if (Kitchen.getInstance().widgets[i].id === id) {
            Kitchen.getInstance().widgets.splice(i, 1);
            return true;
        }
    }
    return false;
}