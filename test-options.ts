import { test as base, expect } from '@playwright/test';


export type TestOptions = {
    globalsQaURL: string
    SprodevLogin: void
    StageLogin: void
    SproglobalLogin: void
    SproliveLoginPest: void
    SproliveLoginFr: void
}


export const test = base.extend<TestOptions>({
    globalsQaURL: ['', { option: true }],

    SprodevLogin: async ({ page }, use) => {

        await page.goto('https://dev.servsuitecloud.net/')

        // Grant geolocation permission automatically
        await page.context().grantPermissions(['geolocation']);

        const usingTableEmailInput = page.locator('[placeholder="Enter Email/Alias"]')
        const usingTableInputPass = page.locator('[placeholder="Enter password"]')

        await usingTableEmailInput.clear()
        await usingTableInputPass.clear()
        await usingTableEmailInput.fill('falcontest@sprodev.net')
        await usingTableInputPass.fill('Testing1')
        await page.getByRole('button', { name: "SUBMIT" }).click()
        await use()

    },

    StageLogin: async ({ page }, use) => {

        await page.goto('https://stage.servsuitecloud.net/')

        // Grant geolocation permission automatically
        await page.context().grantPermissions(['geolocation']);

        const usingTableEmailInput = page.locator('[placeholder="Enter Email/Alias"]')
        const usingTableInputPass = page.locator('[placeholder="Enter password"]')

        await usingTableEmailInput.clear()
        await usingTableInputPass.clear()
        await usingTableEmailInput.fill('falcontest@sprostage.net')
        await usingTableInputPass.fill('Testing1')
        await page.getByRole('button', { name: "SUBMIT" }).click()
        await use()

    },

    SproglobalLogin: async ({ page }, use) => {

        await page.goto('https://sproglobal.theservicepro.net/')

        // Grant geolocation permission automatically
        await page.context().grantPermissions(['geolocation']);

        const usingTableEmailInput = page.locator('[placeholder="Enter Email/Alias"]')
        const usingTableInputPass = page.locator('[placeholder="Enter password"]')

        await usingTableEmailInput.clear()
        await usingTableInputPass.clear()
        await usingTableEmailInput.fill('falcon@sproglobal.com')
        await usingTableInputPass.fill('Testing1')
        await page.getByRole('button', { name: "SUBMIT" }).click()
        await use()

    },

    SproliveLoginPest: async ({ page }, use) => {

        await page.goto('https://sprolive.theservicepro.net/')

        // Grant geolocation permission automatically
        await page.context().grantPermissions(['geolocation']);

        const usingTableEmailInput = page.locator('[placeholder="Enter Email/Alias"]')
        const usingTableInputPass = page.locator('[placeholder="Enter password"]')

        await usingTableEmailInput.clear()
        await usingTableInputPass.clear()
        await usingTableEmailInput.fill('falconaws2@sprodev.net')
        await usingTableInputPass.fill('Testing1')
        await page.getByRole('button', { name: "SUBMIT" }).click()
        await use()

    },

    SproliveLoginFr: async ({ page }, use) => {
        await page.goto('https://sprolive.theservicepro.net/')

        // Grant geolocation permission automatically
        await page.context().grantPermissions(['geolocation']);

        const usingTableEmailInput = page.locator('[placeholder="Enter Email/Alias"]')
        const usingTableInputPass = page.locator('[placeholder="Enter password"]')

        await usingTableEmailInput.clear()
        await usingTableInputPass.clear()
        await usingTableEmailInput.fill('falcon@frsales.com')
        await usingTableInputPass.fill('!Testing1')
        await page.getByRole('button', { name: "SUBMIT" }).click()
        await use()

    }
})

export { expect };
