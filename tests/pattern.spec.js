import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { UserBuilder } from '../src/helpers';

import { App } from '../pages/app';

test('Пользователь может зарегистрироваться используя email и пароль', async ({ page }) => {
    allure.epic('Авторизация');
    allure.story('Положительный сценарий');
    allure.label('smoke');
    allure.severity('Blocker');
    allure.owner('Мну')

    const user = new UserBuilder().withEmail().withPassword().withUsername().build();

    const app = new App(page);
    await app.main.goto();
    await app.main.gotoRegister();
    await app.register.signup(user);

    await expect(app.yourfeed.getProfileName()).toContainText(user.username);

});


test('Другой негативный тест', async ({ page }) => {
    const user = new UserBuilder().withPassword(3).withUsername('Хвостатый Алексей Евгеньевич').build();

    const app = new App(page);
    await app.main.goto();
    await app.main.gotoRegister();
    await app.register.signup(username, email, password);

    await expect(app.yourfeed.getProfileName()).toContainText(user.username);

});