import styled from 'styled-components';

const CommentMessageBody = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  width: 90%;
  position: relative;
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
    height: fit-content;
  }
  @media only screen and (max-width: 576px) {
    margin-left: 0px;
    width: 100%;
    title {
      text-align: center;
      margin-bottom: 0px;
    }
    title + label {
      width: fit-content;
      height: fit-content;
      padding: 10px;
      margin-bottom: 10px;
    }
  }
`;

export default CommentMessageBody;
