import {expect} from '@playwright/test'
import {test} from '../test-options'
import {OfficeNavigationPage} from '../page-objects/OfficeNavigationPage'
import { Faker } from "@faker-js/faker/.";


test('Enter Completed Work Orders', async({page, SprodevLogin}) =>{
    const navigatetoOffice = new OfficeNavigationPage(page);
    await navigatetoOffice.EnterCompletedWorkOrders();
}, { timeout: 120000 })

test('Enter Completed Work Orders by Batch', async({page, SprodevLogin}) =>{
    const navigatetoOffice = new OfficeNavigationPage(page);
    await navigatetoOffice.EnterCompletedWorkOrderByBatch();
}, { timeout: 120000 })