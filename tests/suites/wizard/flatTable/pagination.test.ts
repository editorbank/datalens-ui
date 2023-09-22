import {Page} from '@playwright/test';

import WizardPage from '../../../page-objects/wizard/WizardPage';
import {openTestPage, waitForCondition} from '../../../utils';
import {RobotChartsWizardUrls} from '../../../utils/constants';
import datalensTest from '../../../utils/playwright/globalTestDefinition';

const rowLimit = 5;

const TIMEOUT = 4000;

const SELECTORS = {
    COLUMN_SELECTOR_TEXT: '.chartkit-table__content_text',
    PAGINATOR_INPUT: '.chartkit-table-paginator__page-input .yc-text-input__control_type_input',
    PAGINATOR_PREV_BUTTON: '.chartkit-table-paginator > button.yc-button:first-child',
    PAGINATOR_NEXT_BUTTON: '.chartkit-table-paginator > .yc-text-input + button.yc-button',
    PAGINATOR_TEXT: '.chartkit-table-paginator__range',
};

const VALUES = {
    DEFAULT_FIRST_CELL_VALUE: 'Consumer OFF-PA-10000174 DP-13000',
    NEXT_FIRST_CELL_VALUE: 'Consumer OFF-BI-10003708 VS-21820',
    NEXT_LIMITED_FIRST_CELL_VALUE: 'Consumer OFF-PA-10002005 LS-17230',
    DEFAULT_PAGE_INPUT_VALUE: 1,
    NEXT_PAGE_INPUT_VALUE: 2,
};

const waitForLimitPaginationSettingsApply = async (page: WizardPage): Promise<void> => {
    // Open the chart settings
    // Setting a new pagination line limit
    // Apply values
    await Promise.all([
        page.chartSettings.open(),
        page.chartSettings.setLimit(rowLimit),
        page.chartSettings.apply(),
    ]);

    return new Promise((resolve) => resolve());
};

