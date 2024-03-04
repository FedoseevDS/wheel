import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { Link } from 'react-router-dom';

import { useGetItemsQuery } from '../../store/requests';

const Main = () => {
  const [addData, setAddData] = useState(1);

  const { data } = useGetItemsQuery({ page: addData });

  console.log('data', data);

  const itemHeight = 100;
  const containerHeight = 600;
  const overscan = 3;

  const [listItems, setListItems] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);

  const scrollElementRef = useRef(null);

  useEffect(() => {
    if (data) {
      setListItems(data?.results);
    }
  }, [data]);

  useLayoutEffect(() => {
    const scrollElement = scrollElementRef.current;

    if (!scrollElement) {
      return;
    }

    const scrollHandler = () => {
      const scrollTop = scrollElement.scrollTop;

      setScrollTop(scrollTop);
    };

    scrollHandler();

    scrollElement.addEventListener('scroll', scrollHandler);
    return () => scrollElement.removeEventListener('scroll', scrollHandler);
  }, []);

  const virtualItems = useMemo(() => {
    const rangeStart = scrollTop;
    const rangeEnd = scrollTop + containerHeight;

    let startIndex = Math?.floor(rangeStart / itemHeight);
    let endIndex = Math?.ceil(rangeEnd / itemHeight);

    if (startIndex) {
      if (data.conunt < data.results.length) {
        return;
      }

      setAddData(startIndex + 1);
    }
    startIndex = Math.max(0, startIndex - overscan);
    endIndex = Math.min(listItems.length - 1, endIndex + overscan);

    const virtualItems = [];

    for (let index = startIndex; index <= endIndex; index++) {
      virtualItems.push({
        index,
        offsetTop: index * itemHeight,
      });
    }

    return virtualItems;
  }, [scrollTop, listItems, data]);

  const totalListHeight = itemHeight * listItems.length;

  // const selectedIds = useMemo((item) => {
  //   const id = item?.split('/');
  //   setDetailsLink(id[id?.length - 2]);
  // }, []);

  return (
    <div>
      <div
        ref={scrollElementRef}
        style={{
          height: containerHeight,
          width: '400px',
          overflow: 'auto',
          marginTop: '50px',
          marginLeft: 'auto',
          marginRight: 'auto',
          position: 'relative',
        }}
      >
        <div style={{ height: totalListHeight, display: 'flex', flexDirection: 'column' }}>
          {virtualItems?.map((virtualItem) => {
            const item = listItems[virtualItem.index];

            return (
              <div
                key={item.name}
                style={{
                  display: 'inline-block',
                  height: itemHeight,
                  boxSizing: 'border-box',
                  width: '80%',
                  textDecoration: 'none',
                  fontSize: '30px',
                  color: 'black',
                  position: 'absolute',
                  top: 0,
                  transform: `translateY(${virtualItem.offsetTop}px)`,
                  cursor: 'pointer',
                  textAlign: 'center',
                  padding: '20px',
                }}
              >
                <Link style={{ border: '1px solid' }}>{item.name}</Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;
