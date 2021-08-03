"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aamc_request = void 0;
const axios_1 = __importDefault(require("axios"));
const redis_service_1 = require("./redis.service");
const uuid_1 = require("uuid");
const logger_1 = __importDefault(require("../lib/logger"));
const logger_service_1 = require("./logger.service");
const aamc_request = (req) => __awaiter(void 0, void 0, void 0, function* () {
    let message = req.body.Body.toLocaleLowerCase();
    const senderID = '254725065948';
    let sessionId = '';
    const uuid = yield redis_service_1.redis.get('session_' + req.body.From);
    if (uuid !== '' || uuid !== undefined || true) {
        sessionId = uuid;
    }
    logger_1.default.info(sessionId);
    logger_1.default.info(message);
    logger_1.default.info(senderID);
    if (message.includes('hello') ||
        message.includes('hey') ||
        message.includes('hallo') ||
        message.includes('hi') ||
        message.includes('wewe') ||
        message.includes('sasa') ||
        message.includes('furaha') ||
        message.includes('mambo') ||
        message.includes('greeting')) {
        message = '';
    }
    if (message === '1') {
        const checker = yield redis_service_1.redis
            .get('checker_' + req.body.From)
            .then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (data === undefined || data === null || data == '' || data == '0') {
                const userCheck = yield redis_service_1.redis
                    .set('checker_' + req.body.From, '1')
                    .then(() => __awaiter(void 0, void 0, void 0, function* () {
                    message = '';
                    sessionId = uuid_1.v4();
                    yield redis_service_1.redis
                        .set('session_' + req.body.From, sessionId)
                        .then(() => {
                        logger_service_1.info(`Saved session key ${req.body.From} with Session ID : ${sessionId}`);
                    });
                }));
            }
        }));
    }
    logger_1.default.info('New message: ' + message);
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
    return axios_1.default
        .post(url, params, config)
        .then((result) => {
        let response = result.data;
        logger_1.default.info(response);
        response = response.replace('CON ', '');
        response = response.replace('END ', '');
        return response;
    })
        .catch((err) => {
        logger_1.default.error(err);
    });
});
exports.aamc_request = aamc_request;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9yZXF1ZXN0LmpzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUEwQjtBQUMxQixtREFBd0M7QUFDeEMsK0JBQW9DO0FBQ3BDLDJEQUFtQztBQUNuQyxxREFBd0M7QUFFeEMsTUFBTSxZQUFZLEdBQUcsQ0FBTyxHQUFRLEVBQUUsRUFBRTtJQUN0QyxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ2hELE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQztJQUNoQyxJQUFJLFNBQVMsR0FBa0IsRUFBRSxDQUFDO0lBQ2xDLE1BQU0sSUFBSSxHQUFHLE1BQU0scUJBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekQsSUFBSSxJQUFJLEtBQUssRUFBRSxJQUFJLElBQUksS0FBSyxTQUFTLElBQUksSUFBSSxFQUFFO1FBQzdDLFNBQVMsR0FBRyxJQUFJLENBQUM7S0FDbEI7SUFDRCxnQkFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QixnQkFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQixnQkFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUV0QixJQUNFLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQzVCO1FBQ0EsT0FBTyxHQUFHLEVBQUUsQ0FBQztLQUNkO0lBQ0QsSUFBSSxPQUFPLEtBQUssR0FBRyxFQUFFO1FBQ25CLE1BQU0sT0FBTyxHQUFHLE1BQU0scUJBQUs7YUFDeEIsR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUMvQixJQUFJLENBQUMsQ0FBTyxJQUFJLEVBQUUsRUFBRTtZQUNuQixJQUFJLElBQUksS0FBSyxTQUFTLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7Z0JBQ3BFLE1BQU0sU0FBUyxHQUFHLE1BQU0scUJBQUs7cUJBQzFCLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO3FCQUNwQyxJQUFJLENBQUMsR0FBUyxFQUFFO29CQUNmLE9BQU8sR0FBRyxFQUFFLENBQUM7b0JBQ2IsU0FBUyxHQUFHLFNBQU0sRUFBRSxDQUFDO29CQUNyQixNQUFNLHFCQUFLO3lCQUNSLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDO3lCQUMxQyxJQUFJLENBQUMsR0FBRyxFQUFFO3dCQUNULHFCQUFJLENBQ0YscUJBQXFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxzQkFBc0IsU0FBUyxFQUFFLENBQ3BFLENBQUM7b0JBQ0osQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQzthQUNOO1FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztLQUNOO0lBRUQsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxDQUFDO0lBRXZDLHVFQUF1RTtJQUN2RSxNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO0lBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUFFO1FBQ2pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQ3ZDO0lBRUQsTUFBTSxNQUFNLEdBQUc7UUFDYixPQUFPLEVBQUU7WUFDUCxjQUFjLEVBQUUsbUNBQW1DO1NBQ3BEO0tBQ0YsQ0FBQztJQUVGLE1BQU0sR0FBRyxHQUFHLDhDQUE4QyxDQUFDO0lBRTNELE9BQU8sZUFBSztTQUNULElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztTQUN6QixJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUNmLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDM0IsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEIsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLFFBQVEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4QyxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNiLGdCQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBLENBQUM7QUFFTyxvQ0FBWSJ9