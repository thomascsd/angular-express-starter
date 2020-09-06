import * as express from 'express';
import { useExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import * as logger from 'morgan';
import * as path from 'path';
import * as helmet from 'helmet';
import { ContactController } from './controllers/ContactController';

export default class Server {
  public app: express.Application;
  private distFolder = path.join(__dirname, '..', 'client');

  constructor() {
    useContainer(Container);
    this.app = express();
    this.config();
    this.route();
    this.setControllers();
  }

  public config() {
    this.app.set('view engine', 'html');
    this.app.set('views', 'src');
    this.app.use(logger('dev'));
    this.app.use(helmet());

    // Server static files from /dist
    this.app.get('*.*', express.static(this.distFolder));
  }

  public route() {
    this.app.get('*', (req, res, next) => {
      if (req.url.indexOf('/api') !== -1) {
        next();
      } else {
        res.sendFile(path.join(this.distFolder, 'index.html'));
      }
    });
  }

  public setControllers() {
    useExpressServer(this.app, {
      routePrefix: 'api',
      controllers: [ContactController],
    });
  }

  public run(port: number) {
    this.app.listen(port, () => {
      console.log(`App run in Port: ${port}`);
    });
  }
}
