import styled from 'styled-components';

export const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${props =>
    props.loading ? 'rgba(255, 255, 255, 0.5)' : ''};
  position: ${props => (props.loading ? 'fixed' : '')};
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
`;
