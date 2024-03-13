import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from './components/header';
import Main from './pages/main';
import { Pokemon } from './pages/pokemon/pokemon';
import store from './store';
import { Template } from './styles';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Template>
        <Header />
        <Routes>
          <Route path='/wheel/*' element={<Main />} />
          <Route path='/wheel/:id' element={<Pokemon />} />
        </Routes>
      </Template>
    </BrowserRouter>
  </Provider>
);

export default App;
