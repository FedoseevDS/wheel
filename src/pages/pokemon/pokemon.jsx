import { useItemDetailQuery } from '../../store/requests';
import styles from './styles.module.scss';

export const Pokemon = () => {
  const { data: detailItem = [] } = useItemDetailQuery();

  const specifications = (item, param) => {
    return item?.reduce((prev, el) => {
      return [...prev, el[param].name] 
    }, []).join(', ')
  }

  return (
    <div className={styles.detail}>
      <div className={styles.title}>
        <span>{detailItem.name}</span>
      </div>
      <div className={styles.photo}>
        <img src={detailItem.sprites?.front_default} alt="покемон" />
        <img src={detailItem.sprites?.back_default} alt="покемон" />
        <img src={detailItem.sprites?.front_shiny} alt="покемон" />
        <img src={detailItem.sprites?.back_shiny} alt="покемон" />
      </div>
      <div className={styles.param}>
        <span>Способности: </span>
        <span>
          {specifications(detailItem.abilities, 'ability')}
        </span>
      </div>
      <div className={styles.param}>
        <span>Тип: </span>
        <span>{specifications(detailItem.types, 'type')}</span>
      </div>
    </div>
  )
}