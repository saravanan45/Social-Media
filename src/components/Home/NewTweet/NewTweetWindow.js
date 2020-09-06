import styled from 'styled-components';

const NewTweetWindow = styled.div`
  width: 500px;
  @media only screen and (max-width: 768px) {
    width: 400px;
  }
  @media only screen and (max-width: 567px) {
    width: 300px;
  }
`;

export default NewTweetWindow;
