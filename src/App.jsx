import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { Layout } from './components/layout/layout'
import { store } from 'store';

import { Main } from 'pages/main/main';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <Layout> */}
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route path='/:id' element={<div>Деталка</div>} />
        </Routes>
        {/* </Layout> */}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
