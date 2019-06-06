import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #455360;
  padding: 12px 15px;
  text-align: center;
`;

const PoweredByFishbulb = styled.a`
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
`;

const PoweredByFishbulbText = styled.span`
  margin: 0;
  line-height: 23px;
  vertical-align: middle;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
`;

const FBLogo = styled.img`
  margin-left: 0.75rem;
  vertical-align: middle;
`;

const Footer = () => (
  <FooterContainer>
    <PoweredByFishbulb href="https://www.fishbulb.com.au">
      <PoweredByFishbulbText>Powered By Fishbulb</PoweredByFishbulbText>
      <FBLogo src="http://dev.ets.com/images/fishbulb-footer-logo.png" alt="" />
    </PoweredByFishbulb>
  </FooterContainer>
);

export default Footer;
