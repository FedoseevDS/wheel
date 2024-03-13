import { Paragraph } from '../paragraph/paragraph';

import { description, stack } from './const';
import { Description, Template, Title } from './styles';

export const Header = () => (
  <Template>
    <Title>Тестовое задание: Колесо (бесконечный скрол + виртуализация)</Title>
    <Description>
      <Paragraph title='Стек' content={stack} />
      <Paragraph title='Задача' content={description} />
    </Description>
  </Template>
);
