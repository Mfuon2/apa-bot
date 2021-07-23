import { google } from "googleapis";
import { cx, googleApiKey, twilioInstance } from "../config";
import MessagingResponse from "twilio/lib/twiml/MessagingResponse";
import { HOME, MOTOR } from "../common/common.enum";
import { home, motor } from "./steps.service";
const sessions = require("express-session");
const customsearch = google.customsearch("v1");
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
const googleSearch = async (req: any, res: any, next: any) => {};
const ussd = async (req: any, res: any, next: any) => {
  const twilioInstance = new MessagingResponse();
  req.session["name"] = req.body.From;
  const name: string = req.session["name"];
  const step: string = req.session["step" + name];
  console.log(`Incoming message from ${name}: ${step}`);
  const rule = req.body.Body;
  if (rule === "5") {
    const twiml = twilioInstance;
    const q = req.body.Body;
    const options = { cx, q, auth: googleApiKey };
    try {
      // @ts-ignore
      const result = await customsearch.cse.list(options);
      // @ts-ignore
      const firstResult = result.data.items[0];

      let searchData: string | never[] = [];
      const link = firstResult.link;

      if (q == "1") {
        twiml.message(
          `*Welcome to Sap* \n --------------*-------------\n Scalable Bot for a customized search engine `
        );
      } else {
        if (result.data.items && result.data.items.length > 0) {
          for (let values of result.data.items) {
            twiml.message(`${values.snippet}   ${values.link}`);
          }
        } else {
          twiml.message(`No Results Found `);
        }
      }
      res.set("Content-Type", "text/xml");
      return res.status(200).send(twiml.toString());
    } catch (error) {
      return next(error);
    }
  } else if (rule === "1") {
    return motor(req, res, next);
  } else {
    return home(req, res, next);
  }
};

const status = async (req: any, res: any, next: any) => {
  console.log(" =======> ======> =======> ======> " + JSON.stringify(req.body));
};
export { ussd, googleSearch, status };
