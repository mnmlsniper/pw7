import { test, expect } from '@playwright/test';

// todo
const urlApi = 'https://apichallenges.eviltester.com';

/*
    let response = await request.post(`${urlApi}/challenger`);
    const headers = await response.headers();
    console.log(`${urlApi}${headers.location}`);

*/
export class TodosService {
    constructor (request) {
        // это браузер
        this.request = request;
        // здесь мы описываем техническую реализацию эндпоинта

    }

    // Бизнес-сценарии для эндпоинта
    async post(token, todo){
        return test.step('post /todos', async () => {
              let response = await this.request.post(`${urlApi}/todos`, {
        headers: {
            'x-challenger': token
        },
        data: todo   
    });
              
        const headers = await response.headers();
        const body = await response.json();    
           
        return {body, headers};
        });
    }
}
