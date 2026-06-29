import { test, expect } from '@playwright/test';
//todo
const urlApi = 'https://apichallenges.eviltester.com';

test('API', async ({ request }) => {
    let response = await request.post(`${urlApi}/challenger`);
    const headers = await response.headers();
    console.log(`${urlApi}${headers.location}`);

    response = await request.get(`${urlApi}/challenges`, {
        headers: {
            'x-challenger': headers['x-challenger']
        }
    });
    let body = await response.json();

    expect(body.challenges.length).toEqual(59);

     response = await request.post(`${urlApi}/todos`, {
        headers: {
            'x-challenger': headers['x-challenger']
        },
        //todo перенести в билдер
        data: {
            "title": "Заголовок задачи",
            "doneStatus": false,
            "description": "Это моя пятничная задача" 
        }
    });
    
        body = await response.json();

        expect(body.title).toEqual('Заголовок задачи');
        expect(body.doneStatus).toEqual(false);
        expect(body.description).toEqual('Это моя пятничная задача');

    });
