# Privacy Policy for Clear Tab

**Last Updated: February 15, 2026**

## Overview

Clear Tab ("the Extension") is a Chrome browser extension that replaces your new tab page with a customizable dashboard. We are committed to protecting your privacy.

## Data Collection

**Clear Tab does NOT collect, store, or transmit any personal data to external servers.**

### What We Store Locally

The Extension uses Chrome's `storage` API to save your preferences on your device:

- Theme and layout selections
- Enabled/disabled widget configurations
- Widget-specific settings (clock format, etc.)
- Quick link bookmarks
- Background image preferences
- Language preference

All of this data is stored locally on your device using Chrome's built-in storage mechanism. This data syncs across your Chrome browsers only if you have Chrome Sync enabled — this is handled entirely by Google Chrome, not by us.

### Network Requests

The Extension makes network requests to `api.ninechaps.com` solely to provide widget functionality:

- **Weather data**: When you use the Weather widget, your selected city name is sent to retrieve weather information.
- **News headlines**: When you use the News widget, requests are made to fetch current headlines.
- **Stock market data**: When you use the Stock widget, requests are made to fetch index data.
- **Exchange rates**: When you use the Exchange Rate widget, requests are made to fetch current rates.
- **Air quality data**: When you use the Air Quality widget, your selected city name is sent to retrieve air quality information.
- **Inspirational quotes**: When you use the Quote widget, requests are made to fetch quotes.

**No personal identifiers, browsing history, or tracking data are included in these requests.**

### Background Images

If you choose to use online backgrounds, the Extension connects to Unsplash or Pexels to fetch images. No personal data is sent in these requests.

If you upload a local background image, it is stored entirely on your device and is never transmitted externally.

## Third-Party Services

The Extension interacts with the following third-party services only when you actively use the corresponding features:

| Service | Purpose | Data Sent |
|---------|---------|-----------|
| api.ninechaps.com | Widget data (weather, news, stocks, etc.) | City names, widget queries |
| Unsplash | Background images | Image search queries |
| Pexels | Background images | Image search queries |

## Permissions

- **storage**: Used to save your preferences locally and sync across Chrome browsers.
- **search**: Used to submit search queries through Chrome's built-in Search API, which respects the user's default search engine setting. No search queries are collected or transmitted by the Extension.
- **host_permissions (api.ninechaps.com)**: Required to fetch data for widgets (weather, news, stocks, exchange rates, air quality, quotes).

## Data Sharing

We do not sell, trade, or otherwise transfer your data to any third parties.

## Children's Privacy

The Extension does not knowingly collect any information from children under the age of 13.

## Changes to This Policy

We may update this Privacy Policy from time to time. Any changes will be reflected in the "Last Updated" date above.

## Contact

If you have any questions about this Privacy Policy, please contact us by opening an issue on our GitHub repository.

## Open Source

Clear Tab is open source software licensed under the MIT License. You can review the complete source code to verify our privacy practices.