import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #455360;
  padding: 12px 15px;
  text-align: center;
`;

const Footer = () => (
  <FooterContainer>
    <h4>This is the footer</h4>
  </FooterContainer>
);

export default Footer;
