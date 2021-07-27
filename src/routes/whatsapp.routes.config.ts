import { CommonRoutesConfig } from '../../common/common.routes.config';
import { ussd} from '../services/whatsapp.service';
import express from 'express';

export class WhatsAppRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'WhatsAppRoutes');
  }
  configureRoutes(): express.Application {
    this.app.post('/incoming', ussd);
    return this.app;
  }
}
