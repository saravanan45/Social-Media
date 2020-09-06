import styled from 'styled-components';

const CommentsFrame = styled.div`
  width: 600px;
  @media only screen and (max-width: 768px) {
    width: 550px;
  }
  @media only screen and (max-width: 576px) {
    width: 350px;
  }
`;

export default CommentsFrame;
