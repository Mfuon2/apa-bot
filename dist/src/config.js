"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis_port = exports.redis_host = exports.twilioInstance = exports.cx = exports.googleApiKey = exports.twilioAuthentication = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const twilio_1 = __importDefault(require("twilio"));
const logger_1 = __importDefault(require("./lib/logger"));
const log = logger_1.default;
dotenv_1.default.config();
const { SID: accountSid, KEY: TwilloAuthToken, APIKEY: googleApiKey, CX: cx, NODE_TLS_REJECT_UNAUTHORIZED, REDIS_HOST: redis_host, REDIS_PORT: redis_port } = process.env;
exports.googleApiKey = googleApiKey;
exports.cx = cx;
exports.redis_host = redis_host;
exports.redis_port = redis_port;
const twilioAuthentication = twilio_1.default(accountSid, TwilloAuthToken);
exports.twilioAuthentication = twilioAuthentication;
const { MessagingResponse } = twilio_1.default.twiml;
const twilioInstance = new MessagingResponse();
exports.twilioInstance = twilioInstance;
const production = () => {
    log.info('production environment');
};
const dev = () => {
    log.info('Started Dev environment');
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
};
const kill_server = () => {
    process.once('SIGUSR2', function () {
        process.kill(process.pid, 'SIGUSR2');
        process.exit();
    });
};
switch (process.env.NODE_ENV) {
    case 'prod':
        production();
        break;
    case 'dev':
        dev();
        break;
    default:
        kill_server();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxvREFBNEI7QUFDNUIsb0RBQTRCO0FBQzVCLDBEQUFrQztBQUNsQyxNQUFNLEdBQUcsR0FBRSxnQkFBTSxDQUFBO0FBQ2pCLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEIsTUFBTSxFQUNKLEdBQUcsRUFBRSxVQUFVLEVBQ2YsR0FBRyxFQUFFLGVBQWUsRUFDcEIsTUFBTSxFQUFFLFlBQVksRUFDcEIsRUFBRSxFQUFFLEVBQUUsRUFDTiw0QkFBNEIsRUFDNUIsVUFBVSxFQUFFLFVBQVUsRUFDdEIsVUFBVSxFQUFFLFVBQVUsRUFDdkIsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBa0NlLG9DQUFZO0FBQUUsZ0JBQUU7QUFBa0IsZ0NBQVU7QUFBRSxnQ0FBVTtBQWhDdkYsTUFBTSxvQkFBb0IsR0FBRyxnQkFBTSxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztBQWdDeEQsb0RBQW9CO0FBL0I3QixNQUFNLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxnQkFBTSxDQUFDLEtBQUssQ0FBQztBQUMzQyxNQUFNLGNBQWMsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7QUE4QkUsd0NBQWM7QUE1Qi9ELE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRTtJQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUFDO0FBRUYsTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFO0lBQ2YsR0FBRyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEdBQUcsR0FBRyxDQUFDO0FBQ2pELENBQUMsQ0FBQztBQUVGLE1BQU0sV0FBVyxHQUFHLEdBQUcsRUFBRTtJQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDckMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsUUFBUSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtJQUM1QixLQUFLLE1BQU07UUFDVCxVQUFVLEVBQUUsQ0FBQztRQUNiLE1BQU07SUFDUixLQUFLLEtBQUs7UUFDUixHQUFHLEVBQUUsQ0FBQztRQUNOLE1BQU07SUFDUjtRQUVFLFdBQVcsRUFBRSxDQUFDO0NBQ2pCIn0=