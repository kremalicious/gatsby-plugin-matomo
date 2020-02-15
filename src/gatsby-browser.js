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

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (process.env.NODE_ENV === 'production' || window.dev === true) {
    if (!window._paq) return

    const { _paq, dev } = window
    const url = location && location.pathname + location.search + location.hash
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
        console.debug(`[Matomo] Page view for: ${url} - ${title}`)
      }
    }

    // Minimum delay for reactHelmet's requestAnimationFrame
    const delay = Math.max(32, 0)
    setTimeout(sendPageView, delay)

    if (first) {
      first = false
      _paq.push(['trackEvent', 'javascript', 'load', 'duration', getDuration()])

      if (dev) {
        console.debug(`[Matomo] Tracking duration for: ${url}`)
      }
    }
  }

  return null
}
