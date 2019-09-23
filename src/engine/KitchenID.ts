// Generate IDs - IIFE
export const GenerateKitchenId = (() => {
    let KITCHEN_ID = 0;

    const nextKitchenId = () => {
        return ('000000' + KITCHEN_ID++).slice(-6);
    };

    return {
        nextKitchenId,
    };
})();
