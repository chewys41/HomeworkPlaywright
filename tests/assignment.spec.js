import { test, expect } from "@playwright/test";
import { POManager } from "../pageobjects/POManager";

test.only("Search and add product to cart", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const common = poManager.getCommonPage();
  const cartPage = poManager.getCartPage();
  const listOfItems = page.locator(".product-item-details");
  const sizeOptions = page.locator(".swatch-option.text");
  const colorOptions = page.locator(".swatch-option.color")
  const homeTitle = "Home Page";
  const item = "Jacket";
  const totalInCart = "1";
  const searchedTitle = `Search results for: '${item}'`;
  //Navigate to URL and verify title
  await homePage.landOnHomePage();
  await expect(page).toHaveTitle(homeTitle);

  //Search for Item and verify results
  await homePage.searchForItem(item);
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveTitle(searchedTitle);
  await expect(page.locator(".base")).toContainText(searchedTitle);
  await expect(page.locator(".item.search")).toContainText(searchedTitle);

  //Extracting total number of items and finding a random item
  const itemCount = await common.totalCount(listOfItems);
  const randomItem = await common.generateRandom(itemCount);
  const productName = await listOfItems.locator(".product-item-link").nth(randomItem).textContent();

  //select Item and navigate to product details
  await listOfItems.locator(".product-item-link").nth(randomItem).click();
  await page.waitForLoadState("networkidle");
  const itemPrice = await page.locator(".product-info-price .price").textContent()
  await expect(page.locator(".base")).toContainText(productName);
  await expect(page).toHaveTitle(productName);

  //Select random size item
  const sizeCount = await common.totalCount(sizeOptions);
  const randomSize = await common.generateRandom(sizeCount);
  await sizeOptions.nth(randomSize).click();

  //Verify size selected
  await expect(sizeOptions.nth(randomSize)).toHaveAttribute("aria-checked", "true");
  const chosenSize = await sizeOptions.nth(randomSize).textContent();
  await expect(page.locator(".size .swatch-attribute-selected-option")).toContainText(chosenSize);

  //select random color
  const colorCount = await common.totalCount(colorOptions);
  const randomColor = await common.generateRandom(colorCount);
  await colorOptions.nth(randomColor).click();

  //Verify color selected
  await expect(colorOptions.nth(randomColor)).toHaveAttribute("aria-checked", "true");
  const chosenColor = await colorOptions.nth(randomColor).getAttribute("option-label");
  await expect(page.locator(".color .swatch-attribute-selected-option")).toContainText(chosenColor);

  //Add to cart
  await common.addToCartBtn();
  await page.waitForLoadState("networkidle");
  await expect(page.locator(".counter-number")).toContainText(totalInCart);

  //Navigate to cart 
  await page.locator(".action.showcart").hover();
  await cartPage.miniCartBtn();
  //await page.locator("xpath=//button[@id='top-cart-btn-checkout']").click();
  await cartPage.proceedToCheckoutBtn();

  // Verify checkout page has item
  await cartPage.openProductSummary()
  await expect(page.locator(".product-item-name")).toContainText(productName);
  await expect(page.locator(".value")).toContainText(totalInCart);
  await expect(page.locator(".cart-price")).toContainText(itemPrice);
});
