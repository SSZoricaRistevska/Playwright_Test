import {expect} from '@playwright/test'
import {test} from '../test-options'
import {SetupNavigationPage} from '../page-objects/SetupNavigationPage'
import { Faker } from "@faker-js/faker/.";


/*
test('Home access', async({page}) =>{
    //by class
await page.locator('#_ctl0_mainmenu_Li1').click();

})
*/


test('Action Tags Setup', async({page, SprodevLogin }) =>{
    const navigatetoSetupandAccess = new SetupNavigationPage(page)
    await navigatetoSetupandAccess.SetupMenuPage()
    await navigatetoSetupandAccess.AccountAndSite()
    await navigatetoSetupandAccess.ActionTagsSetup()
})