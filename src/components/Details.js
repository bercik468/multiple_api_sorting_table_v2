import React from "react";
import DateMonths from "./DateMonths";
import Chart from "./Chart";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Slide,
  IconButton,
  DialogTitle
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    pading: 8,
    color: theme.palette.grey[500]
  },
  dialog: {
    zIndex: 3000
  }
}));

export default function Details(props) {
  const classes = useStyles();
  const { id, name, city, incomes, allIncomes } = props.dataOpen;
  const { newIncomes, newAllIncomes, whatIncomes } = props;

  const filterLastMonths = () => {
    if (typeof incomes === "object") {
      incomes.sort(function(a, b) {
        return Date.parse(b.date) - Date.parse(a.date);
      });
      const filterMonth = incomes
        .filter(
          income =>
            incomes[0].date.substring(0, 7) === income.date.substring(0, 7)
        )
        .map(data => parseFloat(data.value))
        .reduce(function(a, b) {
          return a + b;
        }, 0)
        .toFixed(2);
      return filterMonth;
    }
  };

  return (
    <div className={classes.dialog}>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{ style: {} }}
      >
        <DialogTitle id="customized-dialog-title">Company details</DialogTitle>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={props.toggleDetails}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText>{`ID: ${id}`}</DialogContentText>
          <DialogContentText>{`NAME: ${name}`}</DialogContentText>
          <DialogContentText>{`CITY: ${city}`}</DialogContentText>
          <DialogContentText>
            {whatIncomes === 0
              ? `Total incomes: ${allIncomes}`
              : `Total incomes: ${newAllIncomes}`}
          </DialogContentText>
          <DialogContentText>
            {whatIncomes === 0
              ? `Average income: ${typeof incomes === "object" &&
                  (allIncomes / incomes.length).toFixed(2)}`
              : `Average income: ${
                  newIncomes > 0
                    ? (newAllIncomes / newIncomes).toFixed(2)
                    : "0.00"
                }`}
          </DialogContentText>
          <DialogContentText>{`Last month income: ${filterLastMonths()}`}</DialogContentText>
          <DateMonths date={props} onChangeDate={props.onChangeDate} />
          <Chart
            chartData={props}
            location="Income"
            legendPosition="bottom"
            displayTitle={true}
            displayLegend={true}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
