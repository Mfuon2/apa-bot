import { Steps } from '../interfaces/session';
import { HOME } from '../common/common.enum';

const getUserStep = (session: Steps[]): string => {
  const steps: Steps[] = session;
  let step = '';
  if (steps.length > 0) {
    // @ts-ignore
    const x: Steps | undefined = JSON.parse(steps.pop());
    step = x?.handler;
    return step;
  } else step = HOME.STEP;
  return step;
};

export { getUserStep };
