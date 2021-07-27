import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const {
  SID: accountSid,
  KEY: TwilloAuthToken,
  APIKEY: googleApiKey,
  CX: cx,
  NODE_TLS_REJECT_UNAUTHORIZED
} = process.env;

const twilioAuthentication = twilio(accountSid, TwilloAuthToken);
const { MessagingResponse } = twilio.twiml;
const twilioInstance = new MessagingResponse();

const production = () => {
  console.log('production environment');
};

const dev = () => {
  console.log('dev environment');
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
    console.error('Please set NODE_ENV environment variable');
    kill_server();
}

export { twilioAuthentication, googleApiKey, cx, twilioInstance };
