import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
    test.beforeEach(async ({ page }) => {
        // Mock the Google Apps Script endpoint to return success consistently
        await page.route('https://script.google.com/macros/**', async route => {
            await route.fulfill({
                status: 200,
                // no-cors doesn't allow reading response, but the browser handles it.
                // We just need it to complete successfully.
                contentType: 'text/plain',
                body: 'Success'
            });
        });
        await page.goto('/');
    });

    test('should load homepage with correct title', async ({ page }) => {
        await expect(page).toHaveTitle(/Find My Genie/);
        await expect(page.getByRole('heading', { name: /Let AI call-around/i })).toBeVisible();
    });

    test('should handle waitlist form submission', async ({ page }) => {
        // 1. Open Waitlist Modal
        await page.getByTestId('hero-waitlist-button').click();
        await expect(page.getByRole('heading', { name: 'Join the Waitlist' })).toBeVisible();

        // 2. Fill out form
        await page.getByPlaceholder('Full Name').fill('Test User');
        await page.getByPlaceholder('Email Address').fill('test@example.com');
        await page.getByPlaceholder('Phone Number').fill('1234567890');

        // 3. Submit
        await page.getByRole('button', { name: 'Join Waitlist' }).click();

        // 4. Verify Loading State (Skeleton)
        // We check for the pulsing animation class or the absence of the button
        await expect(page.getByRole('button', { name: 'Join Waitlist' })).not.toBeVisible();

        // 5. Verify Success State (Modal Header)
        await expect(page.getByRole('heading', { name: "You're on the list!" })).toBeVisible();

        // 6. Verify Modal Closes
        // Wait for auto-close timeout
        await expect(page.getByRole('heading', { name: 'Join the Waitlist' })).not.toBeVisible({ timeout: 5000 });
    });
    test('should handle Vendor waitlist form submission', async ({ page, isMobile }) => {
        if (isMobile) {
            await page.getByTestId('mobile-menu-toggle').click();
            await page.getByTestId('mobile-vendor-button').click();
        } else {
            await page.getByTestId('nav-vendor-button').click();
        }

        await expect(page.getByRole('heading', { name: 'Join as a Vendor' })).toBeVisible();

        await page.getByPlaceholder('Full Name').fill('Vendor User');
        await page.getByPlaceholder('Email Address').fill('vendor@example.com');
        await page.getByPlaceholder('Phone Number').fill('9876543210');

        await page.getByRole('button', { name: 'Join Waitlist' }).click();
        await expect(page.getByRole('button', { name: 'Join Waitlist' })).not.toBeVisible();
        await expect(page.getByRole('heading', { name: "Welcome aboard!" })).toBeVisible();
    });

    test('should toggle mobile menu', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });

        // Open menu
        await page.getByTestId('mobile-menu-toggle').click();
        await expect(page.getByText('Request Access')).toBeVisible();

        // Navigate (closes menu)
        // Navigate (closes menu)
        // Use first() because it might appear in footer too, but in mobile view the menu covers it.
        // Or better, target the one visible or within the menu container if possible.
        // Since we know the mobile menu is open and covers the screen, we can try to filter by visibility or just take first found which is likely the menu one in DOM order (if menu is at bottom) or top.
        // Actually, let's use the text directly which we verified is visible.
        await page.getByText('Live Demo').first().click();
        await expect(page.getByText('Request Access')).not.toBeVisible();
    });

    test('should load interactive demo', async ({ page }) => {
        const demoFrame = page.getByTestId('demo-iphone-frame');
        await demoFrame.scrollIntoViewIfNeeded();
        await expect(demoFrame).toBeVisible();
        await expect(page.getByText('Loading demo...')).not.toBeVisible({ timeout: 10000 });
    });

    test('should activate voice agent state', async ({ page, browserName }) => {
        // WebKit (Safari) does not support grantPermissions for microphone in Playwright
        test.skip(browserName === 'webkit', 'Microphone permissions not supported in WebKit');

        // Grant permissions
        await page.context().grantPermissions(['microphone']);

        // Mock getUserMedia to prevent actual mic access and errors
        await page.addInitScript(() => {
            navigator.mediaDevices.getUserMedia = async () => {
                return new MediaStream(); // Mock stream
            };
        });

        const micButton = page.getByTestId('hero-mic-button');
        // Button is animated (scale/opacity), so strict stability check fails. We force click.
        await expect(micButton).toBeVisible();
        await micButton.click({ force: true });

        // Verify connecting state (Spinner should replace the Mic icon)
        await expect(page.locator('.animate-spin')).toBeVisible();
    });
});
