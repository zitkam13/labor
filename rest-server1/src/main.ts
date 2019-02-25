
/* tslint:disable */ // Tslint abschalten
console.log("Hallo 1");
/* tslint:enable */

console.log('Hallo 2');

// import * as http from 'http'; // einbinden des HTTP pakets
// Externe Module
import * as nconf from 'nconf';
nconf.argv().env().file({ file: '../config.json' }); // nconf weiß jetzt wo die config datei ist
import {Server } from './server';
import { Database } from './database';
class Main {

    public static main() {
        Database.getInstance();
        const server = new Server(4711);

    }
}
Main.main();
