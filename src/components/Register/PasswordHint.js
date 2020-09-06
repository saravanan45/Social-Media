import React from 'react';
import styled from 'styled-components';

const PasswordHint = styled.div`
  font-weight: 600;
  background: aliceblue;
  border-radius: 5px;
  margin-left: 2px;
  max-width: 250px;
  color: ${props => (props.valid ? 'green' : 'red')};
  span {
    margin-right: 10px;
  }
`;

export default PasswordHint;
