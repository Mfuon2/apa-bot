import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import { FundBalance } from '../interfaces/fund_balance';

import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { createSession } from './redis.service';
import { INVESTMENTS } from '../common/common.enum';
import { INVESTMENT_BALANCE } from '../common/investment.enum';
import Logger from '../lib/logger';
import { info } from './logger.service';

const investments_balance = (req: any, res: any) => {
  const twilioInstance = new MessagingResponse();

  const data = qs.stringify({
    ClientIdentifier: '254725065948-123456'
  });
  createSession(req.body.From, INVESTMENTS.STEP, INVESTMENT_BALANCE.STEP).then(
    () => {
      info('Save Investment step');
    }
  );
  const config: AxiosRequestConfig = {
    method: 'post',
    url: 'https://192.168.100.112:7777/api/UnitTrust/FetchInvestorUnitTrustFunds?api-version=2.0',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer 306d110b9f0dcb21b093de208e9d62d5'
    },
    data: data
  };
  axios(config)
    .then((response: any) => {
      const dto: FundBalance = response.data;
      if (dto.IsSuccess) {
        twilioInstance.message(
          ` Dear ${dto.UnitTrustFundDetails[0].InvestorNames}, your account balance for Apollo Money Market is KES. ${dto.UnitTrustFundDetails[0].Balance}. Thanks for choosing us 😊`
        );
      } else {
        twilioInstance.message(`Your request failed with. Please try again`);
      }
      res.set('Content-Type', 'text/xml');
      return res.status(200).send(twilioInstance.toString());
    })
    .catch((error: any) => {
      Logger.error(error);
    });
};

export { investments_balance };
