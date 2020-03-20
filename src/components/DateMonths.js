import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  button: {
    marginTop: 20,
    "&:hover": { color: "gold" }
  }
}));

const DateMonths = props => {
  const classes = useStyles();

  return (
    <>
      <form className={classes.container} noValidate>
        <TextField
          id="dateFrom"
          label="Date from"
          type="date"
          value={props.date.newDateFrom}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          onChange={props.date.setDateFrom}
        />
        <TextField
          id="dateTo"
          label="Date to"
          type="date"
          value={props.date.newDateTo}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          onChange={props.date.setDateTo}
        />
      </form>
      <Button
        className={classes.button}
        onClick={props.onChangeDate}
        color="primary"
        variant="contained"
      >
        Set date
      </Button>
    </>
  );
};

export default DateMonths;
