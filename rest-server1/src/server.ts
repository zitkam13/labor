
import * as express from 'express';
import *as bodyParser from 'body-parser';

export class  Server { // klasse außerhalb verwenden mit export

   private _server: express.Express;
    constructor ( port: number) {
        this._server = express();

        // this._server.get('/student', this.handleGetStudent.bind(this));
        this._server.use(bodyParser.urlencoded({extended: false}));
        this._server.get('/student', (req, resp, next) => this.handleGetStudent(req, resp, next)); 
        // mach das gleiche wie oben nur ohne bind
        // => error Operator

        this._server.listen(port);
        console.log('HTTP server gestartet auf Port ' + port);


    }
    private handleGetStudent (req: express.Request,
                              resp: express.Response,
                              next: express.NextFunction) {
        console.log('Abfrage');
        console.log(req.query.htlid);
        switch (req.query.htlid) {
            case 'tutram12':
            resp.json({surname: 'Tuttner', firstname: 'Raphael'}); break;
            case 'zitkam13':
            resp.json({surname: 'Zitz', firstname: 'Karlheinz'}); break;
            case 'strlum14':
            resp.json({surname: 'Strauß', firstname: 'Lukas'}); break;

            default:
                resp.status(404);
                resp.end();

        }
        resp.send('Antwort' + req.query.htlid);
    }

}
