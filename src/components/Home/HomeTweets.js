import React from 'react';
import styled from 'styled-components';

const HomeTweets = styled.div`
  display: flex;
  margin: 2%;
  width: 100%;
  height: 250px;
  border: 2px solid cadetblue;
  box-shadow: 2px 4px cadetblue;
  div:first-child {
    min-width: 150px;
    width: 150px;
    height: auto;
    flex-grow: 1;
    @media only screen and (max-width: 768px) {
      width: 150px;
      min-width: 150px;
      height: auto;
    }
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  @media only screen and (max-width: 768px) {
    width: 96%;
  }
`;

export default HomeTweets;
