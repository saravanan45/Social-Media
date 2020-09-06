import React from 'react';
import styled from 'styled-components';
import ocean from '../../Images/ocean.jpg';

const ScreenBackground = styled.div`
  background: url(${ocean}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
`;

export default ScreenBackground;
