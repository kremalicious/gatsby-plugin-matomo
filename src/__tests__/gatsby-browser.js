/**
 * @jest-environment jsdom
 */

import { onRouteUpdate } from '../gatsby-browser'

jest.useFakeTimers()

describe('gatsby-plugin-matomo', () => {
  describe('gatsby-browser', () => {
    beforeEach(() => {
      jest.spyOn(global, 'setTimeout')
      window._paq = { push: jest.fn() }
    })

    afterEach(() => {
      jest.clearAllTimers()
    })

    describe('onRouteUpdate', () => {
      describe('in non-production env', () => {
        beforeAll(() => {
          window._paq = { push: jest.fn() }
        })

        it('does not send page view', () => {
          onRouteUpdate({}, {})
          expect(window._paq.push).not.toHaveBeenCalled()
        })

        it('sends page view in dev mode', () => {
          window.dev = true
          onRouteUpdate({}, {})
          expect(window._paq.push).toHaveBeenCalledTimes(1)
        })
      })

      describe('in production env', () => {
        let env

        beforeAll(() => {
          env = process.env.NODE_ENV
          process.env.NODE_ENV = 'production'
        })

        afterAll(() => {
          process.env.NODE_ENV = env
        })

        // it('does not send page view when _paq is undefined', () => {
        //   delete window._paq
        //   onRouteUpdate({}, {})
        //   // jest.runOnlyPendingTimers()
        //   expect(setTimeout).not.toHaveBeenCalled()
        // })

        it('sends page view', () => {
          onRouteUpdate({}, {})
          jest.runAllTimers()
          expect(window._paq.push).toHaveBeenCalledTimes(5)
        })

        it('uses setTimeout with a minimum delay of 32ms', () => {
          onRouteUpdate({}, {})
          jest.runOnlyPendingTimers()
          expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 32)
          expect(window._paq.push).toHaveBeenCalledTimes(5)
        })
      })
    })
  })
})
