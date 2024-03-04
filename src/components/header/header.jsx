import styles from './styles.module.scss';

const stack = 'React, redux, react-router, styled-components';
const description =
  'Приложение с загрузкой дынных с любого mock api, деталкой для каждой записи и бесконечным скроллом + виртуализацией, на странице должно отображаться не более 10 записей, в деталке может отображаться любая информация';

export const Header = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Тестовое задание: Колесо</h1>
      <div className={styles.description}>
        <div>
          <div>
            <span>Стек:</span>
          </div>
          <div>
            <span>{stack}</span>
          </div>
        </div>
        <div>
          <div>
            <span>Задача:</span>
          </div>
          <div>
            <span>{description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
