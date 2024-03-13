import { useParams } from 'react-router-dom';

import { useGetItemQuery } from '../../store/requests';

import { Img, Param, Photo, Template, Title, Wrapper } from './styles';

export const Pokemon = () => {
  const { id } = useParams();

  const { data = [], isLoading } = useGetItemQuery({ id });

  const specifications = (item, param) =>
    item?.reduce((prev, el) => [...prev, el[param].name], []).join(', ');

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
