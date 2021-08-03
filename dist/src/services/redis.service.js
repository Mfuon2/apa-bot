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
exports.redis = exports.getUserSession = exports.createSession = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const logger_service_1 = require("./logger.service");
const winston_1 = require("winston");
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("../config");
dotenv_1.default.config();
const redis = new ioredis_1.default({
    //@ts-ignore
    port: parseInt(config_1.redis_port),
    host: config_1.redis_host // Redis host
});
exports.redis = redis;
const createSession = (user, from, handlerFunction) => __awaiter(void 0, void 0, void 0, function* () {
    const session = {
        handler: handlerFunction,
        from: from
    };
    yield redis.lrange(`${user}`, 0, -1).then(() => __awaiter(void 0, void 0, void 0, function* () {
        yield redis.rpush(`${user}`, JSON.stringify(session));
    }));
});
exports.createSession = createSession;
const getUserSession = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield redis.lrange(`${user}`, 0, -1);
    if (session.length > 0)
        return {
            userId: user,
            steps: session
        };
    return {
        userId: user,
        steps: []
    };
});
exports.getUserSession = getUserSession;
redis.on('connect', function (x) {
    logger_service_1.info(`Redis client connected to:\t ${redis.options.host}:${redis.options.port}`);
});
redis.on('error', (err) => {
    logger_service_1.error(`Redis::error event - ${redis.options.host}:${redis.options.port} - ${err}`);
    logger_service_1.error(err);
});
redis.on('message', function (channel, message) {
    winston_1.http(`Receive message ${message} from channel ${channel}`);
});
redis.on('messageBuffer', function (channel, message) {
    winston_1.http(`${channel} has ${message}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9yZWRpcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHNEQUE0QjtBQUM1QixxREFBK0M7QUFDL0MscUNBQStCO0FBQy9CLG9EQUE0QjtBQUM1QixzQ0FBbUQ7QUFDbkQsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUdoQixNQUFNLEtBQUssR0FBRyxJQUFJLGlCQUFLLENBQUM7SUFDdEIsWUFBWTtJQUNaLElBQUksRUFBRSxRQUFRLENBQUMsbUJBQVUsQ0FBQztJQUMxQixJQUFJLEVBQUUsbUJBQVUsQ0FBQyxhQUFhO0NBQy9CLENBQUMsQ0FBQztBQThDcUMsc0JBQUs7QUE1QzdDLE1BQU0sYUFBYSxHQUFHLENBQU8sSUFBUyxFQUFFLElBQVMsRUFBRSxlQUFvQixFQUFFLEVBQUU7SUFDekUsTUFBTSxPQUFPLEdBQVU7UUFDckIsT0FBTyxFQUFFLGVBQWU7UUFDeEIsSUFBSSxFQUFFLElBQUk7S0FDWCxDQUFDO0lBQ0YsTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQVMsRUFBRTtRQUNuRCxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQSxDQUFDO0FBb0NPLHNDQUFhO0FBbEN0QixNQUFNLGNBQWMsR0FBRyxDQUFPLElBQVksRUFBeUIsRUFBRTtJQUNuRSxNQUFNLE9BQU8sR0FBVSxNQUFNLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUNwQixPQUFPO1lBQ0wsTUFBTSxFQUFFLElBQUk7WUFDWixLQUFLLEVBQUUsT0FBTztTQUNmLENBQUM7SUFFSixPQUFPO1FBQ0wsTUFBTSxFQUFFLElBQUk7UUFDWixLQUFLLEVBQUUsRUFBRTtLQUNWLENBQUM7QUFDSixDQUFDLENBQUEsQ0FBQztBQXNCc0Isd0NBQWM7QUFwQnRDLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQztJQUM3QixxQkFBSSxDQUNGLGdDQUFnQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUMzRSxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSCxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ3hCLHNCQUFLLENBQ0gsd0JBQXdCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUM1RSxDQUFDO0lBQ0Ysc0JBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNiLENBQUMsQ0FBQyxDQUFDO0FBRUgsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxPQUFZLEVBQUUsT0FBWTtJQUN0RCxjQUFJLENBQUMsbUJBQW1CLE9BQU8saUJBQWlCLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFDN0QsQ0FBQyxDQUFDLENBQUM7QUFFSCxLQUFLLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxVQUFVLE9BQVksRUFBRSxPQUFZO0lBQzVELGNBQUksQ0FBQyxHQUFHLE9BQU8sUUFBUSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLENBQUMsQ0FBQyxDQUFDIn0=