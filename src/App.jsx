import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout/layout';
import Main from './pages/main';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* <Route path='/' element={<Main />} /> */}
            <Route path='/' element={<Main />} />
            <Route path='/:id' element={<div>Деталка</div>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
