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
exports.exit = exports.wrong_selection = exports.customer_service = exports.life = exports.investments = exports.website_search = exports.motor = exports.home = void 0;
const common_enum_1 = require("../common/common.enum");
const MessagingResponse_1 = __importDefault(require("twilio/lib/twiml/MessagingResponse"));
const config_1 = require("../config");
const googleapis_1 = require("googleapis");
const redis_service_1 = require("./redis.service");
const request_js_1 = require("./request.js");
const logger_1 = __importDefault(require("../lib/logger"));
const logger_service_1 = require("./logger.service");
const log = logger_1.default;
const customSearch = googleapis_1.google.customsearch('v1');
const home = (req, res) => {
    controller(req, res);
};
exports.home = home;
const motor = (req, res) => {
    const twilioInstance = new MessagingResponse_1.default();
    twilioInstance.message(`${common_enum_1.MOTOR.BODY}`);
    twilioInstance.message(`${common_enum_1.MAINTENANCE.BODY}`);
    redis_service_1.createSession(req.body.From, common_enum_1.HOME.STEP, common_enum_1.HOME.STEP).then(() => {
        logger_service_1.info(`Handler: ${common_enum_1.HOME.STEP}`);
    });
    res.set('Content-Type', 'text/xml');
    return res.status(200).send(twilioInstance.toString());
};
exports.motor = motor;
const controller = (req, res) => {
    const twilioInstance = new MessagingResponse_1.default();
    log.info(' Instruction ' + req.body.Body);
    switch (req.body.Body.toLocaleLowerCase()) {
        case '1':
        case 'money':
        case 'money market':
            redis_service_1.createSession(req.body.From, common_enum_1.HOME.STEP, common_enum_1.INVESTMENTS.STEP).then(() => {
                investments(req, res).then(() => {
                    logger_service_1.info(`Handler: ${common_enum_1.INVESTMENTS.STEP}`);
                });
            });
            break;
        case '20':
        case '30':
        case '40':
        case '50':
            redis_service_1.createSession(req.body.From, common_enum_1.HOME.STEP, common_enum_1.HOME.STEP).then(() => {
                twilioInstance.message(`${common_enum_1.MAINTENANCE.BODY}`);
                twilioInstance.message(`Please select Highlighted options to proceed ${common_enum_1.HOME.MONEY_MARKET} ${common_enum_1.HOME.MOTOR}  ${common_enum_1.HOME.LIFE} ${common_enum_1.HOME.UPENDO} ${common_enum_1.HOME.HEALTH} ${common_enum_1.HOME.EXIT}`);
                res.set('Content-Type', 'text/xml');
                return res.status(200).send(twilioInstance.toString());
            });
            break;
        case '7':
        case 'exit':
            redis_service_1.createSession(req.body.From, common_enum_1.HOME.STEP, common_enum_1.HOME.STEP).then(() => {
                return exit(req, res);
            });
            break;
        default:
            twilioInstance.message(`${common_enum_1.HOME.BODY} ${common_enum_1.HOME.MONEY_MARKET} ${common_enum_1.HOME.MOTOR}  ${common_enum_1.HOME.LIFE} ${common_enum_1.HOME.UPENDO} ${common_enum_1.HOME.HEALTH} ${common_enum_1.HOME.EXIT}`);
            redis_service_1.createSession(req.body.From, common_enum_1.HOME.STEP, common_enum_1.HOME.STEP).then(() => {
                logger_service_1.info(`Current Handler: ${common_enum_1.HOME.STEP}`);
            });
            res.set('Content-Type', 'text/xml');
            return res.status(200).send(twilioInstance.toString());
    }
};
const investments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const twilioInstance = new MessagingResponse_1.default();
    if (req.body.Body === '6') {
        return exit(req, res);
    }
    else {
        yield request_js_1.aamc_request(req).then((x) => {
            twilioInstance.message(`${x}`);
            twilioInstance.message(`${common_enum_1.INVESTMENTS.EXIT}`);
            res.set('Content-Type', 'text/xml');
            return res.status(200).send(twilioInstance.toString());
        });
    }
});
exports.investments = investments;
const life = (req, res) => {
    const twilioInstance = new MessagingResponse_1.default();
    req.session['step'] = common_enum_1.LIFE.STEP;
    twilioInstance.message(`${common_enum_1.LIFE.BODY} ${common_enum_1.LIFE.QUOTE} ${common_enum_1.LIFE.BENEFICIARIES} ${common_enum_1.LIFE.PREVIOUS} ${common_enum_1.LIFE.EXIT_LIFE}`);
    res.set('Content-Type', 'text/xml');
    return res.status(200).send(twilioInstance.toString());
};
exports.life = life;
const customer_service = (req, res) => {
    const twilioInstance = new MessagingResponse_1.default();
    req.session['step'] = common_enum_1.CUSTOMER_SERVICE.STEP;
    twilioInstance.message(`${common_enum_1.CUSTOMER_SERVICE.BODY} ${common_enum_1.CUSTOMER_SERVICE.CONTACT_DETAILS}${common_enum_1.MOTOR.EXIT}`);
    res.set('Content-Type', 'text/xml');
    return res.status(200).send(twilioInstance.toString());
};
exports.customer_service = customer_service;
const wrong_selection = (req, res) => {
    const twilioInstance = new MessagingResponse_1.default();
    req.session['step'] = '';
    twilioInstance.message(`${common_enum_1.WRONG_SELECTION.BODY}`);
    res.set('Content-Type', 'text/xml');
    return res.status(200).send(twilioInstance.toString());
};
exports.wrong_selection = wrong_selection;
const exit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const twilioInstance = new MessagingResponse_1.default();
    redis_service_1.createSession(req.body.From, common_enum_1.HOME.STEP, common_enum_1.HOME.STEP).then(() => __awaiter(void 0, void 0, void 0, function* () {
        yield redis_service_1.redis
            .set('checker_' + req.body.From, '0')
            .then(() => {
            twilioInstance.message(`${common_enum_1.EXIT_MAIN.BODY}`);
            res.set('Content-Type', 'text/xml');
            return res.status(200).send(twilioInstance.toString());
        })
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            yield redis_service_1.redis.set('session_' + req.body.From, '');
        }));
    }));
});
exports.exit = exit;
const website_search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const twiml = new MessagingResponse_1.default();
    const q = req.body.Body;
    const options = { cx: config_1.cx, q, auth: config_1.googleApiKey };
    try {
        const result = yield customSearch.cse.list(options);
        if (result.data.items && result.data.items.length > 0) {
            for (const values of result.data.items) {
                twiml.message(`${values.snippet}   ${values.link}`);
            }
        }
        else {
            twiml.message(`No Results Found `);
        }
        res.set('Content-Type', 'text/xml');
        return res.status(200).send(twiml.toString());
    }
    catch (error) {
        return error;
    }
});
exports.website_search = website_search;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9zdGVwcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQVMrQjtBQUMvQiwyRkFBbUU7QUFDbkUsc0NBQTZDO0FBQzdDLDJDQUFvQztBQUNwQyxtREFBdUQ7QUFDdkQsNkNBQTRDO0FBQzVDLDJEQUFtQztBQUNuQyxxREFBd0M7QUFFeEMsTUFBTSxHQUFHLEdBQUcsZ0JBQU0sQ0FBQztBQUNuQixNQUFNLFlBQVksR0FBRyxtQkFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUUvQyxNQUFNLElBQUksR0FBRyxDQUFDLEdBQVEsRUFBRSxHQUFRLEVBQU8sRUFBRTtJQUN2QyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQztBQXdJQSxvQkFBSTtBQXRJTixNQUFNLEtBQUssR0FBRyxDQUFDLEdBQVEsRUFBRSxHQUFRLEVBQUUsRUFBRTtJQUNuQyxNQUFNLGNBQWMsR0FBRyxJQUFJLDJCQUFpQixFQUFFLENBQUM7SUFDL0MsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLG1CQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN4QyxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcseUJBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLDZCQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsa0JBQUksQ0FBQyxJQUFJLEVBQUUsa0JBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQzNELHFCQUFJLENBQUMsWUFBWSxrQkFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDSCxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxV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