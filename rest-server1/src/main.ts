
/* tslint:disable */ // Tslint abschalten
console.log("Hallo 1");
/* tslint:enable */

console.log('Hallo 2');

// import * as http from 'http'; // einbinden des HTTP pakets
// Externe Module
import {Server } from './server';
class Main {

    public static main() {
        const server = new Server(4711);

    }
}
Main.main();
