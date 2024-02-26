import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/layout'
import { Main } from './pages/main/main'
import { Provider } from 'react-redux'
import { store } from './store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Main />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  )
}

export default App
