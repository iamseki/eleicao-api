import { HealthService } from '../../application/services';
import { Handler } from './handler';

export const newHealthHandler =
  (svc: HealthService): Handler =>
  async () =>
    await svc.healthCheck();
