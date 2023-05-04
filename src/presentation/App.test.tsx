import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../Infrastructure/state/app/store'
import App from './App'

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  expect(getByText(/learn/i)).toBeInTheDocument()
})
