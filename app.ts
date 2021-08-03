import express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { CommonRoutesConfig } from './common/common.routes.config';
import debug from 'debug';
import { twilioInstance } from './src/config';
import { WhatsAppRoutes } from './src/routes/whatsapp.routes.config';
import Logger from './src/lib/logger';
import morganMiddleware from './src/middleware/morgan';

const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 80;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');
const twiml = twilioInstance;
const log =Logger

app.use(bodyparser.json());
app.use(cors());
app.use(morganMiddleware);

app.use(
  session({
    secret: [
      'veryimportantsecret',
      'notsoimportantsecret',
      'highlyprobablysecret'
    ],
    name: 'secretname',
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 60000 // Time is in miliseconds
    },
    resave: false
  })
);
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
routes.push(new WhatsAppRoutes(app));

app.get('/', (req: express.Request, res: express.Response) => {
  log.warn(`Server running at http://localhost:${port}`)
  res.status(200).send(`Server running at http://localhost:${port}`);
});

app.post('/callback', (req: express.Request, res: express.Response) => {
  res.status(201).send(`===> post method :${port}`);
});

server.listen(port, () => {
  log.info(`Server running at http://localhost:${port}`)
  debugLog(`Server running at http://localhost:${port}`);
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
    log.info(`Routes configured for ${route.getName()}`)
  });
});
