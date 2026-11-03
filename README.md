# SEP Automation Framework

End-to-end BDD test automation for the **Self Enrollment Portal (SEP)** — a checkout
system that lets customers enrol in a program online.

The suite drives a real browser through the full enrolment journey: viewing the product
landing page, entering personal details, choosing a payment plan, and submitting card
payment through a Stripe payment iframe. Tests are written in Gherkin and executed by
**Cucumber.js** on top of **Playwright**.

| | |
|---|---|
| Stack | Cucumber.js 11 · Playwright 1.53 · Node.js (ESM) |
| Pattern | BDD + Page Object Model |
| Scenarios | **47** across **13** feature files |
| Browser | Chromium (headless by default) |
| Execution | 5 parallel workers, ~45 s wall time |
| Reports | Cucumber HTML + JSON, plus screenshots on failure |

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Installation](#2-installation)
3. [Configuration](#3-configuration)
4. [Running Tests](#4-running-tests)
5. [Reports](#5-reports)
6. [Framework Structure](#6-framework-structure)
7. [How a Test Flows](#7-how-a-test-flows)
8. [Writing a New Test](#8-writing-a-new-test)
9. [Tag Reference](#9-tag-reference)
10. [Continuous Integration](#10-continuous-integration)
11. [Git Workflow](#11-git-workflow)
12. [Troubleshooting](#12-troubleshooting)
13. [Known Gaps](#13-known-gaps)

---

## 1. Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| Node.js | **20 or higher** | Developed on v24. Needs `process.loadEnvFile`, which requires Node 20.6+. |
| npm | 10 or higher | Ships with Node. |
| Git | any recent | |

Everything else (Playwright, Cucumber, Faker) installs from `package.json` — don't install
them globally.

Verify your toolchain:

```sh
node -v    # must be >= 20
npm -v
```

### Recommended VS Code extensions

- Cucumber (Gherkin) Full Support — step autocomplete and navigation
- Playwright Snippets
- Better Comments — renders the `#*` / `#!` / `#TODO` markers used in the feature files
- NPM Run
- Material Icon Theme

---

## 2. Installation

```sh
# 1. Clone and enter the project
git clone <repository-url>
cd sep-automation-bdd-js

# 2. Install dependencies
npm install

# 3. Install the Chromium browser binary that Playwright drives
npx playwright install chromium
```

Step 3 is required and easy to miss — `npm install` fetches the Playwright *library*, not
the browser itself. Without it every scenario fails at launch with
`Executable doesn't exist`.

---

## 3. Configuration

The suite needs credentials for the QA environment. **Never commit real values.**

### Option A — `.env` file (recommended)

```sh
cp .env.example .env
chmod 600 .env
```

Then fill it in:

```ini
SEP_QA_URL=https://<qa-host>/
SEP_USERNAME=<test-account-username>
SEP_PASSWORD=<test-account-password>
```

`cucumber.cjs` loads this file at startup using Node's built-in `process.loadEnvFile` —
there is **no `dotenv` dependency**. `.env` is gitignored; `.env.example` is the tracked
template.

### Option B — shell environment

```sh
export SEP_QA_URL="https://<qa-host>/"
export SEP_USERNAME="<username>"
export SEP_PASSWORD="<password>"
```

> **Precedence:** values already present in the environment win. `.env` is only a
> fallback, so an exported shell variable is never silently overwritten.

### Required variables

| Variable | Required | Used by |
|---|---|---|
| `SEP_QA_URL` | ✅ | `BasePage.login()` — the page every scenario opens |
| `SEP_USERNAME` | ✅ | HTTP Basic auth header |
| `SEP_PASSWORD` | ✅ | HTTP Basic auth header |

All three are needed by the shared `Given user is on the enrollment page` step, so if any
is missing **every** scenario fails immediately.

### Runtime toggles

Set these per-run on the command line; all are optional.

| Variable | Default | Effect |
|---|---|---|
| `HEADLESS` | `true` | `HEADLESS=false` opens a visible browser window |
| `SLOW_MO` | `0` | Milliseconds of delay between actions, for watching a run |

Other settings live as constants at the top of `hooks/globalHooks.js`:
`BROWSER_TYPE` (`chrome` \| `firefox` \| `webkit`), `MAXIMIZED_WINDOW`, and
`DEFAULT_TIMEOUT` (30 000 ms per step).

---

## 4. Running Tests

### npm scripts

```sh
npm test                  # all 47 scenarios, 5 workers, headless
npm run test:smoke        # @smoke subset (15 scenarios)
npm run test:tag          # the @sep23 payment feature
npm run test:tag:dryrun    # validate wiring without opening a browser
```

### Direct Cucumber invocations

```sh
# A single feature by tag
npx cucumber-js --tags @sep10

# A single scenario
npx cucumber-js --tags @sep10-13

# Boolean tag expressions
npx cucumber-js --tags "@regression and not @sep23"
npx cucumber-js --tags "@sep27 or @sep29"

# Serial execution (easier to read failures)
npx cucumber-js --parallel 1
```

> **Filter by tag, not by file path.** `cucumber.cjs` hardcodes
> `paths: ["./features/**/*.feature"]`, which takes precedence over positional arguments.
> Passing a feature file on the command line is **silently ignored** — it runs all 47
> scenarios rather than erroring, which is easy to mistake for a passing single-file run.
> Use `--tags` instead.

### Watch a run in a real browser

```sh
HEADLESS=false SLOW_MO=500 npx cucumber-js --parallel 1 --tags @sep10
```

Use `--parallel 1` when headed, otherwise five browser windows fight for your screen.

### Validate without running

```sh
npm run test:tag:dryrun
npx cucumber-js --dry-run          # all features
```

A dry run binds every Gherkin step to its step definition without launching a browser. It
is the fastest way to catch an **undefined** or **ambiguous** step after editing a feature
file, and it takes about two seconds.

---

## 5. Reports

Written to `reports/` on every run (gitignored):

| Artifact | Path |
|---|---|
| HTML report | `reports/cucumber-report.html` |
| JSON report | `reports/cucumber-report.json` |
| Failure screenshots | `reports/screenshots/<scenario>_<timestamp>.png` |

Open the HTML report:

```sh
npm run Mac-open:report        # macOS
npm run Windows-open:report    # Windows
```

Screenshots are captured **only** for failing scenarios, full-page, by the `After` hook in
`hooks/globalHooks.js`. An empty `screenshots/` folder after a run means everything passed.

The JSON report is handy for scripted checks:

```sh
node -e 'const r=require("./reports/cucumber-report.json");
let p=0,f=0;
for(const ft of r) for(const s of ft.elements||[])
  s.steps.some(x=>x.result.status==="failed") ? f++ : p++;
console.log("passed:",p,"failed:",f);'
```

> Note: the JSON contains more step entries than the CLI summary reports, because it also
> records the hidden `Before`/`After` hooks (2 per scenario).

---

## 6. Framework Structure

```
sep-automation-bdd-js/
│
├── features/                        # Gherkin specs — WHAT is tested
│   ├── getting-started/             #   step 1: landing page + personal details
│   │   ├── ViewProductLandingPage.feature        @sep07   4 scenarios
│   │   ├── DisplayCheckoutProcessSteps.feature   @sep08   1
│   │   ├── DisplayProductInfo.feature            @sep09   6
│   │   ├── EnterPersonalDetails.feature          @sep10  13
│   │   ├── StartAndRefundDates.feature           @sep11   2
│   │   └── ClickNextButtonStep1.feature          @sep19   2
│   ├── payment-plans/               #   step 2: choosing a plan
│   │   ├── SelectingPaymentPlan.feature          @sep14   4
│   │   ├── ClickNextButtonStep2.feature          @sep16   5
│   │   └── ViewPaymentPlanOptionStep2.feature    @sep17   2
│   └── submitting-payments/         #   step 3: card entry + payment
│       ├── MakePayment.feature                   @sep23   1
│       ├── ErrorMessageCardNumber.feature        @sep25   4
│       ├── ErrorMessageExpirationDate.feature    @sep27   2
│       └── ErrorMessageCVC.feature               @sep29   1
│
├── steps/                           # Step definitions — HOW each step runs
│   ├── CommonSteps.js               #   shared Given steps reused as Background
│   ├── getting-started/             #   mirrors the features/ layout
│   ├── payment-plans/
│   └── submitting-payments/
│
├── pages/                           # Page Object Model — WHERE elements live
│   ├── BasePage.js                  #   parent of all pages; owns login()
│   ├── LeftMainPage.js              #   left-hand product panel + footer
│   ├── StartApplicationPage.js      #   step 1 form, stepper circles
│   ├── PaymentPlanPage.js           #   step 2 accordions, plan summaries
│   ├── ReviewPaymentPage.js         #   step 3 Stripe iframe, totals, Pay button
│   └── Confirmation.js              #   post-payment confirmation page
│
├── hooks/
│   └── globalHooks.js               # Before/After, CustomWorld, browser lifecycle,
│                                    # screenshot-on-failure, default timeout
│
├── utilities/
│   ├── BrowserUtility.js            # reusable assertion/interaction helpers
│   └── qa-data-reader.js            # parses qa_data.json into Product/Price classes
│
├── data/
│   └── qa_data.json                 # expected product data (name, dates, prices)
│
├── globalPagesSetup.js              # instantiates every page object per scenario
├── cucumber.cjs                     # Cucumber config + .env loading
├── package.json                     # scripts and dependencies
├── .env.example                     # credential template (.env is gitignored)
├── reports/                         # generated output (gitignored)
└── .github/
    ├── workflows/Playwright-tests.yml   # CI pipeline
    └── prompts/                         # locator-strategy reference docs
```

### The four layers

**`features/` — specification.** Plain-language Gherkin describing behaviour from the
customer's point of view. Acceptance criteria are kept inline as `#*` comments so the
spec travels with the test. No code here.

**`steps/` — glue.** Each `Given`/`When`/`Then` maps to one function. Step files mirror
their feature file by name. Steps should read as orchestration, delegating the actual
clicking and typing to a page object.

**`pages/` — Page Object Model.** One class per screen, holding locators and the actions
available on that screen. All extend `BasePage`, which provides `login()`. This is the only
layer that knows about selectors, so a UI change means editing one file rather than many
step definitions.

**`hooks/` + `globalPagesSetup.js` — lifecycle.** `globalHooks.js` defines a `CustomWorld`
that launches a browser, context, and page **per scenario**, then calls
`initElements(page)` from `globalPagesSetup.js` to build fresh page objects bound to that
page. After each scenario it screenshots on failure and tears the browser down.

> **Important:** every new page class must be imported, exported, and instantiated inside
> `globalPagesSetup.js`. A page object that isn't registered there will be `undefined` in
> your step definitions.

---

## 7. How a Test Flows

```
npx cucumber-js --tags @sep10-13
        │
        ├─ cucumber.cjs            loads .env, resolves features + step imports
        │
        ├─ Before hook             CustomWorld.init()
        │                            → launch Chromium
        │                            → new context + page
        │                            → initElements(page) builds all page objects
        │
        ├─ Background              Given user is on the enrollment page
        │                            → startApplicationPage.login()
        │                            → Basic-auth header + goto(SEP_QA_URL)
        │
        ├─ When / Then steps       step definition → page object → Playwright locator
        │                            → expect(...) assertion
        │
        └─ After hook              on failure: full-page screenshot → reports/screenshots/
                                   always: close page + browser
```

Because the world is per-scenario, scenarios are fully isolated and safe to run in
parallel — but also slower, since each one pays a browser launch.

---

## 8. Writing a New Test

1. **Create the feature file** under the matching `features/` subfolder. Give it a unique
   feature-level tag (`@sep31`) and a per-scenario tag (`@sep31-1`).

2. **Generate step snippets** by running it — Cucumber prints ready-made stubs for any
   step it can't bind:

   ```sh
   npx cucumber-js --tags @sep31 --dry-run
   ```

3. **Add locators** to the relevant page class in `pages/`. If it's a new screen, create
   the class *and register it in `globalPagesSetup.js`*.

4. **Implement the steps** in `steps/<area>/<featureName>.js`, matching the feature file's
   name. Import the page objects you need from `../../globalPagesSetup.js`.

5. **Verify binding, then run:**

   ```sh
   npx cucumber-js --tags @sep31 --dry-run     # no undefined steps?
   HEADLESS=false SLOW_MO=400 npx cucumber-js --tags @sep31 --parallel 1
   ```

### Conventions that matter

- **Always `await` Playwright calls.** An un-awaited call becomes a floating promise that
  cannot fail its own step; it surfaces later as a confusing `After`-hook error such as
  `Target page, context or browser has been closed`.
- **Prefer web-first assertions** — `await expect(locator).toHaveText(x)` auto-retries
  until the timeout. `await locator.textContent()` reads once with no retry and is
  flake-prone against async-rendered content like the Stripe iframe.
- **Keep expected data in `data/qa_data.json`**, read via `utilities/qa-data-reader.js`,
  rather than hardcoding prices and dates in step definitions.
- **Don't put expected strings in step names.** Use a `{string}` parameter so the value
  lives in the feature file and the step stays reusable.
- **The Stripe card fields are inside an iframe.** Use the `paymentFrame` frame locator in
  `ReviewPaymentPage`, not a plain page locator.

---

## 9. Tag Reference

### Suite tags

| Tag | Scenarios | Purpose |
|---|---|---|
| *(none)* | 47 | Everything — `npm test` |
| `@regression` | 39 | Broad regression pass |
| `@smoke` | 15 | Fast confidence check |

### Feature tags

| Tag | Feature | Scenarios |
|---|---|---|
| `@sep07` | View Product Landing Page | 4 |
| `@sep08` | Display Checkout Process Steps | 1 |
| `@sep09` | Display Product Info | 6 |
| `@sep10` | Enter Personal Details | 13 |
| `@sep11` | Start and Refund Dates | 2 |
| `@sep14` | Selecting Payment Plan | 4 |
| `@sep16` | Click Next Button — Step 2 | 5 |
| `@sep17` | View Payment Plan Options — Step 2 | 2 |
| `@sep19` | Click Next Button — Step 1 | 2 |
| `@sep23` | Make a Payment | 1 |
| `@sep25` | Error Message — Card Number | 4 |
| `@sep27` | Error Message — Expiration Date | 2 |
| `@sep29` | Error Message — CVC | 1 |

Individual scenarios carry `@<feature>-<n>` tags (e.g. `@sep10-13`) for pinpoint runs.

> Scenario counts exceed the number of `Scenario:` keywords because three `Scenario
> Outline` blocks expand into multiple examples (44 declared → 47 executed).

---

## 10. Continuous Integration

`.github/workflows/Playwright-tests.yml` runs on:

- push to `main` or `develop`
- pull requests targeting `main` or `develop`
- a nightly schedule (23:00 UTC)
- manual `workflow_dispatch`

The job installs dependencies with `npm ci`, installs Chromium with
`npx playwright install --with-deps chromium`, injects credentials from **GitHub Secrets**,
runs `npm test`, and uploads `reports/` as an artifact (30-day retention) even when the
run fails.

Required repository secrets: `SEP_USERNAME`, `SEP_PASSWORD`, `SEP_QA_URL`.

---

## 11. Git Workflow

Branch per feature, off `develop`:

```sh
git fetch && git pull
git checkout develop
git checkout -b feature/sep31-new-feature
```

Naming: `feature/<tag>-<short-description>` — e.g. feature file `login.feature` tagged
`@sep01` becomes `feature/sep01-login`.

Then:

```sh
git add .
git commit -m "feat(sep31): add scenarios for <behaviour>"
git push -u origin feature/sep31-new-feature
```

Open a pull request into `develop`. Run the affected tags locally and confirm green before
requesting review. `develop` merges into `main` once a milestone is stable.

---

## 12. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `Executable doesn't exist at .../chromium` | Browser binary missing | `npx playwright install chromium` |
| Every scenario fails on the first `Given` | Credentials unset — `page.goto(undefined)` | Check `SEP_QA_URL` / `SEP_USERNAME` / `SEP_PASSWORD` |
| `Undefined. Implement with the following snippet` | Feature text doesn't match any step definition | Copy the printed snippet; check for double spaces and smart quotes (`'` vs `'`) |
| `Multiple step definitions match` | Same step defined in two files | Remove the duplicate |
| `Target page, context or browser has been closed` in `After` | A Playwright call wasn't awaited | Add the missing `await` |
| Payment-field assertions time out | Locator aimed at the page, not the Stripe iframe | Use `ReviewPaymentPage.paymentFrame` |
| Flaky text assertion | `textContent()` reads once, no retry | Switch to `await expect(locator).toHaveText(...)` |
| `process.loadEnvFile is not a function` | Node older than 20.6 | Upgrade Node |
| Five browser windows when watching | Parallel mode | Add `--parallel 1` |
| Passing a feature file runs all 47 scenarios | `paths` in `cucumber.cjs` overrides positional args | Filter with `--tags` instead |

---

## 13. Known Gaps

Documented so they aren't mistaken for working coverage:

- **`@sep10-9` … `@sep10-15` (7 scenarios)** are titled *"Next button is disabled when …"*
  but assert `toBeEnabled()`. They pass, yet verify the opposite of their intent. The
  application currently leaves the Step 1 Next button enabled and will advance with an
  invalid email and a non-numeric phone, which contradicts AC3 of SEP-10. Fixing the
  assertion to `toBeDisabled()` will correctly turn these red and expose the underlying
  application defect.
- **`@sep23-1` (Make a Payment)** has no `Then` step. It submits a card and asserts
  nothing, so it cannot fail. The feature's AC1–AC5 (confirmation redirect, green
  steppers, program name, user email, contact info) are untested, and `Confirmation.js`
  is never exercised.
- **Hardcoded expectations** — `ViewPaymentPlanOptionStep2.js` asserts `"$400"` / `"$100"`
  while `data/qa_data.json` holds the source values; the two can drift apart.
- **Dead `process.env.CARD_*` defaults** on `ReviewPaymentPage` methods are never reached,
  because callers pass literal test-card values.
- **`pages/BasePage.js`** calls `BrowserUtility.verify_title(...)` without `await`, so a
  title mismatch surfaces as an unhandled rejection in an unrelated step rather than a
  clean failure.

Test cards for payment scenarios come from
[Stripe's test card list](https://docs.stripe.com/testing).
