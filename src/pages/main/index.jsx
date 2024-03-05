import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useGetItemsQuery } from '../../store/requests';

const Main = () => {
  const [addData, setAddData] = useState(1);

  const { data } = useGetItemsQuery({ page: addData });

  const itemHeight = 60;
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
      if (data.conunt <= data.results.length) {
        return;
      }
      if (startIndex <= 2) {
        setAddData(startIndex);
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

  return (
    <div>
      <div
        ref={scrollElementRef}
        style={{
          height: containerHeight,
          width: '1000px',
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
            const id = item.url.split('/');

            return (
              <div
                key={item.name}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  height: itemHeight,
                  boxSizing: 'border-box',
                  textDecoration: 'none',
                  fontSize: '30px',
                  color: 'black',
                  position: 'absolute',
                  top: 0,
                  transform: `translateY(${virtualItem.offsetTop}px)`,
                  textAlign: 'center',
                  padding: '5px',
                }}
              >
                <Link
                  to={id[id?.length - 2]}
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    width: '400px',
                    alignSelf: 'center',
                    borderRadius: '15px',
                    boxShadow: '0 0 8px 3px #e27f7f',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#d07a73')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '')}
                >
                  {item.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;
