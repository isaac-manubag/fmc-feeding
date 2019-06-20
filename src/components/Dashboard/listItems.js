import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from '../../utils/firebase';
import { logout } from '../../redux/actions/auth';

const MainListItems = ({ logout }) => {
  return (
    <div>
      <ListItem
        component={React.forwardRef((props, ref) => (
          <RouterLink innerRef={ref} to='/kids' {...props} />
        ))}
        button
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Kids' />
      </ListItem>

      <ListItem
        component={React.forwardRef((props, ref) => (
          <RouterLink innerRef={ref} to='/staff' {...props} />
        ))}
        button
      >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary='Staff' />
      </ListItem>

      <ListItem
        component={React.forwardRef((props, ref) => (
          <RouterLink innerRef={ref} to='/schedule' {...props} />
        ))}
        button
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary='Schedule' />
      </ListItem>

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
