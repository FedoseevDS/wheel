import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useGetIdItemsQuery } from '../../store/requests';

export const Pokemon = () => {
  const { id } = useParams();

  console.log('id component', id);

  const { data = [], isLoading } = useGetIdItemsQuery({ id });

  console.log('data', data);

  const specifications = (item, param) => {
    return item
      ?.reduce((prev, el) => {
        return [...prev, el[param].name];
      }, [])
      .join(', ');
  };

  const Template = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const Wrapper = styled.div`
    width: 1000px;
  `;

  const Title = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 10px;
    font-size: 45px;
    font-weight: 900;
    margin-bottom: 20px;
  `;

  const Photo = styled.div`
    display: flex;
    justify-content: center;
  `;

  const Img = styled.img`
    height: 140px;
    margin-bottom: 20px;
  `;

  const Param = styled.div`
    font-size: 25px;
    margin-bottom: 10px;
  `;

  return (
    <Template>
      {isLoading ? (
        <div>...Загрузка</div>
      ) : (
        <Wrapper>
          <Title>
            <span>{data.name}</span>
          </Title>
          <Photo>
            <Img src={data.sprites?.front_default} alt='покемон' />
            <Img src={data.sprites?.back_default} alt='покемон' />
            <Img src={data.sprites?.front_shiny} alt='покемон' />
            <Img src={data.sprites?.back_shiny} alt='покемон' />
          </Photo>
          <Param>
            <span>Способности: </span>
            <span>{specifications(data.abilities, 'ability')}</span>
          </Param>
          <Param>
            <span>Тип: </span>
            <span>{specifications(data.types, 'type')}</span>
          </Param>
        </Wrapper>
      )}
    </Template>
  );
};
