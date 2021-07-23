import { HOME, MOTOR } from '../common/common.enum';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';

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
  req.session.value = req.body.From;
  req.session['step'] = MOTOR.STEP;
  twilioInstance.message(
    `${MOTOR.BODY}${MOTOR.QUOTE}${MOTOR.RENEW} ${MOTOR.DETAILS} ${MOTOR.PREVIOUS} 
        ${MOTOR.EXIT}`
  );
  res.set('Content-Type', 'text/xml');
  return res.status(200).send(twilioInstance.toString());
};
export { home, motor };
