import { test, expect } from "@playwright/test"

test.describe("contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("portfolio:language", "en")
    })
    await page.goto("/contact")
  })

  test("renders the contact form", async ({ page }) => {
    await expect(page.getByRole("textbox", { name: /name/i })).toBeVisible()
    await expect(page.getByRole("textbox", { name: /email/i })).toBeVisible()
    await expect(page.getByRole("textbox", { name: /message/i })).toBeVisible()
    await expect(page.getByRole("button", { name: /send message/i })).toBeVisible()
  })

  test("shows social links", async ({ page }) => {
    await expect(page.getByRole("link", { name: /github/i })).toBeVisible()
    await expect(page.getByRole("link", { name: /linkedin/i })).toBeVisible()
  })

  test("submits form and shows success state", async ({ page }) => {
    // Mock the API response to avoid real email sending
    await page.route("/api/contact", (route) =>
      route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
    )

    await page.getByRole("textbox", { name: /name/i }).fill("Test User")
    await page.getByRole("textbox", { name: /email/i }).fill("test@example.com")
    await page.getByRole("textbox", { name: /message/i }).fill("This is a test message from Playwright.")

    await page.getByRole("button", { name: /send message/i }).click()

    await expect(page.getByText(/message sent/i)).toBeVisible({ timeout: 5_000 })
  })

  test("shows error state on API failure", async ({ page }) => {
    await page.route("/api/contact", (route) =>
      route.fulfill({ status: 500, body: "Internal Server Error" })
    )

    await page.getByRole("textbox", { name: /name/i }).fill("Test User")
    await page.getByRole("textbox", { name: /email/i }).fill("test@example.com")
    await page.getByRole("textbox", { name: /message/i }).fill("Testing error state.")

    await page.getByRole("button", { name: /send message/i }).click()

    await expect(page.getByText(/something went wrong/i)).toBeVisible({ timeout: 5_000 })
  })

  test("shows rate limit message on 429", async ({ page }) => {
    await page.route("/api/contact", (route) =>
      route.fulfill({ status: 429, body: "Too Many Requests" })
    )

    await page.getByRole("textbox", { name: /name/i }).fill("Test User")
    await page.getByRole("textbox", { name: /email/i }).fill("test@example.com")
    await page.getByRole("textbox", { name: /message/i }).fill("Rate limit test.")

    await page.getByRole("button", { name: /send message/i }).click()

    await expect(page.getByText(/too many attempts/i)).toBeVisible({ timeout: 5_000 })
  })
})
