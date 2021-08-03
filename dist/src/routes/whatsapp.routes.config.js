"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppRoutes = void 0;
const common_routes_config_1 = require("../../common/common.routes.config");
const whatsapp_service_1 = require("../services/whatsapp.service");
class WhatsAppRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'WhatsAppRoutes');
    }
    configureRoutes() {
        this.app.post('/incoming', whatsapp_service_1.ussd);
        return this.app;
    }
}
exports.WhatsAppRoutes = WhatsAppRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hhdHNhcHAucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvd2hhdHNhcHAucm91dGVzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0RUFBdUU7QUFDdkUsbUVBQW9EO0FBR3BELE1BQWEsY0FBZSxTQUFRLHlDQUFrQjtJQUNwRCxZQUFZLEdBQXdCO1FBQ2xDLEtBQUssQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0QsZUFBZTtRQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSx1QkFBSSxDQUFDLENBQUM7UUFDakMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7Q0FDRjtBQVJELHdDQVFDIn0=