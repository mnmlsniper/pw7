export class YourfeedPage {
    constructor (page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.profileName = page.getByRole('navigation');
    }

    // Бизнес-сценарии на страничке
   
     async getProfileName()
    {
        return this.profileName;
    }
}


//  await expect(page.getByRole('navigation')).toContainText(username);

// сравни ожидаемый результат // автоожидания элемента от плейрайта