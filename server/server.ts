import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as logger from 'morgan';
import * as path from 'path';
import { readFileSync } from 'fs';
import ApiRouter from './routes/api-router';

export default class Server {
  public app: express.Application;
  private distFolder = path.join(process.cwd(), 'dist');

  constructor() {
    this.app = express();
    this.config();
    this.route();
    this.api();
  }

  public config() {
    const template = readFileSync(path.join(this.distFolder, 'browser', 'index.html')).toString();
    // * NOTE :: leave this as require() since this file is built Dynamically from webpack
    const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist/server/main.bundle');
    const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

    this.app.engine('html', (_, options, callback) => {
      renderModuleFactory(AppServerModuleNgFactory, {
        // Our index.html
        document: template,
        url: options.req.url,
        // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
        extraProviders: [
          provideModuleMap(LAZY_MODULE_MAP)
        ]
      }).then(html => {
        callback(null, html);
      });
    });

    this.app.set('view engine', 'html');
    this.app.set('views', 'src');
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(methodOverride());

    // Server static files from /browser
    this.app.get('*.*', express.static(path.join(this.distFolder, 'browser')));

    enableProdMode();
  }

  public route() {
    this.app.get('*', (req, res, next) => {
      if (req.url.indexOf('/api') !== -1) {
        next();
      } else {
        res.render(path.join(this.distFolder, 'browser', 'index.html'), { req });
      }

    });
  }

  public api() {
    const router: express.Router = express.Router();
    const apiRouter: ApiRouter = new ApiRouter();

    apiRouter.setRouter(router);

  }

  public run(port: number) {
    this.app.listen(port, () => {
      console.log(`App run in Port: ${port}`);
    });
  }

}
