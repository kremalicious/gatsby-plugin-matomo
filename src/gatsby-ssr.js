import React from 'react'

function buildTrackingCode(pluginOptions) {
  const {
    matomoUrl,
    siteId,
    dev,
    localScript,
    requireConsent,
    disableCookies,
    cookieDomain
  } = pluginOptions

  const script = localScript ? localScript : `${matomoUrl}/piwik.js`

  const html = `
    window.dev = ${dev}
    if (window.dev === true || !(navigator.doNotTrack === '1' || window.doNotTrack === '1')) {
      window._paq = window._paq || [];
      ${requireConsent ? "window._paq.push(['requireConsent']);" : ''}
      ${disableCookies ? "window._paq.push(['disableCookies']);" : ''}
      ${
        cookieDomain
          ? `window._paq.push(['setCookieDomain', '${cookieDomain}']);`
          : ''
      }
      window._paq.push(['setTrackerUrl', '${matomoUrl}/piwik.php']);
      window._paq.push(['setSiteId', '${siteId}']);
      window._paq.push(['enableHeartBeatTimer']);
      window.start = new Date();

      (function() {
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.type='text/javascript'; g.async=true; g.defer=true; g.src='${script}'; s.parentNode.insertBefore(g,s);
      })();

      if (window.dev === true) {
        console.log('[Matomo] Tracking initialized')
        console.log('[Matomo] matomoUrl: ${matomoUrl}, siteId: ${siteId}')
      }
    }
  `

  return (
    <script
      key={'gatsby-plugin-matomo'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function buildTrackingCodeNoJs(pluginOptions, pathname) {
  const html = `<img src="${pluginOptions.matomoUrl}/piwik.php?idsite=${
    pluginOptions.siteId
  }&rec=1&url=${pluginOptions.siteUrl +
    pathname}" style="border:0" alt="tracker" />`

  return (
    <noscript
      key={'gatsby-plugin-matomo'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function buildHead(pluginOptions) {
  return (
    <link
      rel="preconnect"
      href={pluginOptions.matomoUrl}
      key={'gatsby-plugin-matomo'}
    />
  )
}

exports.onRenderBody = (
  { setHeadComponents, setPostBodyComponents, pathname },
  pluginOptions
) => {
  let excludePaths = ['/offline-plugin-app-shell-fallback/']

  if (typeof pluginOptions.exclude !== 'undefined') {
    pluginOptions.exclude.map(exclude => {
      excludePaths.push(exclude)
    })
  }

  const isPathExcluded = excludePaths.some(path => pathname === path)

  if (
    (process.env.NODE_ENV === 'production' || pluginOptions.dev === true) &&
    !isPathExcluded
  ) {
    setHeadComponents([buildHead(pluginOptions)])
    setPostBodyComponents([
      buildTrackingCode(pluginOptions),
      buildTrackingCodeNoJs(pluginOptions, pathname)
    ])
  }
}
