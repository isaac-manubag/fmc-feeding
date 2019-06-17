import React from "react";
import Fab from "@material-ui/core/Fab";
import Add from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: 0,
    top: "auto",
    right: 40,
    bottom: 20,
    position: "fixed"
  }
}));

export default function({ add }) {
  const classes = useStyles();

  return (
    <Fab className={classes.fab} color="primary" onClick={add}>
      <Add />
    </Fab>
  );
}
