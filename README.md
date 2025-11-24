# Playwright Logins

Automated testing for logins across multiple Discourse instances using Playwright.

## Setup

```bash
pnpm install
```

## Running Tests

### Individual Test

Run a specific test file:

```bash
npx playwright test tests/facebook-login.spec.ts
```

Run against a specific site:

```bash
SITE_URL="https://example.com" npx playwright test tests/facebook-login.spec.ts
```

Debug mode:

```bash
pnpm run debug tests/facebook-login.spec.ts
```

UI mode:

```bash
pnpm run ui
```

### Bulk Testing

Run tests against sites in `site-list-LOGIN_METHOD.csv`:

```bash
LOGIN_METHOD=google node run-tests.js
LOGIN_METHOD=facebook node run-tests.js
LOGIN_METHOD=x node run-tests.js
LOGIN_METHOD=discord node run-tests.js
LOGIN_METHOD=github node run-tests.js
```

This will:

- Test each site listed in the CSV
- Log results with ☑️ for passing tests and ❌ for failing tests
- Save results to `test-results.log`
- Continue testing even if individual sites fail

## CSV Format

The `site-list-LOGIN_METHOD.csv` file should contain columns for `forum_name` and `url`:

```csv
"forum_name","url"
"Example Forum",https://example.com
```

## Test Output

- Screenshots of failures are saved to `screenshots/` directory (does not auto-reset after each bulk run)
- Bulk test results logged to `test-results.log`
