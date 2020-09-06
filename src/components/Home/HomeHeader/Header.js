import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  border: 2px solid black;
  overflow: hidden;
  background-color: lightskyblue;
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;

  h2 {
    margin-left: 30px;
  }
  span {
    margin: 0 auto;
    display: flex;
    align-items: center;
    span {
    }
  }
  label {
    cursor: pointer;
  }
  i {
    margin-left: 50px;
    color: black;
    @media only screen and (max-width: 768px) {
      margin-left: 30px;
    }
  }
  p {
    cursor: pointer;
    margin-right: 65px;
    display: flex;
    align-items: center;

    @media only screen and (min-width: 768px) {
      display: none;
    }
  }
`;
export default Header;
