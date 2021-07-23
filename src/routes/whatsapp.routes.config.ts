import express, { Router } from 'express';
import { CommonRoutesConfig } from '../../common/common.routes.config';
import { ussd, status } from '../services/whatsapp.service';

export class WhatsAppRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'WhatsAppRoutes');
  }
  configureRoutes() {
    this.app.post('/incoming', ussd);
    this.app.post('/status', status);
    return this.app;
  }
}
