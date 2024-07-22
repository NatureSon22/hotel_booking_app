import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test("should allow the user to sign in", async ({ page }) => {
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
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByText("Logged in successfully")).toBeVisible();
});


test("should allow the user to register", async ({ page }) => {
  const testEmail = `${Math.floor(Math.random() * 100000)}@gmail.com`;

  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign in" }).click();

  // setting up assertion
  await expect(
    page.getByRole("heading", { name: "Login to your account" })
  ).toBeVisible();

  await page.getByRole("link", { name: "Register" }).click();

  await expect( page.getByRole("heading", { name: "Create an Account" }) ).toBeVisible();

  await page.locator("[name=firstName]").fill("John");
  await page.locator("[name=lastName]").fill("Doe");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("qwertyuiop");
  await page.locator("[name=confirmPassword]").fill("qwertyuiop");

  await page.getByRole("button", { name: "Register" }).click();

   // assert that the user is now logged in
   await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
   await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
   await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
   await expect(page.getByText("Account created")).toBeVisible();
});
