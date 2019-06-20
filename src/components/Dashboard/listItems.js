import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from '../../utils/firebase';
import { logout } from '../../redux/actions/auth';

const MainListItems = ({ logout }) => {
  return (
    <div>
      <ListItem
        component={() => (
          <Link to='/kids' style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary='Kids' />
            </ListItem>
          </Link>
        )}
        button
      />

      <ListItem
        component={() => (
          <Link
            to='/staff'
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary='Staff' />
            </ListItem>
          </Link>
        )}
        button
      />

      <ListItem
        component={() => (
          <Link
            to='/schedule'
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary='Schedule' />
            </ListItem>
          </Link>
        )}
        button
      />

      <ListItem
        button
        onClick={() =>
          firebase
            .auth()
            .signOut()
            .then(
              () => {
                logout();
                window.location.reload();
              },
              error => {
                console.error('Sign Out Error', error);
              },
            )
        }
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary='Logout' />
      </ListItem>
    </div>
  );
};

const mapDispatchToProps = {
  logout,
};

export default connect(
  null,
  mapDispatchToProps,
)(MainListItems);
