import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { platformServer, renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import { AppServerModuleNgFactory } from '../dist/ngfactory/src/app/app.server.module.ngfactory';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as path from 'path';
import { readFileSync } from 'fs';

export default class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.route();
        this.api();
    }

    public config() {
        const template = readFileSync(path.join(__dirname, '..', 'dist', 'index.html')).toString();

        this.app.engine('html', (_, options, callback) => {
            const opts = { document: template, url: options.req.url };

            renderModuleFactory(AppServerModuleNgFactory, opts)
                .then(html => callback(null, html));
        });


        this.app.set('view engine', 'html');
        this.app.set('views', 'src');

        this.app.use(bodyParser.json());
        this.app.use(methodOverride());
        // this.app.use(express.static(path.join(__dirname, '/dist')));
        this.app.get('*.*', express.static(path.join(__dirname, '..', 'dist')));

    }

    public route() {
        /*this.app.get('/*', function (req, res) {
            res.sendFile(path.join(__dirname + '/dist/index.html'));
        });*/

        this.app.get('*', (req, res) => {
            res.render('index', { req });
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
