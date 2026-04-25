import type { Page } from '@playwright/test';

export async function installCommonBrowserApiMocks(page: Page) {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });

    class ResizeObserverMock {
      observe() {}
      unobserve() {}
      disconnect() {}
    }

    class IntersectionObserverMock {
      root = null;
      rootMargin = '0px';
      thresholds = [];
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }

    Object.defineProperty(window, 'ResizeObserver', {
      writable: true,
      value: ResizeObserverMock,
    });

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: IntersectionObserverMock,
    });

    Object.defineProperty(window, 'scrollTo', {
      writable: true,
      value: () => {},
    });
  });
}
