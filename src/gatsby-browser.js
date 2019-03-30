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
  if (process.env.NODE_ENV === 'production' && typeof _paq !== 'undefined' || window.dev === true) {
    window._paq = window._paq || []
    window.dev = window.dev || null

    const url = location.pathname + location.search + location.hash
    const prevUrl = prevLocation && prevLocation.pathname + prevLocation.search + prevLocation.hash

    if (first) {
      first = false
      window._paq.push([
        'trackEvent',
        'javascript',
        'load',
        'duration',
        getDuration()
      ])

      if (window.dev) {
        console.log(`[Matomo] Page view for: ${url}`)
      }
    } else {
      window._paq.push(['setReferrerUrl', prevUrl])
      window._paq.push(['setCustomUrl', url])
      window._paq.push(['setDocumentTitle', url])
      window._paq.push(['trackPageView'])
      window._paq.push(['enableLinkTracking'])

      if (window.dev) {
        console.log(`[Matomo] Page view for: ${url}`)
      }
    }
  }
  return null
}
