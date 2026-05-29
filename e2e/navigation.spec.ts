import { test, expect } from "@playwright/test"

test.describe("navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("portfolio:language", "en")
    })
  })

  test("loads the home page", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveURL("/")
    // Header logo is always present
    await expect(page.getByRole("link", { name: /lucas.*portfolio/i })).toBeVisible()
  })

  test("navigates to projects page", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("link", { name: /projects/i }).first().click()
    await expect(page).toHaveURL("/projects")
  })

  test("navigates to experience page", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("link", { name: /experience/i }).first().click()
    await expect(page).toHaveURL("/experience")
  })

  test("navigates to stack page", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("link", { name: /stack/i }).first().click()
    await expect(page).toHaveURL("/stack")
  })

  test("navigates to contact page", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("link", { name: /contact/i }).first().click()
    await expect(page).toHaveURL("/contact")
  })

  test("shows 404 for unknown routes", async ({ page }) => {
    await page.goto("/does-not-exist")
    await expect(page).toHaveURL("/does-not-exist")
    // The not-found page should render without crashing
    await expect(page.locator("body")).toBeVisible()
  })

  test("can navigate back to home from any page", async ({ page }) => {
    await page.goto("/projects")
    await page.getByRole("link", { name: /lucas.*portfolio/i }).click()
    await expect(page).toHaveURL("/")
  })
})
