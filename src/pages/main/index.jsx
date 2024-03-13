import { useEffect, useMemo, useRef, useState } from 'react';

import { useGetItemsQuery } from '../../store/requests';

import { containerHeight, itemHeight, overscan } from './const';
import { Item, Link, Scroll, Wrapper } from './styles';

const Main = () => {
  const [addData, setAddData] = useState(1);

  const { data } = useGetItemsQuery({ page: addData });

  const [listItems, setListItems] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);

  const scrollElementRef = useRef(null);

  useEffect(() => {
    if (data) {
      setListItems(data?.results);
    }
  }, [data]);

  useEffect(() => {
    const scrollElement = scrollElementRef.current;

    if (!scrollElement) {
      return;
    }

    const scrollHandler = () => {
      setScrollTop(scrollElement.scrollTop);
    };

    scrollHandler();

    scrollElement.addEventListener('scroll', scrollHandler);
    // eslint-disable-next-line consistent-return
    return () => scrollElement.removeEventListener('scroll', scrollHandler);
  }, []);

  const virtualItems = useMemo(() => {
    const rangeStart = scrollTop;
    const rangeEnd = scrollTop + containerHeight;

    let startIndex = Math?.floor(rangeStart / itemHeight);
    let endIndex = Math?.ceil(rangeEnd / itemHeight);

    if (startIndex) {
      if (data.conunt <= data.results.length) {
        return [];
      }
      if (startIndex <= 2) {
        setAddData(startIndex);
        return [];
      }
      setAddData(startIndex + 1);
    }
    startIndex = Math.max(0, startIndex - overscan);
    endIndex = Math.min(listItems.length - 1, endIndex + overscan);

    const collectorVirtualItems = [];

    for (let index = startIndex; index <= endIndex; index++) {
      collectorVirtualItems.push({
        index,
        offsetTop: index * itemHeight,
      });
    }

    return collectorVirtualItems;
  }, [scrollTop, listItems, data]);

  const totalListHeight = itemHeight * listItems.length;

  return (
    <Scroll ref={scrollElementRef} height={containerHeight}>
      <Wrapper height={totalListHeight}>
        {virtualItems?.map((virtualItem) => {
          const item = listItems[virtualItem.index];
          const domains = item.url.split('/');
          const id = domains.length - 2;

          return (
            <Item key={item.name} height={itemHeight} value={virtualItem.offsetTop}>
              <Link href={domains[id]}>{item.name}</Link>
            </Item>
          );
        })}
      </Wrapper>
    </Scroll>
  );
};

export default Main;
