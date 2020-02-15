// eslint-disable-next-line no-unused-vars
import React from 'react'

function buildTrackingCode(pluginOptions) {
  const {
    matomoUrl,
    siteId,
    dev,
    localScript,
    requireConsent,
    disableCookies
  } = pluginOptions

  const script = localScript ? localScript : `${matomoUrl}/piwik.js`

  const html = `
    window.dev = ${dev}
    if (window.dev === true || !(navigator.doNotTrack === '1' || window.doNotTrack === '1')) {
      window._paq = window._paq || [];
      ${requireConsent ? "window._paq.push(['requireConsent']);" : ''}
      ${disableCookies ? "window._paq.push(['disableCookies']);" : ''}
      window._paq.push(['setTrackerUrl', '${matomoUrl}/piwik.php']);
      window._paq.push(['setSiteId', '${siteId}']);
      window._paq.push(['enableHeartBeatTimer']);
      window.start = new Date();

      (function() {
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.type='text/javascript'; g.async=true; g.defer=true; g.src='${script}'; s.parentNode.insertBefore(g,s);
      })();

      if (window.dev === true) {
        console.debug('[Matomo] Tracking initialized')
        console.debug('[Matomo] matomoUrl: ${matomoUrl}, siteId: ${siteId}')
      }
    }
  `

  return (
    <script
      key="script-gatsby-plugin-matomo"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function buildTrackingCodeNoJs(pluginOptions, pathname) {
  const { matomoUrl, siteId, siteUrl } = pluginOptions
  const html = `<img src="${matomoUrl}/piwik.php?idsite=${siteId}&rec=1&url=${siteUrl +
    pathname}" style="border:0" alt="tracker" />`

  return (
    <noscript
      key="noscript-gatsby-plugin-matomo"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function buildHead(pluginOptions) {
  return (
    <link
      rel="preconnect"
      href={pluginOptions.matomoUrl}
      key="preconnect-gatsby-plugin-matomo"
    />
  )
}

export const onRenderBody = (
  { setHeadComponents, setPostBodyComponents, pathname },
  pluginOptions
) => {
  const isProduction = process.env.NODE_ENV === 'production'
  let excludePaths = ['/offline-plugin-app-shell-fallback/']

  if (pluginOptions && typeof pluginOptions.exclude !== 'undefined') {
    pluginOptions.exclude.map(exclude => {
      excludePaths.push(exclude)
    })
  }

  const isPathExcluded = excludePaths.some(path => pathname === path)

  if (
    (isProduction || (pluginOptions && pluginOptions.dev === true)) &&
    !isPathExcluded
  ) {
    setHeadComponents([buildHead(pluginOptions)])
    setPostBodyComponents([
      buildTrackingCode(pluginOptions),
      buildTrackingCodeNoJs(pluginOptions, pathname)
    ])
  }
}
