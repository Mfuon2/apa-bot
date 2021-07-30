import axios from 'axios';
import { createSession, redis } from './redis.service';
import { v4 as uuidv4 } from 'uuid';
import { HOME, INVESTMENTS } from '../common/common.enum';

const aamc_request = async (req: any) => {
  let message = req.body.Body.toLocaleLowerCase();
  const senderID = '254725065948';
  let sessionId: string | null = '';
  const uuid = await redis.get('session_' + req.body.From);
  if (uuid !== '' || uuid !== undefined || true) {
    sessionId = uuid;
  }
  console.log(sessionId);
  console.log(message);
  console.log(senderID);

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
                .then(() => {});
            });
        }
      });
  }

  console.log('New message: ' + message);

  /*https://gist.github.com/akexorcist/ea93ee47d39cf94e77802bc39c46589b*/
  const params = new URLSearchParams();
  params.append('phoneNumber', '254725065948');
  params.append('serviceCode', '*354#');
  params.append('text', message);
  params.append('networkCode', '45555');
  if (typeof sessionId === 'string') {
    params.append('sessionId', sessionId);
  }

  /*
phoneNumber:254725065948
serviceCode:*354#
text:1
networkCode:45555
sessionId:s1
*/
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
      console.log(response);
      response = response.replace('CON ', '');
      response = response.replace('END ', '');
      return response;
    })
    .catch((err) => {
      console.log(err);
    });

  // Write a function to send message back to WhatsApp
  //await WA.sendMessage('Hello from the other side.', senderID);
};

export { aamc_request };
