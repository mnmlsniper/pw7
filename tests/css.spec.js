import { test, expect } from '@playwright/test';

const URL = 'file:///Users/sniper/pw7/burger-order.html';

// Тест 1: ID-селекторы (#id)
test('Создание заказа — ID-селекторы (#id)', async ({ page }) => {
  await page.goto(URL);

  await page.locator('#customerName').fill('Иван');
  await page.locator('#burgerType').selectOption('cheeseburger');
  await page.locator('input[name="portionSize"][value="large"]').check();
  await page.locator('input[name="extraMustard"]').check();
  // switch-input скрыт через CSS — кликаем по видимой label-обёртке
  await page.locator('#burgerForm .switch-label').click();
  await page.locator('#burgerForm button[type="submit"]').click();

  await expect(page.locator('#popup')).toBeVisible();
  await expect(page.locator('#popupMessage')).toContainText('Иван');
});

// Тест 2: Class-селекторы (.class)
test('Создание заказа — class-селекторы (.class)', async ({ page }) => {
  await page.goto(URL);

  await page.locator('.form-group:first-child input').fill('Мария');
  await page.locator('.order-form select').selectOption('vegan');
  await page.locator('.radio-group input[value="small"]').first().check();
  await page.locator('.checkbox-group input').check();
  await page.locator('.switch-label').click();
  await page.locator('.counter-increase').click();
  await page.locator('.radio-group input[value="card_online"]').check();
  await page.locator('.form-actions .btn-primary').click();

  await expect(page.locator('.popup')).toBeVisible();
  await expect(page.locator('.popup-content p').first()).toContainText('Мария');
});

// Тест 3: Attribute-селекторы ([attr=value])
test('Создание заказа — attribute-селекторы ([attr=value])', async ({ page }) => {
  await page.goto(URL);

  await page.locator('input[name="customerName"]').fill('Алексей');
  await page.locator('select[name="burgerType"]').selectOption('spicy');
  await page.locator('input[type="radio"][value="medium"]').check();
  await page.locator('input[type="checkbox"][value="mustard"]').check();
  // ~= — атрибут содержит слово; input скрыт, поэтому кликаем label-обёртку
  await page.locator('label[class~="switch-label"]').click();
  await page.locator('button[type="button"].counter-increase').click();
  await page.locator('input[type="radio"][value="cash"]').check();
  await page.locator('button[type="submit"]').click();

  await expect(page.locator('[id="popup"]')).toBeVisible();
  await expect(page.locator('[id="popupMessage"]')).toContainText('Алексей');
});

// Тест 4: Комбинаторы потомков и дочерних элементов (A B, A > B)
test('Создание заказа — комбинаторы (A B и A > B)', async ({ page }) => {
  await page.goto(URL);

  // пробел = любой потомок (descendant)
  await page.locator('.content .order-form .form-group input[type="text"]').first().fill('Ольга');
  await page.locator('.content .order-form .form-group select').selectOption('classic');

  // > = только прямой ребёнок (child)
  await page.locator('.radio-group > label > input[value="large"]').first().check();
  await page.locator('.checkbox-group > label > input').check();
  await page.locator('.switch-group > .switch-label').click();
  await page.locator('.form-actions > button.btn-primary').click();

  await expect(page.locator('.popup')).toBeVisible();
  await expect(page.locator('.popup-content > p').first()).toContainText('Ольга');
});

// Тест 5: Псевдоклассы (:nth-child, :first-child, :last-child)
test('Создание заказа — псевдоклассы (:nth-child, :first-child)', async ({ page }) => {
  await page.goto(URL);

  // :nth-child(N) — выбираем form-group по позиции в форме
  await page.locator('.order-form .form-group:nth-child(1) input').fill('Дмитрий');
  await page.locator('.order-form .form-group:nth-child(2) select').selectOption('cheeseburger');

  // :nth-child(3) в radio-group — "Большой"
  await page.locator('.order-form .form-group:nth-child(3) .radio-group label:nth-child(3) input').check();

  // :first-child — единственный чекбокс ингредиентов
  await page.locator('.order-form .form-group:nth-child(4) .checkbox-group label:first-child input').check();

  // :first-child — кликаем по видимой switch-label (input скрыт через CSS)
  await page.locator('.order-form .form-group:nth-child(5) .switch-label:first-child').click();

  // :last-child — кнопка "+" (последняя в counter-input)
  await page.locator('.order-form .form-group:nth-child(6) .counter-input button:last-child').click();

  // :first-child — первая кнопка в form-actions = "Заказать бургер"
  await page.locator('.form-actions button:first-child').click();

  await expect(page.locator('#popup')).toBeVisible();
  await expect(page.locator('#popupMessage')).toContainText('Дмитрий');
});

// Тест 6: Role-селекторы (getByRole, getByLabel, getByPlaceholder)
test('Создание заказа — role-селекторы (getByRole / getByLabel / getByPlaceholder)', async ({ page }) => {
  await page.goto(URL);

  // getByPlaceholder — ищет по атрибуту placeholder
  await page.getByPlaceholder('Введите ваше имя').fill('Сергей');

  // getByRole('combobox') — <select> имеет роль combobox
  await page.getByRole('combobox', { name: 'Тип бургера:' }).selectOption('cheeseburger');

  // getByRole('radio') — радиокнопки
  await page.getByRole('radio', { name: 'Большой' }).check();

  // getByRole('checkbox') — чекбоксы по видимому тексту рядом
  await page.getByRole('checkbox', { name: 'Горчица' }).check();

  // getByText — кликаем по тексту внутри switch-label (input скрыт через CSS)
  await page.getByText('Да', { exact: true }).click();

  // getByRole('button') — кнопки по тексту
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('radio', { name: 'Картой онлайн' }).check();
  await page.getByRole('button', { name: 'Заказать бургер' }).click();

  // getByRole('heading') — <h2> в попапе
  await expect(page.getByRole('heading', { name: 'Заказ принят!' })).toBeVisible();
  await expect(page.locator('#popupMessage')).toContainText('Сергей');
});
