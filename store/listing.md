# Chrome Web Store listing

## Store listing tab

**Name** (max 75): Feed Blocker

**Summary** (max 132):
Hide YouTube recommendations, Shorts, comments, and the Instagram and Facebook feeds and stories. Stay focused.

**Category:** Productivity
**Language:** English

**Description:**

Feed Blocker removes the endless-scroll parts of YouTube, Instagram and Facebook, so you can use these sites for what you came for, without getting pulled into the feed.

WHAT IT HIDES
YouTube
• Home page: recommended videos, Shorts shelf, topic chips
• Video page: comments and suggested videos
Instagram
• Home page: feed and stories
Facebook
• Home page: news feed and stories

HOW IT WORKS
• Everything is on by default; turn any rule on or off from the popup.
• Changes apply instantly, no page reload.
• Rules only affect the relevant pages (e.g. the home page), so search, profiles, messages and the video player keep working.
• Your settings sync across your Chrome browsers.

PRIVACY
Feed Blocker does not collect, store or transmit any personal data. It has no servers, no analytics and no trackers. The only thing saved is which rules you switched on or off.

Open source: https://github.com/mroozspace/feed-blocker

## Privacy practices tab

**Single purpose:**
Hide distracting content (recommended feeds, Shorts, stories, comments) on YouTube, Instagram and Facebook.

**Permission justifications:**
- `storage`: Saves the user's on/off choice for each blocking rule (synced via chrome.storage.sync).
- `activeTab`: The popup reads the URL of the current tab to show the rules relevant to the site the user is on.
- Host access (`*://*.youtube.com/*`, `*://*.facebook.com/*`, `*://*.instagram.com/*`): The content script injects a stylesheet on these sites that hides the selected page elements. It does not read or modify page data.

**Remote code:** No, I am not using remote code.

**Data usage:** Leave all data-collection boxes unchecked (no data collected).
Certify all three: data not sold to third parties, not used for unrelated purposes, not used for creditworthiness/lending.

**Privacy policy URL:** not required when no user data is handled; if you want one, host `store/privacy-policy.md` (e.g. via GitHub: https://github.com/mroozspace/feed-blocker/blob/master/store/privacy-policy.md).

## Graphic assets (you need to prepare)
- Icon 128x128: `public/icon/128.png` (done)
- Screenshots: 1-5, 1280x800 or 640x400 (e.g. YouTube home with feed hidden, the popup, video page without comments)
- Small promo tile: 440x280 (required)
- Marquee 1400x560 (optional)

## Upload
```bash
bun run zip   # creates output/feed-blocker-0.1.0-chrome.zip
```
Upload at https://chrome.google.com/webstore/devtools (one-time $5 developer fee).
