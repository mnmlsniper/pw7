import { test, expect } from '@playwright/test';

const URL = 'https://realworld.qa.guru/';


test.only('Пользователь может просмотреть 3 статьи на Главной', async ({ page }) => {
  
  await page.goto(URL);

  const articles = page.getByRole('link').filter({has : page.locator('h1')});
  await expect(articles.first()).toBeVisible();

  const titles = await articles.locator('h1').allTextContents();
  //console.log(titles);
  expect(titles.length).toBe(3);
  //  console.log(articles);

//  await expect(page.getByRole('navigation')).toContainText(username);
});

/*
- явный таймаут или поытка дождаться загрузки page.waitForLoadState / лоадер пропал
- дождаться видимости toBeVisible();
- какое-нибудь действие на страничке
- замокать ответ бекенда
- пойти поныть к фронтеднерам)
- мужественно разбираться
*/