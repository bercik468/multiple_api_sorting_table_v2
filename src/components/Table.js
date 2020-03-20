import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@material-ui/core";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 10,
    paddingLeft: 8,
    paddingRight: 8,
    [theme.breakpoints.up(400)]: {
      fontSize: 14
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 20
    }
  },
  body: {
    fontSize: 10,
    paddingLeft: 8,
    paddingRight: 8,
    [theme.breakpoints.up(400)]: {
      fontSize: 14
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 16
    }
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 100
  },
  name: {
    textDecoration: "underline",
    [theme.breakpoints.up("md")]: {
      cursor: "pointer",
      "&:hover": { color: "#FFDA2F", textShadow: "1px 1px gray" }
    }
  },
  container: {
    [theme.breakpoints.up("md")]: {
      maxWidth: 1200,
      margin: "0 auto"
    }
  },
  type: {
    [theme.breakpoints.up("md")]: {
      cursor: "pointer",
      "&:hover": { textDecoration: "underline", color: "gold" }
    }
  }
}));

export default function CustomizedTables(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper className={classes.container}>
      <TableContainer component={Paper}>
        <Table aria-label="">
          <TableHead className={classes.table}>
            <TableRow>
              <StyledTableCell
                align="center"
                onClick={e => props.handleClickSort(e, "id")}
                className={classes.type}
              >
                ID
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={e => props.handleClickSort(e, "name")}
                className={classes.type}
              >
                NAME
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={e => props.handleClickSort(e, "city")}
                className={classes.type}
              >
                CITY
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={e => props.handleClickSort(e, "total")}
                className={classes.type}
              >
                TOTAL INCOME
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center">{row.id}</StyledTableCell>
                    <StyledTableCell
                      className={classes.name}
                      onClick={e => props.openDetails(e, row)}
                      align="center"
                    >
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.city}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.allIncomes}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        labelRowsPerPage=""
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
