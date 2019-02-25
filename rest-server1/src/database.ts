import { Student } from './student';
import * as nconf from 'nconf';
import * as fs from 'fs';


interface IDatabaseConfig {
        path: string;
}
export class Database {

    private static instance: Database;
    /* tslint:disable */
    public static getInstance (): Database {
        if(Database.instance == null) {
            Database.instance = new Database();
        }
        return Database.instance
    }
    /* tslint:enable */

    // ****************************************************** ab jetzt nicht mehr static also betrifft das Objekt
    private config: IDatabaseConfig;
    private students: { [id: string]: Student } = {};
    private constructor () {
        this.config = <IDatabaseConfig> nconf.get('database'); // da bekommt man den eintrag von der config datei
       // console.log('--->' + this.config.path);
       // this.add(new Student( 'tutram12', 'Tuttner', 'Raphael'));
       // this.add(new Student( 'zitkam13', 'Zitz', 'Karlheinz'));
       // this.writeToFile();
        const b = <Buffer> fs.readFileSync('../' + this.config.path);
        this.students = JSON.parse(b.toString());
        console.log(Object.getOwnPropertyNames(this.students).length + ' Students gelesen');
    }

    public add (s: Student) {
        if (this.students[s.getHtlid()]) {
            throw new Error('student already exists');
        }
        this.students[s.getHtlid()] = s;
        this.writeToFile();
    }
    public get (htlid: string) {
        return this.students[htlid];
    }
    public remove (htlid: string) {
        delete this.students[htlid];
        this.writeToFile();
    }
    public set (s: Student): Student {
        const rv = this.get(s.getHtlid());
        this.students[s.getHtlid()] = s;
        this.writeToFile();
        return rv;
    }
    public writeToFile () {
        const s = JSON.stringify(this.students, null, 2);
        fs.writeFileSync('../' + this.config.path, s);
    }
}
