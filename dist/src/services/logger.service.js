"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.debug = exports.warn = exports.info = void 0;
const logger_1 = __importDefault(require("../lib/logger"));
const info = (msg) => {
    logger_1.default.info(`INFO : ${msg}`);
};
exports.info = info;
const warn = (msg) => {
    logger_1.default.warn(`WARN : ${msg}`);
};
exports.warn = warn;
const debug = (msg) => {
    logger_1.default.debug(`DEBUG : ${msg}`);
};
exports.debug = debug;
const error = (msg) => {
    logger_1.default.error(`ERROR : ${msg}`);
};
exports.error = error;
const http = (msg) => {
    logger_1.default.http(`ERROR : ${msg}`);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvbG9nZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMkRBQW1DO0FBRW5DLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBUSxFQUFFLEVBQUU7SUFDeEIsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQWdCTyxvQkFBSTtBQWRiLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBUSxFQUFFLEVBQUU7SUFDeEIsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQVlhLG9CQUFJO0FBWG5CLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBUSxFQUFFLEVBQUU7SUFDekIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ2pDLENBQUMsQ0FBQztBQVNtQixzQkFBSztBQVIxQixNQUFNLEtBQUssR0FBRyxDQUFDLEdBQVEsRUFBRSxFQUFFO0lBQ3pCLGdCQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNqQyxDQUFDLENBQUM7QUFNMEIsc0JBQUs7QUFKakMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRTtJQUN4QixnQkFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDaEMsQ0FBQyxDQUFDIn0=