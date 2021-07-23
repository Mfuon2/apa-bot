import { google } from 'googleapis';
import { cx, googleApiKey } from '../config';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import { home} from './steps.service';
const customsearch = google.customsearch('v1');
/**
 * @class WhatsappBot
 * @description class will implement bot functionality
 */
/**
 * @memberof WhatsappBot
 * @param {object} req - Request sent to the route
 * @param {object} res - Response sent from the controller
 * @param {object} next - Error handler
 * @returns {object} - object representing response message
 */
const ussd = async (req: any, res: any, next: any) => {
  const twilioInstance = new MessagingResponse();
  req.session['name'] = req.body.From;
  const name: string = req.session['name'];
  const step: string = req.session['step' + name];
  console.log(`Incoming message from ${name}: ${step}`);
  const rule = req.body.Body;
  if (rule === '5') {
    const twiml = twilioInstance;
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
  } else {
    return home(req, res);
  }
};

const status = async (req: { body: any }): Promise<string> => {
  console.log(' =======> ======> =======> ======> ' + JSON.stringify(req.body));
  return '';
};
export { ussd, status };
