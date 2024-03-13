import styled from 'styled-components';

export const Scroll = styled.div`
  height: ${({ height }) => `${height}px`};
  width: 1000px;
  overflow: auto;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

export const Wrapper = styled.div`
  height: ${({ height }) => `${height}px`};
  display: flex;
  flex-direction: column;
`;

export const Item = styled.div`
  display: flex;
  justify-content: center;
  height: ${({ height }) => `${height}px`};
  box-sizing: border-box;
  text-decoration: none;
  font-size: 30px;
  color: black;
  position: absolute;
  top: 0;
  transform: translateY(${(e) => `${e.value}px`});
  text-align: center;
  padding: 5px;
`;

export const Link = styled.a`
  text-decoration: none;
  color: black;
  width: 400px;
  align-self: center;
  border-radius: 15px;
  box-shadow: 0 0 8px 3px #e27f7f;
  cursor: pointer;

  &:hover {
    background-color: #d07a73;
  }
`;