datalensTest.describe('Wizard :: Flat table :: Pagination', () => {
    datalensTest(
        'Checking that the default pagination of a flat table is switched forward/backward by clicking, the data is redrawn',
        async ({page}: {page: Page}) => {
            const wizardPage = new WizardPage({page});
            await openTestPage(page, RobotChartsWizardUrls.WizardFlatTable);
            await wizardPage.chartkit.waitForPaginationExist();

            // Checking the default state of the paginator input
            await page.waitForSelector(
                `${SELECTORS.PAGINATOR_INPUT}[value="${VALUES.DEFAULT_PAGE_INPUT_VALUE}"]`,
            );

            // Check the default state of the first cell of the table
            await page.waitForSelector(
                `${SELECTORS.COLUMN_SELECTOR_TEXT} >> text="${VALUES.DEFAULT_FIRST_CELL_VALUE}"`,
            );

            // Click on the switch arrow pagination forward
            await page.click(SELECTORS.PAGINATOR_NEXT_BUTTON);

            // We expect that the pagination input has changed the value to the next page
            await page.waitForSelector(
                `${SELECTORS.PAGINATOR_INPUT}[value="${VALUES.NEXT_PAGE_INPUT_VALUE}"]`,
            );

            // We expect that the data in the table has been redrawn
            await page.waitForSelector(
                `${SELECTORS.COLUMN_SELECTOR_TEXT} >> text="${VALUES.NEXT_FIRST_CELL_VALUE}"`,
            );

            // Time to release the back button
            await page.waitForTimeout(TIMEOUT);

            // Click on the pagination switch arrow back
            await page.click(SELECTORS.PAGINATOR_PREV_BUTTON);

            // We expect that the pagination input has changed the value to the previous page
            await page.waitForSelector(
                `${SELECTORS.PAGINATOR_INPUT}[value="${VALUES.DEFAULT_PAGE_INPUT_VALUE}"]`,
            );

            // We expect that the data in the table has been redrawn
            await page.waitForSelector(
                `${SELECTORS.COLUMN_SELECTOR_TEXT} >> text="${VALUES.DEFAULT_FIRST_CELL_VALUE}"`,
            );
        },
    );

    datalensTest(
        'Checking that the default pagination of a flat table by entering values into input is switched, the data is redrawn',
        async ({page}: {page: Page}) => {
            const wizardPage = new WizardPage({page});
            await openTestPage(page, RobotChartsWizardUrls.WizardFlatTable);
            await wizardPage.chartkit.waitForPaginationExist();

            // Checking the default state of the paginator input
            await page.waitForSelector(
                `${SELECTORS.PAGINATOR_INPUT}[value="${VALUES.DEFAULT_PAGE_INPUT_VALUE}"]`,
            );

            // Check the default state of the first cell of the table
            await page.waitForSelector(
                `${SELECTORS.COLUMN_SELECTOR_TEXT} >> text="${VALUES.DEFAULT_FIRST_CELL_VALUE}"`,
            );

            // Enter the value of the new pagination page in the pagination input
            await page.fill(SELECTORS.PAGINATOR_INPUT, String(VALUES.NEXT_PAGE_INPUT_VALUE));
            // Press Enter in the pagination input, p.s. when entering the input value from the keyboard, value does not change
            await page.press(SELECTORS.PAGINATOR_INPUT, 'Enter');

            // We expect that the data in the table has been redrawn
            await page.waitForSelector(
                `${SELECTORS.COLUMN_SELECTOR_TEXT} >> text="${VALUES.NEXT_FIRST_CELL_VALUE}"`,
            );

            // Time to release the back button
            await page.waitForTimeout(TIMEOUT);

            // Enter the value of the previous pagination page in the pagination input
            await page.fill(SELECTORS.PAGINATOR_INPUT, String(VALUES.DEFAULT_PAGE_INPUT_VALUE));
            // Press Enter in the pagination input, p.s. when entering the input value from the keyboard, value does not change
            await page.press(SELECTORS.PAGINATOR_INPUT, 'Enter');

            // We expect that the data in the table has been redrawn
            await page.waitForSelector(
                `${SELECTORS.COLUMN_SELECTOR_TEXT} >> text="${VALUES.DEFAULT_FIRST_CELL_VALUE}"`,
            );
        },
    );

    datalensTest(
        'Checking that after changing the row limit, the pagination of a flat table is switched forward/backward by clicking, the data is redrawn',
        async ({page}: {page: Page}) => {
            const wizardPage = new WizardPage({page});
            await openTestPage(page, RobotChartsWizardUrls.WizardFlatTable);
            await wizardPage.chartkit.waitForPaginationExist();

            // Setting a new pagination line limit
            await waitForLimitPaginationSettingsApply(wizardPage);

            // We are waiting for the number of rows in the table to change
            await waitForCondition(async () => {
                return (await wizardPage.chartkit.getTableRowsCount()) === rowLimit;
            });

            // Checking the default state of the paginator input
            await page.waitForSelector(
                `${SELECTORS.PAGINATOR_INPUT}[value="${VALUES.DEFAULT_PAGE_INPUT_VALUE}"]`,
            );

            // Check the default state of the first cell of the table
            await page.waitForSelector(
                `${SELECTORS.COLUMN_SELECTOR_TEXT} >> text="${VALUES.DEFAULT_FIRST_CELL_VALUE}"`,
            );

            // Click on the switch arrow pagination forward
            await page.click(SELECTORS.PAGINATOR_NEXT_BUTTON);

            // We expect that the pagination input has changed the value to the next page
            await page.waitForSelector(
                `${SELECTORS.PAGINATOR_INPUT}[value="${VALUES.NEXT_PAGE_INPUT_VALUE}"]`,
            );

            // We expect that the data in the table has been redrawn
            await page.waitForSelector(
                `${SELECTORS.COLUMN_SELECTOR_TEXT} >> text="${VALUES.NEXT_LIMITED_FIRST_CELL_VALUE}"`,
            );

            // Time to release the back button
            await page.waitForTimeout(TIMEOUT);

            // Click on the pagination switch arrow back
            await page.click(SELECTORS.PAGINATOR_PREV_BUTTON);

            // We expect that the pagination input has changed the value to the previous page
            await page.waitForSelector(
                `${SELECTORS.PAGINATOR_INPUT}[value="${VALUES.DEFAULT_PAGE_INPUT_VALUE}"]`,
            );

            // We expect that the data in the table has been redrawn
            await page.waitForSelector(
                `${SELECTORS.COLUMN_SELECTOR_TEXT} >> text="${VALUES.DEFAULT_FIRST_CELL_VALUE}"`,
            );
        },
    );

    datalensTest(
        'Checking that after changing the row limit, the pagination of a flat table by entering values into input is switched, the data is redrawn',
        async ({page}: {page: Page}) => {
            const wizardPage = new WizardPage({page});
            await openTestPage(page, RobotChartsWizardUrls.WizardFlatTable);
            await wizardPage.chartkit.waitForPaginationExist();

            // Setting a new pagination line limit
            await waitForLimitPaginationSettingsApply(wizardPage);

            // Checking the default state of the paginator input
            await page.waitForSelector(
                `${SELECTORS.PAGINATOR_INPUT}[value="${VALUES.DEFAULT_PAGE_INPUT_VALUE}"]`,
            );

            // Check the default state of the first cell of the table
            await page.waitForSelector(
                `${SELECTORS.COLUMN_SELECTOR_TEXT} >> text="${VALUES.DEFAULT_FIRST_CELL_VALUE}"`,
            );

            // Enter the value of the new pagination page in the pagination input
            await page.fill(SELECTORS.PAGINATOR_INPUT, String(VALUES.NEXT_PAGE_INPUT_VALUE));
            // Press Enter in the pagination input, p.s. when entering the input value from the keyboard, value does not change
            await page.press(SELECTORS.PAGINATOR_INPUT, 'Enter');

            // We expect that the data in the table has been redrawn
            await page.waitForSelector(
                `${SELECTORS.COLUMN_SELECTOR_TEXT} >> text="${VALUES.NEXT_LIMITED_FIRST_CELL_VALUE}"`,
            );

            // Time to release the back button
            await page.waitForTimeout(TIMEOUT);

            // Enter the value of the previous pagination page in the pagination input
            await page.fill(SELECTORS.PAGINATOR_INPUT, String(VALUES.DEFAULT_PAGE_INPUT_VALUE));
            // Press Enter in the pagination input, p.s. when entering the input value from the keyboard, value does not change
            await page.press(SELECTORS.PAGINATOR_INPUT, 'Enter');

            // We expect that the data in the table has been redrawn
            await page.waitForSelector(
                `${SELECTORS.COLUMN_SELECTOR_TEXT} >> text="${VALUES.DEFAULT_FIRST_CELL_VALUE}"`,
            );
        },
    );
});
