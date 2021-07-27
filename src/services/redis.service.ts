import { SavedSession, Steps } from '../interfaces/session';
import Redis from 'ioredis';

const redis = new Redis();

const createSession = async (user: any, from: any, handlerFunction: any) => {
  const session: Steps = {
    handler: handlerFunction,
    from: from
  };
  await redis.lrange(`${user}`, 0, -1).then(async () => {
    await redis.rpush(`${user}`, JSON.stringify(session));
  });
};

const getUserSession = async (user: string): Promise<SavedSession> => {
  const session: any[] = await redis.lrange(`${user}`, 0, -1);
  return {
    userId: user,
    steps: session
  };
};
export { createSession, getUserSession };
