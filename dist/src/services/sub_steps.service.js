"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.investments_balance = void 0;
const MessagingResponse_1 = __importDefault(require("twilio/lib/twiml/MessagingResponse"));
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const redis_service_1 = require("./redis.service");
const common_enum_1 = require("../common/common.enum");
const investment_enum_1 = require("../common/investment.enum");
const logger_1 = __importDefault(require("../lib/logger"));
const logger_service_1 = require("./logger.service");
const investments_balance = (req, res) => {
    const twilioInstance = new MessagingResponse_1.default();
    const data = qs_1.default.stringify({
        ClientIdentifier: '254725065948-123456'
    });
    redis_service_1.createSession(req.body.From, common_enum_1.INVESTMENTS.STEP, investment_enum_1.INVESTMENT_BALANCE.STEP).then(() => {
        logger_service_1.info('Save Investment step');
    });
    const config = {
        method: 'post',
        url: 'https://192.168.100.112:7777/api/UnitTrust/FetchInvestorUnitTrustFunds?api-version=2.0',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer 306d110b9f0dcb21b093de208e9d62d5'
        },
        data: data
    };
    axios_1.default(config)
        .then((response) => {
        const dto = response.data;
        if (dto.IsSuccess) {
            twilioInstance.message(` Dear ${dto.UnitTrustFundDetails[0].InvestorNames}, your account balance for Apollo Money Market is KES. ${dto.UnitTrustFundDetails[0].Balance}. Thanks for choosing us 😊`);
        }
        else {
            twilioInstance.message(`Your request failed with. Please try again`);
        }
        res.set('Content-Type', 'text/xml');
        return res.status(200).send(twilioInstance.toString());
    })
        .catch((error) => {
        logger_1.default.error(error);
    });
};
exports.investments_balance = investments_balance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViX3N0ZXBzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvc3ViX3N0ZXBzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMkZBQW1FO0FBR25FLGtEQUFrRDtBQUNsRCw0Q0FBb0I7QUFDcEIsbURBQWdEO0FBQ2hELHVEQUFvRDtBQUNwRCwrREFBK0Q7QUFDL0QsMkRBQW1DO0FBQ25DLHFEQUF3QztBQUV4QyxNQUFNLG1CQUFtQixHQUFHLENBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxFQUFFO0lBQ2pELE1BQU0sY0FBYyxHQUFHLElBQUksMkJBQWlCLEVBQUUsQ0FBQztJQUUvQyxNQUFNLElBQUksR0FBRyxZQUFFLENBQUMsU0FBUyxDQUFDO1FBQ3hCLGdCQUFnQixFQUFFLHFCQUFxQjtLQUN4QyxDQUFDLENBQUM7SUFDSCw2QkFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLHlCQUFXLENBQUMsSUFBSSxFQUFFLG9DQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDMUUsR0FBRyxFQUFFO1FBQ0gscUJBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FDRixDQUFDO0lBQ0YsTUFBTSxNQUFNLEdBQXVCO1FBQ2pDLE1BQU0sRUFBRSxNQUFNO1FBQ2QsR0FBRyxFQUFFLHdGQUF3RjtRQUM3RixPQUFPLEVBQUU7WUFDUCxjQUFjLEVBQUUsbUNBQW1DO1lBQ25ELGFBQWEsRUFBRSx5Q0FBeUM7U0FDekQ7UUFDRCxJQUFJLEVBQUUsSUFBSTtLQUNYLENBQUM7SUFDRixlQUFLLENBQUMsTUFBTSxDQUFDO1NBQ1YsSUFBSSxDQUFDLENBQUMsUUFBYSxFQUFFLEVBQUU7UUFDdEIsTUFBTSxHQUFHLEdBQWdCLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDdkMsSUFBSSxHQUFHLENBQUMsU0FBUyxFQUFFO1lBQ2pCLGNBQWMsQ0FBQyxPQUFPLENBQ3BCLFNBQVMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsMERBQTBELEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLDZCQUE2QixDQUM3SyxDQUFDO1NBQ0g7YUFBTTtZQUNMLGNBQWMsQ0FBQyxPQUFPLENBQUMsNENBQTRDLENBQUMsQ0FBQztTQUN0RTtRQUNELEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQyxDQUFDO1NBQ0QsS0FBSyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDcEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUM7QUFFTyxrREFBbUIifQ==