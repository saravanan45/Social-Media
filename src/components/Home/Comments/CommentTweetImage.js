import styled from 'styled-components';

const CommentTweetImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 150px;
    height: 200px;
    border-radius: 50%;
  }
  @media only screen and (max-width: 576px) {
    max-width: 220px;
    margin: 0 auto;
    margin-top: 10px;
  }
`;

export default CommentTweetImage;
