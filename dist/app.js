"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const bodyparser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const debug_1 = __importDefault(require("debug"));
const config_1 = require("./src/config");
const whatsapp_routes_config_1 = require("./src/routes/whatsapp.routes.config");
const logger_1 = __importDefault(require("./src/lib/logger"));
const morgan_1 = __importDefault(require("./src/middleware/morgan"));
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const app = express_1.default();
const server = http.createServer(app);
const port = 80;
const routes = [];
const debugLog = debug_1.default('app');
const twiml = config_1.twilioInstance;
const log = logger_1.default;
app.use(bodyparser.json());
app.use(cors_1.default());
app.use(morgan_1.default);
app.use(session({
    secret: [
        'veryimportantsecret',
        'notsoimportantsecret',
        'highlyprobablysecret'
    ],
    name: 'secretname',
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: true,
        maxAge: 60000 // Time is in miliseconds
    },
    resave: false
}));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
routes.push(new whatsapp_routes_config_1.WhatsAppRoutes(app));
app.get('/', (req, res) => {
    log.warn(`Server running at http://localhost:${port}`);
    res.status(200).send(`Server running at http://localhost:${port}`);
});
app.post('/callback', (req, res) => {
    res.status(201).send(`===> post method :${port}`);
});
server.listen(port, () => {
    log.info(`Server running at http://localhost:${port}`);
    debugLog(`Server running at http://localhost:${port}`);
    routes.forEach((route) => {
        debugLog(`Routes configured for ${route.getName()}`);
        log.info(`Routes configured for ${route.getName()}`);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUE4QjtBQUM5QiwyQ0FBNkI7QUFDN0Isd0RBQTBDO0FBRzFDLGdEQUF3QjtBQUV4QixrREFBMEI7QUFDMUIseUNBQThDO0FBQzlDLGdGQUFxRTtBQUNyRSw4REFBc0M7QUFDdEMscUVBQXVEO0FBRXZELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUMzQyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFckQsTUFBTSxHQUFHLEdBQXdCLGlCQUFPLEVBQUUsQ0FBQztBQUMzQyxNQUFNLE1BQU0sR0FBZ0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuRCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUM7QUFDaEIsTUFBTSxNQUFNLEdBQThCLEVBQUUsQ0FBQztBQUM3QyxNQUFNLFFBQVEsR0FBb0IsZUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9DLE1BQU0sS0FBSyxHQUFHLHVCQUFjLENBQUM7QUFDN0IsTUFBTSxHQUFHLEdBQUUsZ0JBQU0sQ0FBQTtBQUVqQixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBSSxFQUFFLENBQUMsQ0FBQztBQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFFMUIsR0FBRyxDQUFDLEdBQUcsQ0FDTCxPQUFPLENBQUM7SUFDTixNQUFNLEVBQUU7UUFDTixxQkFBcUI7UUFDckIsc0JBQXNCO1FBQ3RCLHNCQUFzQjtLQUN2QjtJQUNELElBQUksRUFBRSxZQUFZO0lBQ2xCLGlCQUFpQixFQUFFLElBQUk7SUFDdkIsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFLElBQUk7UUFDZCxNQUFNLEVBQUUsSUFBSTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLEtBQUssQ0FBQyx5QkFBeUI7S0FDeEM7SUFDRCxNQUFNLEVBQUUsS0FBSztDQUNkLENBQUMsQ0FDSCxDQUFDO0FBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNwRCxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSx1Q0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFFckMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsRUFBRTtJQUMzRCxHQUFHLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQ3RELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3JFLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsRUFBRTtJQUNwRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNwRCxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUN2QixHQUFHLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQ3RELFFBQVEsQ0FBQyxzQ0FBc0MsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN2RCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBeUIsRUFBRSxFQUFFO1FBQzNDLFFBQVEsQ0FBQyx5QkFBeUIsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyRCxHQUFHLENBQUMsSUFBSSxDQUFDLHlCQUF5QixLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ3RELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==