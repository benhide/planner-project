import * as jsonServer from 'json-server';
import * as path from 'path';
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const port = 9001;

// Can pass a limited number of options to this to override (some) defaults. See https://github.com/typicode/json-server#api
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
        req.body.createdAt = Date.now();
        // tslint:disable-next-line: no-console
        console.log('POST REQUEST MADE AT ' + req.body.createdAt);
    }
    // Continue to JSON Server router
    next();
});

// Validation for posting
server.post('/kitchens', (req, res, next) => {
    // const error = validateCourse(req.body);
    // if (error) {
    //     res.status(400).send(error);
    // } else {
    //     req.body.slug = createSlug(req.body.title); // Generate a slug for new courses.
    //     next();
    // }
    next();
});

// Use default router
server.use(router);

// STart server
server.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`JSON Server is running on port ${port}`);
});

// Centralized logic
// // Returns a URL friendly slug
// function createSlug(value) {
//     return value
//         .replace(/[^a-z0-9_]+/gi, '-')
//         .replace(/^-|-$/g, '')
//         .toLowerCase();
// }
// function validateCourse(course) {
//     if (!course.title) return 'Title is required.';
//     if (!course.authorId) return 'Author is required.';
//     if (!course.category) return 'Category is required.';
//     return '';
// }
