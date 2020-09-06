import styled from 'styled-components';

const CommentTweetContainer = styled.div`
  margin: 2%;
  width: 100%;
  height: fit-content;
  border: 2px solid cadetblue;
  @media only screen and (max-width: 576px) {
    height: fit-content;
    width: fit-content;
    margin: 0%;
  }
`;

export default CommentTweetContainer;
