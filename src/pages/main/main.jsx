import { useEffect, useRef, useState } from "react"

import { useAddItemQuery, useGetItemsQuery } from "../../store/requests";

import styles from './styles.module.scss';
import { Link } from "react-router-dom";

export const Main = () => {
  const [fullData, setFullData] = useState([])
  const [url, setUrl] = useState('');
  const [page, setPage] = useState(1)
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [isScrollUp, setIsScrollUp] = useState(false);
  const { data } = useGetItemsQuery({ limit: 20 }, { skip: page > 1 })
  const { data: addData } = useAddItemQuery({ limit: 1, page }, { skip: page === 1 })

  // const scrollUp = useRef(false)
  // const scrollDown = useRef(false)
  // console.log('ref', ref);
  // useEffect(() => {
  //   console.log('scrollUp', scrollUp);
  //   console.log('scrollDown', scrollDown);
  // }, [scrollUp, scrollDown])

  // console.log('addData', addData);
  // console.log('data', data);

  const newData = fullData?.length > 20 ? fullData : data?.results

  // console.log('newData', newData);


  // TODO: попробовать заменить two useEffect on useMemo

  useEffect(() => {
    setFullData(data?.results)
  }, [data])

  useEffect(() => {
    setFullData((prev) => prev && addData ? [...prev, ...addData.results] : [])
    // setFullData((prev) => prev && addData ? [...addData.results] : [])
  }, [addData])

  useEffect(() => {
    // if (fullData?.length > 80) {
    //   return
    // }
    if (isScrollDown) {
      // setPage((prev) => prev < 20 ? prev + 1 : prev)
      setPage((prev) => prev + 1)
      // setFullData((prev) => console.log('prev', prev))
      setIsScrollDown(false)
    }
  }, [isScrollDown, data, addData, fullData])

  useEffect(() => {
    if (isScrollUp) {
      setPage((prev) => prev > 0 ? prev - 1 : prev)
      setIsScrollUp(false)
    }
  }, [isScrollUp])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollHandler = ({ target }) => {
    const scrollHeight = target.documentElement.scrollHeight;
    const scrollTop = target.documentElement.scrollTop;
    const innerHeight = window.innerHeight

    // ref.current.onscroll = scrollTop
    // ref.current.onscrollend = scrollHeight

    if (scrollTop <= 42) {
      setIsScrollUp(true);
      // scrollUp.target = true
    }
    if (scrollHeight - scrollTop - innerHeight < 42) {
      setIsScrollDown(true)
      // scrollDown.target = false
      // window.scrollTo(0, (scrollHeight + scrollTop));
    }
  }

  const selectedIds = (item) => () => {
    const domains = item.split('/')
    setUrl(domains[domains.length - 2])
    // return domains[domains.length - 2]
  }

  // взять размер одного элемента
  // высота контейнера
  // размер позиции скролла 
  // взять последний индекс и первый индекс, вырезать из страницы
  // буфер + 5 элементов сверху и снизу
  // поставить линтер

  return (
    <div className={styles.wrapper}>
      <div>
        <div>
          {/* {checkData?.map(( item, index ) =>  */}
          {/* {data?.results?.map(( item, index ) =>  */}
          {newData?.map((item, index) =>
            <Link key={item?.name} to={url} className={styles.cards} onClick={selectedIds(item?.url)}>
              <div>{ index + 1 }:</div>
              <span>
                {item?.name}
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}