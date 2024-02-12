import { test, expect } from '@playwright/test';

const CLIENT_URL = 'http://localhost:5173/';

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(CLIENT_URL);
  await page.getByRole('link' , { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
  await page.locator("[name=email]").fill('nihal@gmail.com')
  await page.locator("[name=password]").fill('nihalk')
  await page.getByRole('button' , { name: 'Login' }).click();
  await expect(page.getByText('Sign in Successful!')).toBeVisible();
  await expect(page.getByRole('link', {name : 'My Bookings'})).toBeVisible();
  await expect(page.getByRole('link' , {name : 'My Hotels'})).toBeVisible();
  await expect(page.getByRole('button' , {name : 'Sign Out'})).toBeVisible();
});

test('should allow the user to sign up', async ({ page }) => {
  const testEmail = `testregister${Math.floor(Math.random() * 10000) + 1000}@gmail.com`
  await page.goto(CLIENT_URL);
  await page.getByRole('link' , { name: 'Sign in' }).click();
  await page.getByRole('link' , {name :'Create an account here'}).click();
  await expect(page.getByRole('heading', { name: 'Create an Account' })).toBeVisible();
  await page.locator('[name=firstName]').fill('test_firstName');
  await page.locator('[name=lastName]').fill('test_firstName');
  await page.locator('[name=email]').fill(testEmail);
  await page.locator('[name=password]').fill('test_password');
  await page.locator('[name=confirmPassword]').fill('test_password');
  await page.getByRole('button' , { name: 'Create Account' }).click();
  await expect(page.getByText('Registration Success!')).toBeVisible();
  await expect(page.getByRole('link', {name : 'My Bookings'})).toBeVisible();
  await expect(page.getByRole('link' , {name : 'My Hotels'})).toBeVisible();
  await expect(page.getByRole('button' , {name : 'Sign Out'})).toBeVisible();
})

