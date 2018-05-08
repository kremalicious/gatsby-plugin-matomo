import React from 'react'

function buildTrackingCode(siteId, matomoUrl) {
  const html = `
    if (!(navigator.doNotTrack == '1' || window.doNotTrack == '1')) {
      window._paq = window._paq || [];
      window._paq.push(['setTrackerUrl', '${matomoUrl}/piwik.php']);
      window._paq.push(['setSiteId', '${siteId}']);
      window._paq.push(['enableLinkTracking']);
      window._paq.push(['trackPageView']);
      window._paq.push(['enableHeartBeatTimer']);
      window.start = new Date();

      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.type='text/javascript'; g.defer=true; g.async=true;
      g.src='${matomoUrl}/piwik.js';
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

function buildTrackingCodeNoJs(siteId, matomoUrl, siteUrl, pathname) {
  const html = `<img src="${matomoUrl}/piwik.php?idsite=${siteId}&rec=1&url=${siteUrl + pathname}" style="border:0" alt="tracker" />`

  return (
    <noscript
      key={'gatsby-plugin-matomo'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

exports.onRenderBody = ({ setPostBodyComponents, pathname }, pluginOptions) => {
  if (process.env.NODE_ENV === 'production') {
    const siteId = pluginOptions.siteId
    const siteUrl = pluginOptions.siteUrl
    const matomoUrl = pluginOptions.matomoUrl

    return setPostBodyComponents([
      buildTrackingCode(siteId, matomoUrl),
      buildTrackingCodeNoJs(siteId, matomoUrl, siteUrl, pathname)
    ])
  }
  return null
}
