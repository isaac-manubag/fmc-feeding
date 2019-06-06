import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { logout } from '../../redux/actions/auth';

const Nav = styled.nav`
  background: #373744;
  height: 5.625rem;
  display: none;
  align-items: center;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const UnorderList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
`;
const ListItem = styled.li`
  display: inline;
`;

const StyledLink = styled(Link)`
  color: #fff;
  padding-left: 4rem;
  text-decoration: none;
  &:hover {
    color: #00b3e6;
  }
`;

const config = [
  { to: '/', name: 'Home' },
  { to: '/page1', name: 'Page1' },
  { to: '/page2', name: 'Page2' },
];

class Header extends React.Component {
  render() {
    return (
      <Nav>
        <UnorderList>
          {config.map(item => (
            <ListItem key={item.name}>
              <StyledLink to={item.to}>{item.name}</StyledLink>
            </ListItem>
          ))}
        </UnorderList>
      </Nav>
    );
  }
}

Header.propTypes = {
  client: PropTypes.object,
  logout: PropTypes.func,
};

const mapDispatchToProps = {
  logout,
};

export default connect(
  null,
  mapDispatchToProps,
)(Header);
