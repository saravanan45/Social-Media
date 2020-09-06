import React from 'react';
import styled from 'styled-components';

const PasswordField = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  i {
    position: absolute;
    padding: 9px;
  }
  input {
    width: 215px;
    height: 30px;
    border-radius: 8px;
    padding-left: 35px;
    font-size: 17px;
    outline: none;
    border-color: ${props => (props.error == 'error' ? 'red' : 'black')};
  }
  label {
    position: relative;
    right: 36px;
  }
`;

export default PasswordField;
