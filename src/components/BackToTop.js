import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useScrollTrigger, Zoom, Fab } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
    zIndex: 1
  },
  icon: {
    "&:hover": { color: "gold" }
  }
}));

const BackToTop = () => {
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100
  });

  const scrollToTop = e => {
    e.stopPropagation();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <Zoom in={trigger}>
      <div className={classes.root}>
        <Fab size="small" color="primary" onClick={e => scrollToTop(e)}>
          <KeyboardArrowUpIcon className={classes.icon} />
        </Fab>
      </div>
    </Zoom>
  );
};

export default BackToTop;
