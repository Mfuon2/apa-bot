import {
  CUSTOMER_SERVICE,
  EXIT,
  HOME,
  INVESTMENTS,
  LIFE,
  MOTOR,
  WRONG_SELECTION
} from '../common/common.enum';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import { cx, googleApiKey } from '../config';
import { google } from 'googleapis';
import { investments_balance } from './sub_steps.service';
import { createSession } from './redis.service';
import { INVESTMENT_BALANCE } from '../common/investment.enum';
const customsearch = google.customsearch('v1');

const home = (req: any, res: any): any => {
  const twilioInstance = new MessagingResponse();
  req.session.value = req.body.From;
  req.session['step'] = HOME.STEP;
  twilioInstance.message(
    `${HOME.BODY}${HOME.MOTOR_INSURANCE}${HOME.MONEY_MARKET} ${HOME.LIFE_ASSURANCE} ${HOME.TERMS_CONDITION} ${HOME.WEBSITE} ${HOME.EXIT}`
  );
  res.set('Content-Type', 'text/xml');
  return res.status(200).send(twilioInstance.toString());
};

const motor = (req: any, res: any) => {
  const twilioInstance = new MessagingResponse();
  req.session['step'] = MOTOR.STEP;
  twilioInstance.message(
    `${MOTOR.BODY}${MOTOR.QUOTE}${MOTOR.RENEW} ${MOTOR.DETAILS} ${MOTOR.PREVIOUS} ${MOTOR.EXIT}`
  );
  res.set('Content-Type', 'text/xml');
  return res.status(200).send(twilioInstance.toString());
};

const investments = (req: any, res: any) => {
  const twilioInstance = new MessagingResponse();
  req.session['step'] = INVESTMENTS.STEP;
  switch (req.body.Body) {
    case '1':
      createSession(
        req.body.From,
        INVESTMENTS.STEP,
        INVESTMENT_BALANCE.STEP
      ).then(() => {
        return investments_balance(req, res);
      });
      break;
    default:
      twilioInstance.message(
        `${INVESTMENTS.BODY} ${INVESTMENTS.CHECK_INVESTMENT_BALANCE} ${INVESTMENTS.INVESTMENT_TOP_UP} ${INVESTMENTS.INVESTMENT_WITHDRAW} ${MOTOR.PREVIOUS} ${MOTOR.EXIT}`
      );
      res.set('Content-Type', 'text/xml');
      return res.status(200).send(twilioInstance.toString());
  }
};

const life = (req: any, res: any) => {
  const twilioInstance = new MessagingResponse();
  req.session['step'] = LIFE.STEP;
  twilioInstance.message(
    `${LIFE.BODY} ${LIFE.QUOTE} ${LIFE.BENEFICIARIES} ${MOTOR.PREVIOUS} ${MOTOR.EXIT}`
  );
  res.set('Content-Type', 'text/xml');
  return res.status(200).send(twilioInstance.toString());
};

const customer_service = (req: any, res: any) => {
  const twilioInstance = new MessagingResponse();
  req.session['step'] = CUSTOMER_SERVICE.STEP;
  twilioInstance.message(
    `${CUSTOMER_SERVICE.BODY} ${CUSTOMER_SERVICE.CONTACT_DETAILS} ${MOTOR.PREVIOUS} ${MOTOR.EXIT}`
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

const exit = (req: any, res: any) => {
  const twilioInstance = new MessagingResponse();
  req.session['step'] = '';
  twilioInstance.message(`${EXIT.BODY}`);
  res.set('Content-Type', 'text/xml');
  return res.status(200).send(twilioInstance.toString());
};

const website_search = async (req: any, res: any, next: any) => {
  const twiml = new MessagingResponse();
  const q = req.body.Body;
  const options = { cx, q, auth: googleApiKey };
  try {
    const result = await customsearch.cse.list(options);
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
    return next(error);
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
