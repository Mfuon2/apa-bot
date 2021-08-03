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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ussd = void 0;
const steps_service_1 = require("./steps.service");
const redis_service_1 = require("./redis.service");
const session_service_1 = require("./session.service");
const common_enum_1 = require("../common/common.enum");
const logger_service_1 = require("./logger.service");
const ussd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield redis_service_1.getUserSession(req.body.From).then((data) => {
        const step = session_service_1.getUserStep(data.steps);
        logger_service_1.info(' Current Step : ' + step);
        if (step === undefined ||
            step.toLocaleLowerCase().match('hi') ||
            step.toLocaleLowerCase().match('hello') ||
            step.toLocaleLowerCase().match('hey')) {
            return steps_service_1.home(req, res);
        }
        switch (step) {
            case common_enum_1.HOME.STEP:
                steps_service_1.home(req, res);
                break;
            case common_enum_1.INVESTMENTS.STEP:
                steps_service_1.investments(req, res);
                break;
            default:
                steps_service_1.home(req, res);
                break;
        }
    });
});
exports.ussd = ussd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hhdHNhcHAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy93aGF0c2FwcC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFvRDtBQUNwRCxtREFBaUQ7QUFDakQsdURBQWdEO0FBQ2hELHVEQUEwRDtBQUMxRCxxREFBd0M7QUFFeEMsTUFBTSxJQUFJLEdBQUcsQ0FBTyxHQUFRLEVBQUUsR0FBUSxFQUFFLEVBQUU7SUFDeEMsTUFBTSw4QkFBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDaEQsTUFBTSxJQUFJLEdBQUcsNkJBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMscUJBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUNFLElBQUksS0FBSyxTQUFTO1lBQ2xCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDcEMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUN2QyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQ3JDO1lBQ0EsT0FBTyxvQkFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN2QjtRQUNELFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxrQkFBSSxDQUFDLElBQUk7Z0JBQ1osb0JBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2YsTUFBTTtZQUNSLEtBQUsseUJBQVcsQ0FBQyxJQUFJO2dCQUNuQiwyQkFBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDdEIsTUFBTTtZQUNSO2dCQUNFLG9CQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLE1BQU07U0FDVDtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFBLENBQUM7QUFFTyxvQkFBSSJ9