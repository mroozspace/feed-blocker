# TODO

## E2E tests (Playwright)

Run against the built extension in Chromium (`output/chrome-mv3`). Intercept
`instagram.com`, `facebook.com` and `youtube.com` requests and serve a small fake
single-page app with `data-pagelet` / `role` markup, so no login is needed.

Cases:
- Home page: feed/stories are hidden.
- Navigate to a non-home page (e.g. `/direct/inbox/`): content is visible.
- Navigate back to home: hidden again (regression for the `wxt:locationchange` bug).
- Toggling a rule in the popup applies live, without reload.

Limit: verifies extension logic and navigation, not whether the real sites'
selectors are still current.
