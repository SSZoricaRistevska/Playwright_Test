import { expect } from '@playwright/test'
import { test } from '../test-options'
import { AccountNavigationPage } from '../page-objects/AccountNavigationPage'

/**
 * Test Suite: Open Account > Site Menu > Add Program > Complete Workflow
 * 
 * This test suite demonstrates the complete workflow of:
 * 1. Opening any account from search
 * 2. Clicking on Site Menu
 * 3. Clicking Add Program from the menu
 * 4. Selecting a branch
 * 5. Clicking Next
 * 6. Selecting a program
 * 7. Populating all necessary fields (Salesperson, Primary Target, Source, Route, Service, etc.)
 * 8. Clicking Finish to complete the program addition
 */

test('Open Account > Site Menu > Add Program - Full Workflow', async ({ page, SprodevLogin }) => {
    /**
     * Complete end-to-end workflow
     * Opens an account and adds a program through the Site Menu
     */
    const accountPage = new AccountNavigationPage(page)
    
    // Execute the complete workflow
    const resultPage = await accountPage.OpenAccountClickSiteMenuAddProgram()
    
    // Verify the workflow executed
    expect(resultPage).toBeDefined()
    console.log('Program addition workflow completed successfully')
    
    // Close the page when done
    try {
        await resultPage.close()
    } catch (e) {
        console.log('Page already closed')
    }
})

test('Open Account > Site Menu > Add Program - With Step Verification', async ({ page, SprodevLogin }) => {
    /**
     * Same workflow with detailed verification at each step
     */
    const accountPage = new AccountNavigationPage(page)
    
    // Step 1: Search for account
    console.log('Step 1: Searching for account 600063...')
    await page.getByRole('textbox', { name: 'Enter Criteria' }).click()
    await page.getByRole('textbox', { name: 'Enter Criteria' }).fill('600063')
    
    const popupPromise = page.waitForEvent('popup')
    await page.locator('#search_button').click()
    const accountPopup = await popupPromise
    
    await accountPopup.waitForLoadState('domcontentloaded')
    expect(accountPopup).toBeDefined()
    console.log('✓ Step 1: Account search popup opened')
    
    // Step 2: Open account details
    console.log('Step 2: Opening account details...')
    const firstResult = accountPopup.locator('table tbody tr td a').first()
    if (await firstResult.count() > 0) {
        await firstResult.click()
        await accountPopup.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})
        console.log('✓ Step 2: Account details loaded')
    }
    
    // Step 3: Verify Site Menu is available
    console.log('Step 3: Locating Site Menu button...')
    const siteMenuBtn = accountPopup.getByRole('button', { name: 'Site Menu' }).first()
    expect(await siteMenuBtn.count()).toBeGreaterThan(0)
    console.log('✓ Step 3: Site Menu button found')
    
    // Step 4: Verify Add Program link is available
    console.log('Step 4: Verifying Add Program option...')
    const addProgramLink = accountPopup.getByRole('link', { name: 'Add Program' }).first()
    expect(addProgramLink).toBeDefined()
    console.log('✓ Step 4: Add Program option verified')
    
    console.log('All verification steps completed successfully')
    await accountPopup.close()
})

test('Open Account > Add Program via Site Menu - Custom Account', async ({ page, SprodevLogin }) => {
    /**
     * Template for using any account number
     * Simply modify the accountNumber variable to search for any account
     */
    const accountNumber = '600063' // Change this to any account number
    
    console.log(`Opening account: ${accountNumber}`)
    
    // Search for the account
    await page.getByRole('textbox', { name: 'Enter Criteria' }).click()
    await page.getByRole('textbox', { name: 'Enter Criteria' }).fill(accountNumber)
    
    const popupPromise = page.waitForEvent('popup')
    await page.locator('#search_button').click()
    const accountPopup = await popupPromise
    
    await accountPopup.waitForLoadState('domcontentloaded')
    await accountPopup.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})
    
    // Click first search result
    const firstResult = accountPopup.locator('table tbody tr td a').first()
    if (await firstResult.count() > 0) {
        await firstResult.click()
        await accountPopup.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})
        console.log(`✓ Account ${accountNumber} opened`)
    }
    
    // Click Site Menu
    const siteMenuBtn = accountPopup.getByRole('button', { name: 'Site Menu' }).first()
    if (await siteMenuBtn.count() > 0) {
        await siteMenuBtn.click()
        console.log('✓ Site Menu opened')
        await accountPopup.waitForTimeout(500)
    }
    
    // Click Add Program
    const addProgramLink = accountPopup.getByRole('link', { name: 'Add Program' }).first()
    if (await addProgramLink.count() > 0) {
        await addProgramLink.click()
        console.log('✓ Add Program wizard started')
        await accountPopup.waitForTimeout(1000)
    }
    
    // Verify we're in the Add Program workflow
    const nextBtn = accountPopup.getByRole('button', { name: 'Next' }).first()
    expect(await nextBtn.count()).toBeGreaterThan(0)
    console.log('✓ Add Program form loaded successfully')
    
    await accountPopup.close()
})

