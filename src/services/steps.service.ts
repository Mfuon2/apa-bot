import {
  CUSTOMER_SERVICE,
  EXIT_MAIN,
  HOME,
  INVESTMENTS,
  LIFE,
  MAINTENANCE,
  MOTOR,
  WRONG_SELECTION
} from '../common/common.enum';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import { cx, googleApiKey } from '../config';
import { google } from 'googleapis';
import { createSession, redis } from './redis.service';
import { aamc_request } from './request.js';
import Logger from '../lib/logger';
import { info } from './logger.service';

const log = Logger;
const customSearch = google.customsearch('v1');

const home = (req: any, res: any): any => {
  controller(req, res);
};

const motor = (req: any, res: any) => {
  const twilioInstance = new MessagingResponse();
  twilioInstance.message(`${MOTOR.BODY}`);
  twilioInstance.message(`${MAINTENANCE.BODY}`);
  createSession(req.body.From, HOME.STEP, HOME.STEP).then(() => {
    info(`Handler: ${HOME.STEP}`);
  });
  res.set('Content-Type', 'text/xml');
  return res.status(200).send(twilioInstance.toString());
};

const controller = (req: any, res: any) => {
  const twilioInstance = new MessagingResponse();
  log.info(' Instruction ' + req.body.Body);
  switch (req.body.Body.toLocaleLowerCase()) {
    case '1':
    case 'money':
    case 'money market':
      createSession(req.body.From, HOME.STEP, INVESTMENTS.STEP).then(() => {
        investments(req, res).then(() => {
          info(`Handler: ${INVESTMENTS.STEP}`);
        });
      });
      break;
    case '20':
    case '30':
    case '40':
    case '50':
      createSession(req.body.From, HOME.STEP, HOME.STEP).then(() => {
        twilioInstance.message(`${MAINTENANCE.BODY}`);
        twilioInstance.message(
          `Please select Highlighted options to proceed ${HOME.MONEY_MARKET} ${HOME.MOTOR}  ${HOME.LIFE} ${HOME.UPENDO} ${HOME.HEALTH} ${HOME.EXIT}`
        );
        res.set('Content-Type', 'text/xml');
        return res.status(200).send(twilioInstance.toString());
      });
      break;
    case '7':
    case 'exit':
      createSession(req.body.From, HOME.STEP, HOME.STEP).then(() => {
        return exit(req, res);
      });
      break;
    default:
      twilioInstance.message(
        `${HOME.BODY} ${HOME.MONEY_MARKET} ${HOME.MOTOR}  ${HOME.LIFE} ${HOME.UPENDO} ${HOME.HEALTH} ${HOME.EXIT}`
      );
      createSession(req.body.From, HOME.STEP, HOME.STEP).then(() => {
        info(`Current Handler: ${HOME.STEP}`);
      });
      res.set('Content-Type', 'text/xml');
      return res.status(200).send(twilioInstance.toString());
  }
};

const investments = async (req: any, res: any) => {
  const twilioInstance = new MessagingResponse();

  if (req.body.Body === '6') {
    return exit(req, res);
  } else {
    await aamc_request(req).then((x) => {
      twilioInstance.message(`${x}`);
      twilioInstance.message(`${INVESTMENTS.EXIT}`);
      res.set('Content-Type', 'text/xml');
      return res.status(200).send(twilioInstance.toString());
    });
  }
};

const life = (req: any, res: any) => {
  const twilioInstance = new MessagingResponse();
  req.session['step'] = LIFE.STEP;
  twilioInstance.message(
    `${LIFE.BODY} ${LIFE.QUOTE} ${LIFE.BENEFICIARIES} ${LIFE.PREVIOUS} ${LIFE.EXIT_LIFE}`
  );
  res.set('Content-Type', 'text/xml');
  return res.status(200).send(twilioInstance.toString());
};

const customer_service = (req: any, res: any) => {
  const twilioInstance = new MessagingResponse();
  req.session['step'] = CUSTOMER_SERVICE.STEP;
  twilioInstance.message(
    `${CUSTOMER_SERVICE.BODY} ${CUSTOMER_SERVICE.CONTACT_DETAILS}${MOTOR.EXIT}`
  );
  res.set('Content-Type', 'text/xml');
  return res.status(200).send(twilioInstance.toString());
};

const wrong_selection = (req: any, res: any) => {
  const twilioInstance = new MessagingResponse();
  req.session['step'] = '';
  twilioInstance.message(`${WRONG_SELECTION.BODY}`);
  res.set('Content-Type', 'text/xml');
  return res.status(200).send(twilioInstance.toString());
};

const exit = async (req: any, res: any) => {
  const twilioInstance = new MessagingResponse();
  createSession(req.body.From, HOME.STEP, HOME.STEP).then(async () => {
    await redis
      .set('checker_' + req.body.From, '0')
      .then(() => {
        twilioInstance.message(`${EXIT_MAIN.BODY}`);
        res.set('Content-Type', 'text/xml');
        return res.status(200).send(twilioInstance.toString());
      })
      .then(async () => {
        await redis.set('session_' + req.body.From, '');
      });
  });
};

const website_search = async (req: any, res: any) => {
  const twiml = new MessagingResponse();
  const q = req.body.Body;
  const options = { cx, q, auth: googleApiKey };
  try {
    const result = await customSearch.cse.list(options);
    if (result.data.items && result.data.items.length > 0) {
      for (const values of result.data.items) {
        twiml.message(`${values.snippet}   ${values.link}`);
      }
    } else {
      twiml.message(`No Results Found `);
    }
    res.set('Content-Type', 'text/xml');
    return res.status(200).send(twiml.toString());
  } catch (error) {
    return error;
  }
};
export {
  home,
  motor,
  website_search,
  investments,
  life,
  customer_service,
  wrong_selection,
  exit
};
