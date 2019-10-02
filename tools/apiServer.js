const jsonServer = require('json-server');
const path = require('path');
// import * as jsonServer from 'json-server';
// import * as path from 'path';
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const port = 9001;

// Can pass a limited number of options to this to override (some) defaults.
const middlewares = jsonServer.defaults({
    // Display json-server's built in homepage when json-server starts.
    static: 'node_modules/json-server/dist',
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
server.use(jsonServer.bodyParser);

// Declaring custom routes below. Add custom routes before JSON Server router
// Add createdAt to all POSTS
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date(Date.now());
        // tslint:disable-next-line: no-console
        console.log('POST REQUEST MADE AT ' + req.body.createdAt);
    }
    // Continue to JSON Server router
    next();
});

// Validation for posting
server.post('/kitchens', (req, res, next) => {
    next();
});

// Use default router
server.use(router);

// Start server
server.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`JSON Server is running on port ${port}`);
});
