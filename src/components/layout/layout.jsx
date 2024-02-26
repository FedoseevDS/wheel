import { Header } from "../header/header";

import styles from './styles.module.scss';

export const Layout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      {children}
    </div>
  )
}