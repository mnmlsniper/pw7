import { test } from '../src/helpers/fixtures/index';
import { expect } from '@playwright/test';

//todo
//const urlApi = 'https://apichallenges.eviltester.com';

test.only('API', async ({ api }) => {
    let body, headers;
    // arrange подготовка данных
    // act действия
    headers = await api.challenger.post();
    const token = headers['x-challenger'];

    ({body, headers} = await api.challenges.get(token));

    expect(body.challenges.length).toEqual(59);

    // todo
    const todo = {
            "title": "Заголовок задачи",
            "doneStatus": false,
            "description": "Это моя пятничная задача",
        };

    ({body, headers} = await api.todos.post(token, todo));

    expect(body.title).toEqual('Заголовок задачи');
    expect(body.doneStatus).toEqual(false);
    expect(body.description).toEqual('Это моя пятничная задача');

    });
