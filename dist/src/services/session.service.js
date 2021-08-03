"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStep = void 0;
const common_enum_1 = require("../common/common.enum");
const getUserStep = (session) => {
    const steps = session;
    let step = '';
    if (steps.length > 0) {
        // @ts-ignore
        const x = JSON.parse(steps.pop());
        step = x === null || x === void 0 ? void 0 : x.handler;
        return step;
    }
    else
        step = common_enum_1.HOME.STEP;
    return step;
};
exports.getUserStep = getUserStep;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL3Nlc3Npb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1REFBNkM7QUFFN0MsTUFBTSxXQUFXLEdBQUcsQ0FBQyxPQUFnQixFQUFVLEVBQUU7SUFDL0MsTUFBTSxLQUFLLEdBQVksT0FBTyxDQUFDO0lBQy9CLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNkLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDcEIsYUFBYTtRQUNiLE1BQU0sQ0FBQyxHQUFzQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELElBQUksR0FBRyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsT0FBTyxDQUFDO1FBQ2xCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7O1FBQU0sSUFBSSxHQUFHLGtCQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3hCLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyxDQUFDO0FBRU8sa0NBQVcifQ==