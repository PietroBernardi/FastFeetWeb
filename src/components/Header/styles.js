import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid #eee;
      max-width: 200px;
    }

    a {
      font-weight: bold;
      color: #79797a;
      margin: 8px;
    }
  }
  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 10px;
  padding-left: 40px;
  border-left: 1px solid #eee;

  div {
    text-align: center;
    margin-right: 10px;
    align-items: center;

    strong {
      display: flex;
      color: #79797a;
    }

    button {
      margin-top: 5px;
      color: #e60202;
      background: none;
      border: none;
    }
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;
