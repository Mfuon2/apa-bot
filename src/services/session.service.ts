import { SavedSession, Steps } from '../interfaces/session';

const getUserStep = (session: SavedSession) => {
  const steps: Steps[] = session.steps;
  console.log(steps[steps.length - 1]);
};

export { getUserStep };
