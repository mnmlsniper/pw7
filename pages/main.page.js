// todo
const URL = 'https://realworld.qa.guru/';

export class MainPage {
    constructor (page) {
        // это браузер
        this.page = page;
        // здесь мы описываем техническую реализацию страницы
        // здесь все про элементы
        this.signupButton = page.getByRole('link', { name: 'Sign up' });
    }

    // Бизнес-сценарии на страничке
    async gotoRegister()
    {
        await this.signupButton.click();
    }
    async goto ()
    {
        await this.page.goto(URL);
    }

}
