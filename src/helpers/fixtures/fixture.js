import { test as base} from '@playwright/test';
import { Api } from '../../services/api';
import { App } from '../../pages/app'

export const test = base.extend({
  app: async ({ page }, use) => {
    const app = new App(page);
    await app.main.open();
    await use(app);
  },
  api: async ({ request }, use) => {
    const api = new Api(request);
    await use(api);
  },
});