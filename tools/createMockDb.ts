import * as fs from 'fs';
import * as path from 'path';
import * as mockData from './mockData';

const { kitchens } = mockData;
const data = JSON.stringify({ kitchens });
const filepath = path.join(__dirname, 'db.json');

fs.writeFile(filepath, data, (error): void => {
    // tslint:disable-next-line: no-console
    error ? console.log(error) : console.log('Mock DB created.');
});
