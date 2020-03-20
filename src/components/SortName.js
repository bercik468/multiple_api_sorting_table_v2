import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.flexCenter,
    position: "relative",
    marginTop: 30,
    marginBottom: 30
  },
  title: {
    marginTop: 30
  }
}));

const SortName = props => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.title} align="center" variant="h4">
        Multiple API sorting table
      </Typography>
      <div className={classes.root}>
        <TextField
          value={props.nameFilter}
          onChange={props.setNameFilter}
          variant="outlined"
          label="enter company name"
          FormHelperTextProps={{ style: { position: "absolute", top: 55 } }}
        />
      </div>
    </>
  );
};

export default SortName;
