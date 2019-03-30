import React from 'react'

function buildTrackingCode(pluginOptions) {
  const script = pluginOptions.localScript
    ? pluginOptions.localScript
    : `${pluginOptions.matomoUrl}/piwik.js`

  const html = `
    window.dev = ${pluginOptions.dev}
    if (window.dev === true || !(navigator.doNotTrack === '1' || window.doNotTrack === '1')) {
      window._paq = window._paq || [];
      ${pluginOptions.requireConsent ? 'window._paq.push([\'requireConsent\']);' : ''}
      ${pluginOptions.disableCookies ? 'window._paq.push([\'disableCookies\']);' : ''}
      window._paq.push(['setTrackerUrl', '${pluginOptions.matomoUrl}/piwik.php']);
      window._paq.push(['setSiteId', '${pluginOptions.siteId}']);
      window._paq.push(['enableHeartBeatTimer']);
      window.start = new Date();

      (function() {
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.type='text/javascript'; g.async=true; g.defer=true; g.src='${script}'; s.parentNode.insertBefore(g,s);
      })();

      if (window.dev === true) {
        console.log('[Matomo] Tracking initialized')
        console.log('[Matomo] matomoUrl: ${pluginOptions.matomoUrl}, siteId: ${pluginOptions.siteId}')
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
  const html = `<img src="${pluginOptions.matomoUrl}/piwik.php?idsite=${pluginOptions.siteId}&rec=1&url=${pluginOptions.siteUrl + pathname}" style="border:0" alt="tracker" />`

  return (
    <noscript
      key={'gatsby-plugin-matomo'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

exports.onRenderBody = ({ setPostBodyComponents, pathname }, pluginOptions) => {
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
      return setPostBodyComponents([
        buildTrackingCode(pluginOptions),
        buildTrackingCodeNoJs(pluginOptions, pathname)
      ])
  }
  return null
}
