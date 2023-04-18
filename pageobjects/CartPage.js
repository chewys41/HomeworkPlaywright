class CartPage {
  constructor(page) {
    this.page = page;
    this.cartIconBtn = page.locator(".showcart");
    this.proceedToCheckout = page.locator("xpath=//button[@id='top-cart-btn-checkout']");
    this.summaryOpen = page.locator(".title[data-role='title']");
  }

  async miniCartBtn() {
    await this.cartIconBtn.click();
  }

  async proceedToCheckoutBtn() {
    await this.proceedToCheckout.click();
  }

  async openProductSummary() {
    await this.summaryOpen.click();
  }
}

module.exports = { CartPage };
