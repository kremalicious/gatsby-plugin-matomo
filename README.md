[![gatsby-plugin-matomo](https://raw.githubusercontent.com/kremalicious/gatsby-plugin-matomo/master/src/gatsby-plugin-matomo.png)](https://kremalicious.com/gatsby-plugin-matomo/)

# gatsby-plugin-matomo

[![npm package](https://img.shields.io/npm/v/gatsby-plugin-matomo.svg)](https://www.npmjs.com/package/gatsby-plugin-matomo)
[![Build Status](https://travis-ci.com/kremalicious/gatsby-plugin-matomo.svg?branch=master)](https://travis-ci.com/kremalicious/gatsby-plugin-matomo)
[![Maintainability](https://api.codeclimate.com/v1/badges/067339a02f2058f5ba01/maintainability)](https://codeclimate.com/github/kremalicious/gatsby-plugin-matomo/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/067339a02f2058f5ba01/test_coverage)](https://codeclimate.com/github/kremalicious/gatsby-plugin-matomo/test_coverage)
[![Greenkeeper badge](https://badges.greenkeeper.io/kremalicious/gatsby-plugin-matomo.svg)](https://greenkeeper.io/)

> 🥂 Gatsby plugin to add Matomo (formerly Piwik) onto a site. https://kremalicious.com/gatsby-plugin-matomo/

---

- [Features](#features)
- [Usage](#usage)
  - [Options](#options)
- [Development](#development)
- [Changelog](#changelog)
- [License](#license)

## Features

Plugin uses sensible defaults prioritizing user experience, performance & privacy:

- include tracking code in all server-side rendered routes
- track all route views as custom events
- load tracking scripts at end of `body` tag
- use image tracking fallback for `noscript`
- don't load anything when visitor has Do Not Track enabled
- don't load anything in non-production environments
- consent mode for privacy
- allow loading tracking script locally
- define paths to be excluded from tracking
- `preconnect` to configured Matomo host url
- dev mode for local development

## Usage

1. First, install the plugin from your project's root:

   ```bash
   cd yourproject/
   npm i gatsby-plugin-matomo
   ```

2. Then load the plugin from your `gatsby-config.js` and set the required variables:

   ```js
   plugins: [
     {
       resolve: 'gatsby-plugin-matomo',
       options: {
         siteId: 'YOUR_SITE_ID',
         matomoUrl: 'https://YOUR_MATOMO_URL.COM',
         siteUrl: 'https://YOUR_LIVE_SITE_URL.COM'
       }
     }
   ]
   ```

3. That's it!

_NOTE: By default, this plugin only generates output when run in production mode. To test your tracking code, run `gatsby build && gatsby serve`, or set `dev` option to `true`_.

### Options

| Option           | Explanation                                                                                                                                                                                                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `siteId`         | Your Matomo site ID configured in your Matomo installation.                                                                                                                                                                                                                                                        |
| `matomoUrl`      | The url of your Matomo installation.                                                                                                                                                                                                                                                                               |
| `siteUrl`        | The url of your site, usually the same as `siteMetadata.siteUrl`. Only used for generating the url for `noscript` image tracking fallback.                                                                                                                                                                         |
| `exclude`        | (optional) Specify an array of pathnames where tracking code will be excluded. The pathname `/offline-plugin-app-shell-fallback/` is excluded by default.                                                                                                                                                          |
| `requireConsent` | (optional) If true, tracking will be disabled until you call `window._paq.push(['setConsentGiven']);`.                                                                                                                                                                                                             |
| `disableCookies` | (optional) If true, no cookie will be used by Matomo.                                                                                                                                                                                                                                                              |
| `cookieDomain`   | (optional) Specify cookie domain.                                                                                                                                                                                                                                                                                  |
| `localScript`    | (optional) If set, load local `piwik.js` script from the given path, instead of loading it from your `matomoUrl`.                                                                                                                                                                                                  |
| `dev`            | (optional) Activate dev mode by setting to `true`. Will load all scripts despite not running in `production` environment. Ignores your local browser's DNT header too. Outputs some information in console about what it is doing. Useful for local testing but careful: all hits will be send like in production. |

```js
plugins: [
  {
    resolve: 'gatsby-plugin-matomo',
    options: {
      siteId: 'YOUR_SITE_ID',
      matomoUrl: 'https://YOUR_MATOMO_URL.COM',
      siteUrl: 'https://YOUR_LIVE_SITE_URL.COM',
      // All the optional settings
      exclude: ['/offline-plugin-app-shell-fallback/'],
      requireConsent: false,
      disableCookies: false,
      cookieDomain: '*.example.org',
      localScript: '/piwik.js',
      dev: false
    }
  }
]
```

## Development

```bash
npm i
npm start

# create production build
npm run build

# publishing to npm & GitHub releases
# uses https://github.com/webpro/release-it
npm run release
npm run release minor
npm run release major
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## License

The MIT License

Copyright (c) 2020 Matthias Kretschmann

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

Made with ♥ by [Matthias Kretschmann](https://matthiaskretschmann.com) ([@kremalicious](https://github.com/kremalicious))

Say thanks with BTC:
`35UUssHexVK48jbiSgTxa4QihEoCqrwCTG`

Say thanks with ETH:
`0x04354F554536DA108726829207958d3E277f0210`
