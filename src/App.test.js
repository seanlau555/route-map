import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { createStore } from './redux/store'

import App from './App'

describe('AppContainer', () => {
  it('should connect store correctly', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })
    const props = {
      token: '',
      route: {},
      isFetching: false,
      origin: '',
      destination: '',
      errorMessage: '',
      PostRoute: jest.fn()
    }
    const wrapper = mount(
      <Provider store={createStore()}>
        <App  {...props} />
      </Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
