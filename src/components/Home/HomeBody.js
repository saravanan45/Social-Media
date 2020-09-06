import React from 'react';
import styled from 'styled-components';

const HomeBody = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 576px) {
    display: block;
  }
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

export default HomeBody;
