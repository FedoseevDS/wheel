import { useEffect, useState } from "react";
import { useGetItemsQuery, useItemDetailQuery } from "../../store/requests";

import styles from './styles.module.scss';

export const Main = () => {
  const [url, setUrl] = useState('');
  const [isOpenDetail, setIsOpenDetail] = useState(null);
  // const [page, setPage] = useState('');

  const { data=[] } = useGetItemsQuery({ pageSize: 20, page: 1 });
  // const { data=[] } = useGetItemsQuery();
  const { data: detailItem = [] } = useItemDetailQuery({ url });

  
  const checkPosition = () => {
    const height = document.body.offsetHeight;
    console.log('height', height);
    const screenHeight = window.innerHeight;
    console.log('screenHeight', screenHeight);
    const scrolled = window.scrollY
    console.log('scrolled', scrolled);
    const threshold = height - screenHeight / 3
    console.log('threshold', threshold);
    const position = scrolled + screenHeight
    console.log('position', position);


    if (position >= threshold) {
      console.log('works!!!')
    }
  }
  
  useEffect(() => {
    checkPosition()
  }, [checkPosition])

  const specifications = (item, param) => {
    return item?.reduce((prev, el) => {
      return [...prev, el[param].name] 
    }, []).join(', ')
  }

  const detail = () => {
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

  const onOpenDetailHandler = (item) => () => {
    setUrl(item)
    setIsOpenDetail((v) => url !== item ? v : !v)
  }
  
  return (
    <div className={styles.wrapper}>
      <div>
        <div>
          {data?.results?.map(( item, index ) => 
            <div key={item.name} className={styles.cards} onClick={onOpenDetailHandler(item.url)}>
              <div>{index + 1}:</div>
              <span>
                {item.name}
              </span>
            </div>
          )}
        </div>
      {isOpenDetail && url && detail()}
      </div>
    </div>
  )
}