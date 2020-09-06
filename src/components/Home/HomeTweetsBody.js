import React from 'react';
import styled from 'styled-components';

const HomeTweetsBody = styled.div`
  padding: 20px;
  position: relative;
  flex-grow: 4;
  title {
    color: deepskyblue;
    font-size: x-large;
    font-family: sans-serif;
    font-weight: 600;
    margin-bottom: 20px;
    display: block;
  }
  label {
    font-family: Arial, Helvetica, sans-serif;
    font-size: large;
    font-weight: 500;
    padding: 10px 20px 10px 0px;
    display: block;
  }
  title + label {
    overflow-y: auto;
    width: 100%;
    height: 70px;
  }
  @media only screen and (max-width: 576px) {
    title {
      margin-bottom: 5px;
    }
  }
  @media only screen and (max-width: 768px) {
    title {
      margin-bottom: 10px;
    }
  }
`;

export default HomeTweetsBody;
