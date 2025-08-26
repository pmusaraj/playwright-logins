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

Run tests against all sites in `site-list.csv`:

```bash
node run-tests.js
```

This will:

- Test each site listed in the CSV
- Log results with ☑️ for passing tests and ❌ for failing tests
- Save results to `test-results.log`
- Continue testing even if individual sites fail

## CSV Format

The `site-list.csv` file should contain columns for `forum_name` and `url`:

```csv
"forum_name","url"
"Example Forum",https://example.com
```

## Test Output

- Screenshots of failures are saved to `screenshots/` directory (does not auto-reset after each bulk run)
- Bulk test results logged to `test-results.log`
