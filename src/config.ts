import dotenv from 'dotenv';
import twilio from 'twilio';
dotenv.config();

const {
  SID: accountSid,
  KEY: TwilloAuthToken,
  APIKEY: googleApiKey,
  CX: cx
} = process.env;

const twilioAuthentication = twilio(accountSid, TwilloAuthToken);
const { MessagingResponse } = twilio.twiml;
const twilioInstance = new MessagingResponse();
export { twilioAuthentication, googleApiKey, cx, twilioInstance };
