import { useEffect, useState } from "react"

import { useAddDataQuery, useGetItemsQuery, useItemDetailQuery } from "../../store/requests";

import styles from './styles.module.scss';
import { Link } from "react-router-dom";

export const Main = () => {
  const [url, setUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(1)
  const [nextList, setNextList] = useState(false)
  const [previousList, setPreviousList] = useState(false)
  const [checkData, setCheckData] = useState([])
  
  const { data = {} } = useGetItemsQuery({ pageSize: 20 });
  const { data: addData = {}, status } = useAddDataQuery({ pageSize: 20, page: currentPage > 1 ? currentPage : null})

  console.log('currentPage', currentPage);
  console.log('addData', addData);
  console.log('status', status);
  // console.log('checkData', checkData);

  useEffect(() => {
    // if (checkData?.length >= addData.count) {
    if (checkData?.length >= 50) {
      return;
    }
    if (addData && status === 'fulfilled') {
      setCheckData((prev) => [...prev, ...addData.results])  
      return;
    }

    // if (data && status === 'fulfilled') {
    setCheckData(data.results)  
    // }
    // setCheckData((prev) => console.log('prev', prev))
  }, [setCheckData, checkData, status, addData])

  // const fullData = []
  // fullData.concat([...fullData, checkData])

  // console.log('fullData', fullData);

  useEffect(() => {
    if (nextList) {
      setCurrentPage((prev) => prev + 1);
      setNextList(false);
    }
    // if (previousList) {
    //   setCurrentPage((prev) => prev - 1);
    //   setPreviousList(false)
    // }
  }, [nextList, previousList])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => document.removeEventListener('scroll', scrollHandler);
  }, [])

  const scrollHandler = ({ target }) => {
    const scrollHeight = target.documentElement.scrollHeight;
    const scrollTop = target.documentElement.scrollTop;
    const innerHeight = window.innerHeight

    // console.log('scrollHeight', scrollHeight);
    // console.log('scrollTop', scrollTop);
    // console.log('innerHeight', innerHeight);

    if (scrollHeight - (scrollTop + innerHeight) <= 1) {
      setNextList(true)
      return
    }

    // if (currentPage > 1 && scrollTop === 0) {
    //   setPreviousList(true);
    //   return
    // }
  }

  const onUrlHandler = (item) => () => {
    const domains = item.split('/')
    setUrl(domains[domains.length - 2])
  }
  
  return (
    <div className={styles.wrapper}>
      <div>
        <div>
          {/* {(data?.results?.concat(addData?.results))?.map(( item, index ) =>  */}
          {checkData?.map(( item, index ) => 
            <Link key={item?.name} to={url} className={styles.cards} onClick={onUrlHandler(item?.url)}>
              {/* <div className={styles.cards} onClick={onUrlHandler(item.url)}> */}
                <div>{index + 1}:</div>
                <span>
                  {item?.name}
                </span>
              {/* </div> */}
            </Link>
          )}
        </div>
      {/* {isOpenDetail && url && detail()} */}
      </div>
    </div>
  )
}