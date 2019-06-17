import React from "react";
import styled from "styled-components";
import RightPane from "./righPane";
import LeftPane from "./leftPane";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export default () => {
  return (
    <Container>
      <LeftPane />
      <RightPane />
    </Container>
  );
};
