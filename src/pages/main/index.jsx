import { useEffect, useMemo, useRef, useState } from 'react';

import { useGetItemsQuery } from '../../store/requests';

import { itemHeight, visibleRows } from './const';
import { Item, Link, Scroll, Wrapper } from './styles';

const Main = () => {
  const [getResults, setGetResults] = useState([]);
  const [start, setStart] = useState(0);

  const { data } = useGetItemsQuery({ page: start });

  const rootRef = useRef(null);
  const prevRangeStartRef = useRef(0);

  useEffect(() => {
    if (!data) {
      return;
    }

    setGetResults(data.results);
  }, [data]);

  const getTopHeight = useMemo(() => itemHeight * start, [start]);
  const getBottomHeight = useMemo(
    () => getResults.length - (start + visibleRows),
    [start, getResults],
  );

  useEffect(() => {
    const scrollElement = rootRef.current;

    if (!scrollElement) {
      return;
    }

    const onScroll = () => {
      const rangeStart = scrollElement.scrollTop;

      if (getResults.length === 60) {
        if (rangeStart < prevRangeStartRef.current) {
          setStart(Math.ceil(rangeStart / itemHeight));
        }

        prevRangeStartRef.current = rangeStart;
        return;
      }

      setStart(Math.ceil(rangeStart / itemHeight));
    };

    scrollElement.addEventListener('scroll', onScroll);
    return () => scrollElement.removeEventListener('scroll', onScroll);
  }, [getResults]);

  return (
    <Scroll ref={rootRef} height={itemHeight * visibleRows + 1}>
      <div style={{ height: getTopHeight }} />
      <Wrapper>
        {getResults?.slice(start, start + visibleRows + 1).map((item) => {
          const domains = item.url.split('/');
          const id = domains.length - 2;

          return (
            <Item key={item.name} height={itemHeight}>
              <Link href={domains[id]}>{item.name}</Link>
            </Item>
          );
        })}
      </Wrapper>
      <div style={{ height: getBottomHeight }} />
    </Scroll>
  );
};

export default Main;
