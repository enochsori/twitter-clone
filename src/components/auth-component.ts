import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  width: 420px;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Title = styled.h1`
  font-size: 42px;
`;
export const Form = styled.form`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 15px;
  border: none;
  font-size: 16px;

  &[type='submit'] {
    cursor: pointer;
    transition: all 200ms ease-in;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const ErrorMessage = styled.span`
  font-weight: 600;
  color: tomato;
  margin-top: 20px;
  text-align: center;
`;

export const Switcher = styled.div`
  margin-top: 20px;
  a {
    color: #1d9bf0;
  }
`;
