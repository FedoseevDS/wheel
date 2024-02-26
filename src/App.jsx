import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/layout'
import { Main } from './pages/main/main'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
