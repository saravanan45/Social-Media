import styled from 'styled-components';

const CommentsBody = styled.div`
  display: flex;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: ${props =>
    props.lastOfType ? '0px' : '0.5px solid cadetblue'};

  img {
    width: 70px;
    border-radius: 50%;
  }
  p {
    margin-left: 10px;
    position: relative;
    width: 100%;
    title {
      display: block;
      color: deepskyblue;
      font-size: medium;
      font-family: sans-serif;
      font-weight: 500;
      margin-bottom: 5px;
      display: block;
    }
    label {
      font-family: Arial, Helvetica, sans-serif;
    }
    div {
      display: block;
      position: absolute;
      bottom: -20px;
      right: 0px;
      font-family: Arial, Helvetica, sans-serif;
      opacity: 0.7;
    }
  }
`;

export default CommentsBody;
