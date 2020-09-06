import React from 'react';
import styled from 'styled-components';

const HomeOptions = styled.div`
  display: flex;
  margin-top: 10px;
  position: absolute;
  bottom: 30px;
  label {
    display: flex;
    white-space: nowrap;
  }

  @media only screen and (max-width: 576px) {
    display: block;
    label {
      padding: 0 !important;
    }
  }
`;

export default HomeOptions;
