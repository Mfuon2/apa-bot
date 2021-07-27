import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import { FundBalance } from '../interfaces/fund_balance';

import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

const investments_balance = (req: any, res: any) => {
  const twilioInstance = new MessagingResponse();

  const data = qs.stringify({
    ClientIdentifier: '254725065948-123456'
  });
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
        console.log(JSON.stringify(dto));
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
      console.log(error);
    });
};

export { investments_balance };
