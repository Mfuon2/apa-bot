import { home, investments } from './steps.service';
import { getUserSession } from './redis.service';
import { getUserStep } from './session.service';
import { HOME, INVESTMENTS } from '../common/common.enum';
import { info } from './logger.service';

const ussd = async (req: any, res: any) => {
  await getUserSession(req.body.From).then((data) => {
    const step = getUserStep(data.steps);
    info(' Current Step : ' + step);
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
