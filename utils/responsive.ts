import { Page } from '@playwright/test';

export const isDesktopViewPort = (page: Page) => {
	const size = page.viewportSize();
	return (size?.width ?? 0) >= 600;
};
