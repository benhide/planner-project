const kitchens = [
    {
        Widgets: [],
        Id: '000001',
    },
];

const newKitchen = {
    Widgets: [],
    Id: '000001',
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
    kitchens,
    newKitchen,
};
