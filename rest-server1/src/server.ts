import * as express from 'express';
import * as bodyParser from 'body-parser'; // für die server konfiguration
import { Database } from './database';
import { IStudent, Student } from './student';

export class  Server { // klasse außerhalb verwenden mit export

   private _server: express.Express;
    constructor ( port: number) {
        this._server = express(); // server erzeugt

        // this._server.get('/student', this.handleGetStudent.bind(this));
        this._server.use(bodyParser.urlencoded({extended: false}));
        this._server.use(bodyParser.json());
        // schaut sich url an und gibt die daten vom url in einem paket am get paket an
        this._server.get('/student', (req, resp, next) => this.handleGetStudent(req, resp, next));
        this._server.put('/student', (req, resp, next) => this.handlePutStudent(req, resp, next));
        this._server.post('/student', (req, resp, next) => this.handlePostStudent(req, resp, next));
        this._server.delete('/student', (req, resp, next) => this.handleDeleteStudent(req, resp, next));
        // mach das gleiche wie oben nur ohne bind
        // => error Operator

        this._server.listen(port); // server gestartet
        console.log('HTTP server gestartet auf Port ' + port);
    }
    private handlePostStudent(req: express.Request, resp: express.Response, next: express.NextFunction) {
        console.log(req.query.htlid);
        const s = <IStudent>req.body;
        try {
        const stud = new Student(s.htlid, s.surname, s.firstname);
        if (Database.getInstance().get(stud.getHtlid())) {
            Database.getInstance().set(stud);
            resp.status(200).end();
            return;
        }
        resp.status(400).send('hdlid not exist');
        resp.end();
    } catch (err) {
            console.log(err);
            resp.status(404).send('invalid JSON data');
            resp.end();
    }
    }
    private handleDeleteStudent(req: express.Request, resp: express.Response, next: express.NextFunction) {
        try {
        if (Database.getInstance().get(req.query.htlid)) {
            Database.getInstance().remove(req.query.htlid);
            resp.status(200).end();
            return;
        }
        resp.status(400).send('htlid not found');
    } catch (err) {
            console.log(err);
            resp.status(404).send('invalid JSON data');
            resp.end();
    }
    }
    private handlePutStudent (req: express.Request, resp: express.Response, next: express.NextFunction) {
        console.log(req.query.htlid);
        // Abfragen obs einen Studenten gibt sonst muss post verwendet werden wenn es sschon einen gibt
        const s = <IStudent>req.body;
        try {
        const stud = new Student(s.htlid, s.surname, s.firstname);
        if (Database.getInstance().get(stud.getHtlid())) {
            resp.status(400).send('htlid already exists');
            resp.end();
            return;
        }
        Database.getInstance().add(stud);
        resp.status(200).end();
        } catch (err) {
            console.log(err);
            resp.status(404).send('invalid JSON data');
            resp.end();
        }
    }
    private handleGetStudent (req: express.Request,
                              resp: express.Response,
                              next: express.NextFunction) {
        console.log('Abfrage');
        console.log(req.query.htlid); // req.query hat der body parser angelegt

        const id = req.query.htlid;
        const s = Database.getInstance().get(id);
        if (s) {
            resp.json(s);
        }
        switch (req.query.htlid) {
            case 'tutram12':
            resp.json({surname: 'Tuttner', firstname: 'Raphael'}); break;
            case 'zitkam13':
            resp.json({surname: 'Zitz', firstname: 'Karlheinz'}); break;
            case 'strlum14':
            resp.json({surname: 'Strauß', firstname: 'Lukas'}); break;

            default:
                resp.status(404);
                resp.end(); // schließt den response

        }
    }

}
