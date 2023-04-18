class Common {
  constructor(page) {
    this.page = page;
    this.addToCart = page.locator("button[id='product-addtocart-button']");
  }

  async pageTitle(title) {
    await expect(page).toHaveTitle(title);
  }

  generateRandom(itemCount) {
    return Math.floor(Math.random() * itemCount - 1) + 1;
  }

  totalCount(list) {
    return list.count();
  }

  async addToCartBtn() {
   this.addToCart.click();
  }
}
module.exports = { Common };
