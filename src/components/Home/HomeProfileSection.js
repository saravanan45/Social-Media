import styled from 'styled-components';

const HomeProfileSection = styled.div`
  order: 2;
  height: fit-content;
  flex-grow: 1;
  width: 30%;
  margin: 2%;
  margin-left: 35px;
  border: 2px solid cadetblue;
  box-shadow: 2px 4px cadetblue
  position: relative;
  @media only screen and (max-width: 576px) {
    display: ${props => (props.display ? 'block' : 'none')};
    width: 86%;
    margin-left: 10px;
  }
  @media only screen and (max-width: 768px) {
    display: ${props => (props.display ? 'block' : 'none')};
    width: 94%;
    margin-left: 8px;
  }
`;

export default HomeProfileSection;
