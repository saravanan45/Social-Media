import React from 'react';
import styled from 'styled-components';

const ProfileOutline = styled.div`
  margin-top: 20px;
  div {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    input {
      display: none;
    }
    i {
      position: absolute;
      right: 0;
      bottom: 0;
      color: deepskyblue;
      cursor: pointer;
    }
  }

  p {
    display: block;
    font-size: larger;
    text-align: center;
    color: deepskyblue;
    font-weight: 600;
    margin-top: 10px;
  }
  label {
    display: block;
    text-align: center;
    margin-bottom: 10px;
    margin-top: 10px;
    i {
      margin-right: 10px;
    }
  }

  span {
    position: relative;
    right: 0px;
    bottom: 0;
    color: deepskyblue;
    margin: 10px;
    cursor: pointer;
    float: right;
  }
  dl {
    text-align: center;
    margin-bottom: 10px;
  }
  @media only screen and (max-width: 768px) {
    span {
      right: 30px;
      bottom: 45px;
    }
  }
`;

export default ProfileOutline;
