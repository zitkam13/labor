
import * as express from 'express';
import * as bodyParser from 'body-parser'; // für die server konfiguration
import { Database } from './database';

export class  Server { // klasse außerhalb verwenden mit export

   private _server: express.Express;
    constructor ( port: number) {
        this._server = express(); // server erzeugt

        // this._server.get('/student', this.handleGetStudent.bind(this));
        this._server.use(bodyParser.urlencoded({extended: false}));
        // schaut sich url an und gibt die daten vom url in einem paket am get paket an
        this._server.get('/student', (req, resp, next) => this.handleGetStudent(req, resp, next));
        this._server.put('/student', (req, resp, next) => this.handlePutStudent(req, resp, next));
        // mach das gleiche wie oben nur ohne bind
        // => error Operator

        this._server.listen(port); // server gestartet
        console.log('HTTP server gestartet auf Port ' + port);


    }
    private handlePutStudent (req: express.Request, resp: express.Response, next: express.NextFunction) {
        console.log(req.query.htlid);
        console.log(req.body);
        resp.send('Test');
        resp.end();
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
        resp.send('Antwort' + req.query.htlid);
    }

}
