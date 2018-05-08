import React from 'react'

function buildTrackingCode(pluginOptions) {
  const html = `
    window.dev = ${pluginOptions.dev}

    if (window.dev === true || !(navigator.doNotTrack == '1' || window.doNotTrack == '1')) {
      window._paq = window._paq || [];
      window._paq.push(['setTrackerUrl', '${pluginOptions.matomoUrl}/piwik.php']);
      window._paq.push(['setSiteId', '${pluginOptions.siteId}']);
      window._paq.push(['enableLinkTracking']);
      window._paq.push(['trackPageView']);
      window._paq.push(['enableHeartBeatTimer']);
      window.start = new Date();

      if (window.dev === true) {
        console.log('[Matomo] Tracking initialized')
        console.log('[Matomo] matomoUrl: ${pluginOptions.matomoUrl}, siteId: ${pluginOptions.siteId}')
      }

      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.defer=true; g.async=true;
      g.src='${pluginOptions.matomoUrl}/piwik.js';
      s.parentNode.insertBefore(g,s);
    }
  `

  return (
    <script
      key={'gatsby-plugin-matomo'}
      type="text/javascript"
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
  if (process.env.NODE_ENV === 'production' || pluginOptions.dev === true) {
    return setPostBodyComponents([
      buildTrackingCode(pluginOptions),
      buildTrackingCodeNoJs(pluginOptions, pathname)
    ])
  }
  return null
}
