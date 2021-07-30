import axios from 'axios';
import { redis } from './redis.service';
import { v4 as uuidv4 } from 'uuid';
import Logger from '../lib/logger';
import { info } from './logger.service';

const aamc_request = async (req: any) => {
  let message = req.body.Body.toLocaleLowerCase();
  const senderID = '254725065948';
  let sessionId: string | null = '';
  const uuid = await redis.get('session_' + req.body.From);
  if (uuid !== '' || uuid !== undefined || true) {
    sessionId = uuid;
  }
  Logger.info(sessionId);
  Logger.info(message);
  Logger.info(senderID);

  if (
    message.includes('hello') ||
    message.includes('hey') ||
    message.includes('hallo') ||
    message.includes('hi') ||
    message.includes('wewe') ||
    message.includes('sasa') ||
    message.includes('furaha') ||
    message.includes('mambo') ||
    message.includes('greeting')
  ) {
    message = '';
  }
  if (message === '1') {
    const checker = await redis
      .get('checker_' + req.body.From)
      .then(async (data) => {
        if (data === undefined || data === null || data == '' || data == '0') {
          const userCheck = await redis
            .set('checker_' + req.body.From, '1')
            .then(async () => {
              message = '';
              sessionId = uuidv4();
              await redis
                .set('session_' + req.body.From, sessionId)
                .then(() => {
                  info(
                    `Saved session key ${req.body.From} with Session ID : ${sessionId}`
                  );
                });
            });
        }
      });
  }

  Logger.info('New message: ' + message);

  /*https://gist.github.com/akexorcist/ea93ee47d39cf94e77802bc39c46589b*/
  const params = new URLSearchParams();
  params.append('phoneNumber', '254725065948');
  params.append('serviceCode', '*354#');
  params.append('text', message);
  params.append('networkCode', '45555');
  if (typeof sessionId === 'string') {
    params.append('sessionId', sessionId);
  }

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  const url = 'https://dev.api.apainsurance.ke/aamc/service';

  return axios
    .post(url, params, config)
    .then((result) => {
      let response = result.data;
      Logger.info(response);
      response = response.replace('CON ', '');
      response = response.replace('END ', '');
      return response;
    })
    .catch((err) => {
      Logger.error(err);
    });
};

export { aamc_request };
