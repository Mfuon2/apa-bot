import { home, investments } from './steps.service';
import { getUserSession } from './redis.service';
import { getUserStep } from './session.service';
import { HOME, INVESTMENTS } from '../common/common.enum';

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
const ussd = async (req: any, res: any) => {
  await getUserSession(req.body.From).then((data) => {
    const step = getUserStep(data.steps);
    console.log(step);
    if (
      step === undefined ||
      step.toLocaleLowerCase().match('hi') ||
      step.toLocaleLowerCase().match('hello') ||
      step.toLocaleLowerCase().match('hey')
    ) {
      return home(req, res);
    }
    switch (step) {
      case HOME.STEP:
        home(req, res);
        break;
      case INVESTMENTS.STEP:
        investments(req, res);
        break;
      default:
        home(req, res);
        break;
    }
  });
};

export { ussd };