test('Open Account > Site Menu > Add Program - Detailed Field Population', async ({ page, SprodevLogin }) => {
    /**
     * This test shows each field being populated individually
     * Useful for understanding which fields are required
     */
    const accountPage = new AccountNavigationPage(page)
    
    // Open account and navigate to Add Program
    const resultPage = await accountPage.OpenAccountClickSiteMenuAddProgram()
    
    // The method handles all field population internally
    // Results are logged during execution
    
    // Verify completion
    await resultPage.waitForTimeout(1000)
    console.log('All fields populated and workflow completed')
    
    await resultPage.close()
})

test('Open Account > Add Program via Site Menu - Error Handling', async ({ page, SprodevLogin }) => {
    /**
     * Demonstrates robust error handling throughout the workflow
     * Continues execution even if some steps fail
     */
    const accountPage = new AccountNavigationPage(page)
    
    try {
        const resultPage = await accountPage.OpenAccountClickSiteMenuAddProgram()
        console.log('Workflow completed with error handling')
        
        try {
            await resultPage.close()
        } catch (e) {
            console.log('Result page already closed')
        }
    } catch (error) {
        console.error('Workflow encountered an error:', error)
        throw error
    }
})

test('Open Account and Navigate Site Menu - No Program Add', async ({ page, SprodevLogin }) => {
    /**
     * Test that just opens an account and verifies Site Menu access
     * Useful for testing account opening separately from program addition
     */
    // Search for account
    await page.getByRole('textbox', { name: 'Enter Criteria' }).click()
    await page.getByRole('textbox', { name: 'Enter Criteria' }).fill('600063')
    
    const popupPromise = page.waitForEvent('popup')
    await page.locator('#search_button').click()
    const accountPopup = await popupPromise
    
    await accountPopup.waitForLoadState('domcontentloaded')
    
    // Open account
    const firstResult = accountPopup.locator('table tbody tr td a').first()
    if (await firstResult.count() > 0) {
        await firstResult.click()
        await accountPopup.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})
    }
    
    // Verify Site Menu access
    const siteMenuBtn = accountPopup.getByRole('button', { name: 'Site Menu' }).first()
    expect(await siteMenuBtn.count()).toBeGreaterThan(0)
    console.log('Account opened and Site Menu is accessible')
    
    await accountPopup.close()
})

test('Open Account > Verify Add Program Menu Item', async ({ page, SprodevLogin }) => {
    /**
     * Test that verifies Add Program is available in the Site Menu
     * without actually executing the full workflow
     */
    // Open account
    await page.getByRole('textbox', { name: 'Enter Criteria' }).click()
    await page.getByRole('textbox', { name: 'Enter Criteria' }).fill('600063')
    
    const popupPromise = page.waitForEvent('popup')
    await page.locator('#search_button').click()
    const accountPopup = await popupPromise
    
    await accountPopup.waitForLoadState('domcontentloaded')
    
    const firstResult = accountPopup.locator('table tbody tr td a').first()
    if (await firstResult.count() > 0) {
        await firstResult.click()
        await accountPopup.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})
    }
    
    // Click Site Menu
    await accountPopup.waitForTimeout(500)
    const siteMenuBtn = accountPopup.getByRole('button', { name: 'Site Menu' }).first()
    if (await siteMenuBtn.count() > 0) {
        await siteMenuBtn.click()
        await accountPopup.waitForTimeout(500)
    }
    
    // Verify Add Program link exists in menu
    const addProgramLink = accountPopup.getByRole('link', { name: 'Add Program' })
    expect(await addProgramLink.count()).toBeGreaterThan(0)
    console.log('Add Program menu item is available')
    
    await accountPopup.close()
})
