import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../pages/main.page';
import { RegisterPage } from '../pages/register.page';
import { YourfeedPage } from '../pages/yourfeedpage.page';

// todo при добавлении нового теста, данные будут использованы те же самые
const URL = 'https://realworld.qa.guru/';
let username = faker.person.fullName();
let email = faker.internet.email({ lastName: 'BIN', provider: 'robot.dev' });
let password = faker.internet.password() // '89G1wJuBLbGziIs'

function getUrl (username) {
  //  console.log(`Пользователь ${username} собирается зарегистрироваться на сайте ${URL}`);
    return URL;
}

const url = getUrl(username);


test('Пользователь может зарегистрироваться используя email и пароль', async ({ page }) => {
   // вопрос куда выносить)
    await page.goto(url);
    //Инициализируем странички
    const main = new MainPage(page);
    const register = new RegisterPage(page);
    const yourfeed = new YourfeedPage(page);

    await main.gotoRegister();
    await register.signup(username, email, password);
   //временный вариант
   // await expect(yourfeed.profileName).toContainText(username);
    await expect(yourfeed.getProfileName()).toContainText(username);

   //await yourfeedPage.checkVisible();

  //await expect(page.getByRole('navigation')).toContainText(username);
});

