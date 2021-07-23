import express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { CommonRoutesConfig } from './common/common.routes.config';
import debug from 'debug';
import twilio from 'twilio';
import { twilioInstance } from './src/config';
// import v1Router from "./src/routes";
import { WhatsAppRoutes } from './src/routes/whatsapp.routes.config';

const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 80;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');
const twiml = twilioInstance;

app.use(bodyparser.json());
app.use(cors());

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  })
);
const redisClient = redis.createClient();
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
    store: new RedisStore({ client: redisClient, ttl: 86400 }),
    resave: false
  })
);
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
routes.push(new WhatsAppRoutes(app));

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  })
);

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(`Server running at http://localhost:${port}`);
});

app.post('/callback', (req: express.Request, res: express.Response) => {
  res.status(201).send(`===> post method :${port}`);
});

server.listen(port, () => {
  debugLog(`Server running at http://localhost:${port}`);
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
});
