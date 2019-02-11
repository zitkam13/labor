import { Student } from './student';

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
    private students: { [id: string]: Student } = {};
    private constructor () {
        this.add(new Student( 'tutram12', 'Tuttner', 'Raphael'));
        this.add(new Student( 'zitkam13', 'Zitz', 'Karlheinz'));
    }

    public add (s: Student) {
        if (this.students[s.getHtlid()]) {
            throw new Error('student already exists');
        }
        this.students[s.getHtlid()] = s;
    }
    public get (htlid: string) {
        return this.students[htlid];
    }
    public remove (htlid: string) {
        delete this.students[htlid];
    }
    public set (s: Student): Student {
        const rv = this.get(s.getHtlid());
        this.students[s.getHtlid()] = s;
        return rv;
    }
}
