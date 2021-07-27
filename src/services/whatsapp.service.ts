import { investments, wrong_selection } from './steps.service';
import { getUserSession } from './redis.service';
import { getUserStep } from './session.service';

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
  const selection = req.body.Body;
  await getUserSession(req.body.From).then((data) => {
    getUserStep(data);
  });

  switch (selection) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
      return investments(req, res);
    default:
      return wrong_selection(req, res);
  }
};

export { ussd };
