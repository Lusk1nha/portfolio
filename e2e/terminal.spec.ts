import { test, expect } from "@playwright/test"

test.describe("interactive terminal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    // Dismiss the boot sequence if it appears
    await page.waitForTimeout(1500)
    // Click anywhere on the terminal to focus it
    const terminal = page.locator('[placeholder="type a command..."]')
    await terminal.waitFor({ state: "visible", timeout: 10_000 })
  })

  test("shows initial welcome message", async ({ page }) => {
    await expect(page.getByText("lucas-portfolio v1.0.0")).toBeVisible()
    await expect(page.getByText(/type 'help'/i)).toBeVisible()
  })

  test("help command lists available commands", async ({ page }) => {
    const input = page.locator('[placeholder="type a command..."]')
    const output = page.locator('[data-testid="terminal-output"]')
    await input.fill("help")
    await input.press("Enter")

    await expect(output.getByText(/whoami/i)).toBeVisible()
    await expect(output.getByText(/projects/i)).toBeVisible()
    await expect(output.getByText(/contact/i)).toBeVisible()
  })

  test("whoami command outputs developer info", async ({ page }) => {
    const input = page.locator('[placeholder="type a command..."]')
    const output = page.locator('[data-testid="terminal-output"]')
    await input.fill("whoami")
    await input.press("Enter")

    await expect(output.getByText(/Lucas Pedro/i)).toBeVisible()
    await expect(output.getByText(/Full Stack/i)).toBeVisible()
  })

  test("clear command empties the terminal", async ({ page }) => {
    const input = page.locator('[placeholder="type a command..."]')
    const output = page.locator('[data-testid="terminal-output"]')
    // First add some output
    await input.fill("help")
    await input.press("Enter")
    await expect(output.getByText(/whoami/i)).toBeVisible()

    // Now clear
    await input.fill("clear")
    await input.press("Enter")

    // Welcome lines should be gone
    await expect(output.getByText(/type 'help'/i)).not.toBeVisible()
  })

  test("unknown command shows error message", async ({ page }) => {
    const input = page.locator('[placeholder="type a command..."]')
    await input.fill("notacommand")
    await input.press("Enter")

    await expect(page.getByText(/not found|unknown|command not found/i)).toBeVisible()
  })

  test("history navigation with arrow keys", async ({ page }) => {
    const input = page.locator('[placeholder="type a command..."]')
    await input.fill("whoami")
    await input.press("Enter")

    await input.press("ArrowUp")
    await expect(input).toHaveValue("whoami")

    await input.press("ArrowDown")
    await expect(input).toHaveValue("")
  })
})
