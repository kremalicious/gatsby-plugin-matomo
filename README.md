# gatsby-plugin-matomo

![npm package](https://img.shields.io/npm/v/gatsby-plugin-matomo.svg)
![Travis](https://img.shields.io/travis/kremalicious/gatsby-plugin-matomo.svg)

⚛️📄🚀 Gatsby plugin to add [Matomo](https://matomo.org) (formerly Piwik) onto a site.

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
          siteUrl: 'https://YOUR_LIVE_SITE_URL.COM',
          matomoUrl: 'https://YOUR_MATOMO_URL.COM',
        },
      },
    ]
    ```

3. That's it!

## Features

Plugin uses sensible defaults prioritizing user experience & privacy:

- include tracking code in all SSR routes
- track all route views as custom events
- load tracking scripts at end of `body` tag
- use image tracking fallback for `noscript`
- don't load anything when visitor has Do Not Track enabled
- don't load anything in non-production environments

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
