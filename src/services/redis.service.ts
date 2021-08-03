import { SavedSession, Steps } from '../interfaces/session';
import Redis from 'ioredis';
import { error, info } from './logger.service';
import { http } from 'winston';
import dotenv from 'dotenv';
import { redis_host, redis_port } from '../config';
dotenv.config();

const redis = new Redis({
  //@ts-ignore
  port: parseInt(redis_port), // Redis port
  host: redis_host // Redis host
});

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
  if (session.length > 0)
    return {
      userId: user,
      steps: session
    };

  return {
    userId: user,
    steps: []
  };
};

redis.on('connect', function (x) {
  info(
    `Redis client connected to:\t ${redis.options.host}:${redis.options.port}`
  );
});
redis.on('error', (err) => {
  error(
    `Redis::error event - ${redis.options.host}:${redis.options.port} - ${err}`
  );
  error(err);
});

redis.on('message', function (channel: any, message: any) {
  http(`Receive message ${message} from channel ${channel}`);
});

redis.on('messageBuffer', function (channel: any, message: any) {
  http(`${channel} has ${message}`);
});

export { createSession, getUserSession, redis };
