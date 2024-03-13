import { Header } from '../header/header';

import { Template } from './styles';

export const Layout = ({ children }) => (
  <Template>
    <Header />
    {children}
  </Template>
);
