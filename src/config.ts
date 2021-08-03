import dotenv from 'dotenv';
import twilio from 'twilio';
import Logger from './lib/logger';
const log =Logger
dotenv.config();

const {
  SID: accountSid,
  KEY: TwilloAuthToken,
  APIKEY: googleApiKey,
  CX: cx,
  NODE_TLS_REJECT_UNAUTHORIZED,
  REDIS_HOST: redis_host,
  REDIS_PORT: redis_port
} = process.env;

const twilioAuthentication = twilio(accountSid, TwilloAuthToken);
const { MessagingResponse } = twilio.twiml;
const twilioInstance = new MessagingResponse();

const production = () => {
  log.info('production environment');
};

const dev = () => {
  log.info('Started Dev environment');
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
};

const kill_server = () => {
  process.once('SIGUSR2', function () {
    process.kill(process.pid, 'SIGUSR2');
    process.exit();
  });
};

switch (process.env.NODE_ENV) {
  case 'prod':
    production();
    break;
  case 'dev':
    dev();
    break;
  default:

    kill_server();
}

export { twilioAuthentication, googleApiKey, cx, twilioInstance, redis_host, redis_port };
