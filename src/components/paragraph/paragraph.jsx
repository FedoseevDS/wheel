import { Template, WrapperTitle, TitleText } from './styles';

export const Paragraph = ({ title, content }) => (
  <Template>
    <WrapperTitle>
      <TitleText>{title}:</TitleText>
    </WrapperTitle>
    <div>
      <span>{content}</span>
    </div>
  </Template>
);
