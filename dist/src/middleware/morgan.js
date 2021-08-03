"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("../lib/logger"));
// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream = {
    // Use the http severity
    write: (message) => logger_1.default.http(message)
};
// Skip all the Morgan http log if the
// application is not running in development mode.
// This method is not really needed here since
// we already told to the logger that it should print
// only warning and error messages in production.
const skip = () => {
    const env = process.env.NODE_ENV || 'development';
    return env !== 'development';
};
// Build the morgan middleware
const morganMiddleware = morgan_1.default(
// Define message format string (this is the default one).
// The message format is made from tokens, and each token is
// defined inside the Morgan library.
// You can create your custom token to show what do you want from a request.
':method :url :status :res[content-length] - :response-time ms', 
// Options: in this case, I overwrote the stream and the skip logic.
// See the methods above.
{ stream, skip });
exports.default = morganMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9yZ2FuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21pZGRsZXdhcmUvbW9yZ2FuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQStDO0FBQy9DLDJEQUFtQztBQUVuQyx3Q0FBd0M7QUFDeEMsOERBQThEO0FBQzlELE1BQU0sTUFBTSxHQUFrQjtJQUM1Qix3QkFBd0I7SUFDeEIsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Q0FDekMsQ0FBQztBQUVGLHNDQUFzQztBQUN0QyxrREFBa0Q7QUFDbEQsOENBQThDO0FBQzlDLHFEQUFxRDtBQUNyRCxpREFBaUQ7QUFDakQsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO0lBQ2hCLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLGFBQWEsQ0FBQztJQUNsRCxPQUFPLEdBQUcsS0FBSyxhQUFhLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBRUYsOEJBQThCO0FBQzlCLE1BQU0sZ0JBQWdCLEdBQUcsZ0JBQU07QUFDN0IsMERBQTBEO0FBQzFELDREQUE0RDtBQUM1RCxxQ0FBcUM7QUFDckMsNEVBQTRFO0FBQzVFLCtEQUErRDtBQUMvRCxvRUFBb0U7QUFDcEUseUJBQXlCO0FBQ3pCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUNqQixDQUFDO0FBRUYsa0JBQWUsZ0JBQWdCLENBQUMifQ==