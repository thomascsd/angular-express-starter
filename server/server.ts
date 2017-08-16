import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as path from 'path';

export default class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.route();
        this.api();
    }

    public config() {
        this.app.set('view engine', 'html');
        this.app.use(bodyParser.json());
        this.app.use(methodOverride());
        this.app.use(express.static(path.join(__dirname, '/dist')));
    }

    public route() {
        this.app.get('/*', function (req, res) {
            res.sendFile(path.join(__dirname + '/dist/index.html'));
        });
    }

    public api() {

    }

    public run(port: number) {
        this.app.listen(port, () => {
            console.log(`App run in Port: ${port}`);
        });
    }

}
