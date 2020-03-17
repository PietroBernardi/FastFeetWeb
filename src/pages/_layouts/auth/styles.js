import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #7159c1, #4e2f8a);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  height: 425px;
  max-width: 360px;
  text-align: center;
  padding: 30px 20px;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    strong {
      font-size: 14px;
      font-weight: bold;
      color: #444;
      align-self: flex-start;
      margin: 10px 0 5px;
    }

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 46px;
      padding: 0 15px;
      margin: 0 0 10px;
      color: #444;

      &::placeholder {
        color: #999;
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #7159c1;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 14px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#7159c1')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 14px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
