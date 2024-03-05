import styled from 'styled-components';

import { Paragraph } from '../common/paragraph';

const stack = 'React, redux, react-router, styled-components';
const description =
  'Приложение с загрузкой дынных с любого mock api, деталкой для каждой записи и бесконечным скроллом + виртуализацией, на странице должно отображаться не более 10 записей, в деталке может отображаться любая информация';

const Template = styled.div`
  border-bottom: 1px solid;
  margin-bottom: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  align-self: center;
  margin: 0;
  text-align: center;
  margin-bottom: 10px;
  width: 1000px;
`;

const Description = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  width: 1000px;
`;

export const Header = () => {
  return (
    <Template>
      <Title>Тестовое задание: Колесо (бесконечный скрол + виртуализация)</Title>
      <Description>
        <Paragraph title='Стек' content={stack} />
        <Paragraph title='Задача' content={description} />
      </Description>
    </Template>
  );
};
