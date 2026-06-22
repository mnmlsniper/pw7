// чего-то импортируем
import { test, expect } from '@playwright/test';

test.skip('test', async ({ page }) => {
  // Arrange 
  // WHEN Когда пользователь открывает сайт
  // Предусловие сайт
  // Открыть сайт
  await page.goto('https://todomvc.com/examples/vue/dist/#/');

  // Act
  // GIVEN И вводит описание задачи
  // Шаги теста
  // Выполнить шаги теста
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Выгулять собак');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  // Assert
  // Then Тогда отображается введенная задача
  // Проверка ожидаемого и фактического результата
  // Проверить ожидаемый результат и фактический
  await expect(page.getByRole('main')).toContainText('Выгулять собак');


});