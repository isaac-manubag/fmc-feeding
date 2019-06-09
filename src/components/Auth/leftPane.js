import React from 'react';
import styled from 'styled-components';

const LeftPane = styled.div`
  background-color: red;
  flex: 1;
  background: url(/assets/images/3907.jpg) no-repeat top;
  background-size: cover;
  position: relative;
  display: none;

  a {
    color: white;
    position: absolute;
    bottom: 5px;
    left: 10px;
    text-decoration: none;
    font-size: 0.5rem;
  }

  @media (min-width: 768px) {
    display: inherit;
  }
`;

export default () => {
  return (
    <LeftPane>
      <a href="https://www.freepik.com/free-photos-vectors/people">
        People photo created by jcomp - www.freepik.com
      </a>
    </LeftPane>
  );
};
