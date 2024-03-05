import { Header } from '../header/header';

export const Layout = ({ children }) => {
  return (
    <div style={{ paddingLeft: '80px', paddingRight: '80px' }}>
      <Header />
      {children}
    </div>
  );
};
