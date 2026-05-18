import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

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
  
  await page.goto(url);

  await page.getByRole('link', { name: 'Sign up' }).click();

  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill(username);

  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);

  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);

  await page.getByRole('button', { name: 'Sign up' }).click();
  //
  await expect(page.getByRole('navigation')).toContainText(username);
});

