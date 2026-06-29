import { test, expect } from '@playwright/test';

// todo
const urlApi = 'https://apichallenges.eviltester.com';

/*
    let response = await request.post(`${urlApi}/challenger`);
    const headers = await response.headers();
    console.log(`${urlApi}${headers.location}`);

*/
export class ChallengesService {
    constructor (request) {
        // это браузер
        this.request = request;
        // здесь мы описываем техническую реализацию эндпоинта

    }

    // Бизнес-сценарии для эндпоинта
    async get(token){
        return test.step('get /challenges', async () => {
              let response = await this.request.get(`${urlApi}/challenges`, {
        headers: {
            'x-challenger': token
        }
    });
              
        const headers = await response.headers();
        const body = await response.json();    
           
        return {body, headers};
        });
    }
}
