import { test } from '../test-options'
import {AccountNavigationPage} from '../page-objects/AccountNavigationPage'


test('Add New Account new - only', async({page, SproliveLoginFr}) =>{
    const navigatetoSetup = new AccountNavigationPage(page)
    await navigatetoSetup.AddNewAccountNewAccountOnly()
    
})

test('Add New Account New + Program', async({page, SproliveLoginFr}) =>{
    const navigatetoSetup = new AccountNavigationPage(page)
    await navigatetoSetup.AddNewAccountNewAccountAndProgram();
 
})
test('Add New Account OldUI - only', async({page, SproliveLoginFr}) =>{
    const navigatetoSetup = new AccountNavigationPage(page)
    await navigatetoSetup.AddNewAccountOldAccountOnly()
    
})

test('Add New Account OldUI + Program', async({page, SproliveLoginFr}) =>{
    const navigatetoSetup = new AccountNavigationPage(page)
    await navigatetoSetup.AddNewAccountOldUIAccountAndProgram();
 
})
test('Open Account ', async({page, SproliveLoginFr}) =>{
    const navigatetoSetup = new AccountNavigationPage(page)
    await navigatetoSetup.OpenAccount();
 
})
test('Open Account and add program ', async({page, SproliveLoginFr}) =>{
    const navigatetoSetup = new AccountNavigationPage(page)
    await navigatetoSetup.OpenAccountAddProgram();
 
})