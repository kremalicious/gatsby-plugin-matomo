# gatsby-plugin-matomo

![gatsby-plugin-matomo](https://user-images.githubusercontent.com/90316/39896678-6c0829ec-54af-11e8-84f6-ef94abb201ab.png)
[![npm package](https://img.shields.io/npm/v/gatsby-plugin-matomo.svg)](https://www.npmjs.com/package/gatsby-plugin-matomo)
[![Build Status](https://travis-ci.com/kremalicious/gatsby-plugin-matomo.svg?branch=master)](https://travis-ci.com/kremalicious/gatsby-plugin-matomo)
[![Maintainability](https://api.codeclimate.com/v1/badges/067339a02f2058f5ba01/maintainability)](https://codeclimate.com/github/kremalicious/gatsby-plugin-matomo/maintainability)
[![Greenkeeper badge](https://badges.greenkeeper.io/kremalicious/gatsby-plugin-matomo.svg)](https://greenkeeper.io/)

⚛️📄🚀 Gatsby plugin to add [Matomo](https://matomo.org) (formerly Piwik) onto a site.

## Features

Plugin uses sensible defaults prioritizing user experience & privacy:

- include tracking code in all server-side rendered routes
- track all route views as custom events
- load tracking scripts at end of `body` tag
- use image tracking fallback for `noscript`
- don't load anything when visitor has Do Not Track enabled
- don't load anything in non-production environments
- allow loading tracking script locally
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

## Options

Option        | Explanation
--------------|---------
`siteId`      | Your Matomo site ID configured in your Matomo installation.
`matomoUrl`   | The url of your Matomo installation.
`siteUrl`     | The url of your site, usually the same as `siteMetadata.siteUrl`. Only used for generating the url for `noscript` image tracking fallback.
`localScript` | (optional) Set path to load local `piwik.js` script, instead of loading it from your `matomoUrl`.
`dev`         | (optional) Activate dev mode by setting to `true`. Will load all scripts despite not running in `production` environment. Ignores your local browser's DNT header too. Outputs some information in console about what it is doing. Useful for local testing but careful: all hits will be send like in production.

## Development

```bash
npm i
npm run build

# publishing to npm & GitHub releases
# uses https://github.com/webpro/release-it
npm run release
npm run release-minor
npm run release-major
```

## License

The MIT License

Copyright (c) 2018 Matthias Kretschmann

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

Made with ♥ by [Matthias Kretschmann](https://matthiaskretschmann.com) ([@kremalicious](https://github.com/kremalicious))

Say thanks with BTC:
`35UUssHexVK48jbiSgTxa4QihEoCqrwCTG`

Say thanks with ETH:
`0x04354F554536DA108726829207958d3E277f0210`
