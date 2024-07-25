import { expect, test } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173";

// for each test the user is logged in
test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign in" }).click();

  // setting up assertion
  await expect(
    page.getByRole("heading", { name: "Login to your account" })
  ).toBeVisible();

  // populate the email input and password (make sure the data already exists))
  await page.locator("[name=email]").fill("open@gmail.com");
  await page.locator("[name=password]").fill("qwertyuiop");

  // click the sign in button
  await page.getByRole("button", { name: "Login" }).click();

  // assert that the user is now logged in
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});

test("should allow the user to create a new hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotels`);

  await page.locator("[name=name]").fill("Test Hotel");
  await page.locator("[name=city]").fill("Test City");
  await page.locator("[name=country]").fill("Test country");
  await page.locator("[name=description]").fill("Test Hotel Description");
  await page.locator("[name=pricePerNight]").fill("100");
  await page.selectOption("[name=starRating]", "1");
  await page.getByText("Budget").click();
  await page.getByLabel("Free WiFi").check();
  await page.getByLabel("Parking").check();

  await page.locator("[name=adultCount]").fill("12");
  await page.locator("[name=childCount]").fill("10");

  await page.setInputFiles("[name=imageFiles]", [
    path.join(__dirname, "files/images", "pexels-andrea-davis-11535806.jpg"),
    path.join(__dirname, "files/images", "pexels-andrea-davis-14369630.jpg"),
    path.join(__dirname, "files/images", "pexels-fazyl-nalgiev-1230771.jpg"),
    path.join(__dirname, "files/images", "pexels-jakub-zerdzicki-18509443.jpg"),
    path.join(__dirname, "files/images", "pexels-jakub-zerdzicki-18509443.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Succesfully added hotel")).toBeVisible();
});
