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

exports.onRouteUpdate = ({ location }) => {
  if (process.env.NODE_ENV !== 'production' && typeof _paq !== 'undefined') {
    window._paq = window._paq || []
    window.dev = window.dev || null

    const pathname = location.pathname

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
        console.log(`[Matomo] Page view for: ${pathname}`)
      }
    } else {
      window._paq.push(['setCustomUrl', pathname])
      window._paq.push(['setDocumentTitle', pathname])
      window._paq.push(['trackPageView'])

      if (window.dev) {
        console.log(`[Matomo] Page view for: ${pathname}`)
      }
    }
  }
  return null
}
