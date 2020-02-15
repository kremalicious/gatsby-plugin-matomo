/* eslint-disable no-console */

let first = true

function getDuration() {
  const start = window.start || new Date()
  const now = new Date()
  const difference = now.getTime() - start.getTime()

  if (difference === 0) {
    return null
  }

  return difference
}

exports.onRouteUpdate = ({ location, prevLocation }) => {
  if (
    (process.env.NODE_ENV === 'production' && typeof _paq !== 'undefined') ||
    window.dev === true
  ) {
    const _paq = window._paq || []
    const dev = window.dev || null

    const url = location.pathname + location.search + location.hash
    const prevUrl =
      prevLocation &&
      prevLocation.pathname + prevLocation.search + prevLocation.hash

    // document.title workaround stolen from:
    // https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-google-analytics/src/gatsby-browser.js
    const sendPageView = () => {
      const { title } = document

      prevUrl && _paq.push(['setReferrerUrl', prevUrl])
      _paq.push(['setCustomUrl', url])
      _paq.push(['setDocumentTitle', title])
      _paq.push(['trackPageView'])
      _paq.push(['enableLinkTracking'])
      _paq.push(['trackAllContentImpressions'])

      if (dev) {
        console.log(`[Matomo] Page view for: ${url} - ${title}`)
      }
    }

    if ('requestAnimationFrame' in window) {
      requestAnimationFrame(() => {
        requestAnimationFrame(sendPageView)
      })
    } else {
      // simulate 2 rAF calls
      setTimeout(sendPageView, 32)
    }

    if (first) {
      first = false
      _paq.push(['trackEvent', 'javascript', 'load', 'duration', getDuration()])

      if (dev) {
        console.log(`[Matomo] Tracking duration for: ${url}`)
      }
    }
  }
  return null
}
