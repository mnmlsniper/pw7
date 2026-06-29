import { test, expect } from '@playwright/test';

// todo
const urlApi = 'https://apichallenges.eviltester.com';

/*
    let response = await request.post(`${urlApi}/challenger`);
    const headers = await response.headers();
    console.log(`${urlApi}${headers.location}`);

*/
export class ChallengerService {
    constructor (request) {
        // это браузер
        this.request = request;
        // здесь мы описываем техническую реализацию эндпоинта

    }

    // Бизнес-сценарии для эндпоинта
    async post(){
        return test.step('post /challenger', async () => {
              let response = await this.request.post(`${urlApi}/challenger`);
              
              const headers = await response.headers();
              console.log(`${urlApi}${headers.location}`);
              return headers;
        });
    }
}
