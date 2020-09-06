import React from 'react';
import styled from 'styled-components';

const CommentTweetOptions = styled.div`
  display: flex;
  margin-top: 10px;
  position: relative;
  bottom: 30px;
  label {
    display: flex;
    white-space: nowrap;
  }

  @media only screen and (max-width: 576px) {
    display: block;
    padding: 10px;
    label {
      padding: 0 !important;
    }
  }
`;

export default CommentTweetOptions;
