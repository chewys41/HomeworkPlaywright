class HomePage {
    constructor(page) {
      this.page = page;
      this.searchBar = page.locator("#search");
      this.searchBtn = page.locator("button[title='Search']");
    }
  
    async landOnHomePage() {
      await this.page.goto("https://magento.softwaretestingboard.com/");
    }
  
    async searchForItem(item) {
      await this.searchBar.type(item);
      await this.searchBtn.click();
    }
  }

  module.exports = { HomePage };
