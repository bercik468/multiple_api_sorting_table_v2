import React, { Component } from "react";
import BackToTop from "./components/BackToTop";
import Loading from "./components/Loading";
import SortName from "./components/SortName";
import Details from "./components/Details";
import Table from "./components/Table";
import { Typography } from "@material-ui/core";

export class App extends Component {
  state = {
    data: [],
    sort: 0,
    dataFilter: [],
    dataOpen: [],
    isLoading: true,
    isError: false,
    nameInput: "",
    open: false,
    newDateFrom: "yyyy-MM-dd",
    newDateTo: "yyyy-MM-dd",
    newIncomes: "",
    newAllIncomes: "",
    whatIncomes: 0
  };

  componentDidMount() {
    const allData = [];
    fetch(`https://recruitment.hal.skygate.io/companies`)
      .then(response => response.json())
      .then(companies => {
        companies.map(company =>
          fetch(`https://recruitment.hal.skygate.io/incomes/${company.id}`)
            .then(response => response.json())
            .then(incomes => {
              if (company.id === incomes.id) {
                const dataCompany = company;
                const dataIncomes = incomes;
                const dataAllIncomes = {
                  allIncomes: dataIncomes.incomes
                    .map(income => parseFloat(income.value))
                    .reduce(function(a, b) {
                      return a + b;
                    }, 0)
                    .toFixed(2)
                };
                dataIncomes.incomes.sort(function(a, b) {
                  return Date.parse(a.date) - Date.parse(b.date);
                });
                const dataChart = {
                  labels: dataIncomes.incomes.map(income =>
                    income.date.substring(0, 10)
                  ),
                  datasets: [
                    {
                      label: "Income",
                      data: dataIncomes.incomes.map(income => income.value),
                      backgroundColor: dataIncomes.incomes.map(
                        income =>
                          `#${Math.floor(Math.random() * 16777215).toString(
                            16
                          )}`
                      )
                    }
                  ]
                };

                const dataAll = Object.assign(
                  dataCompany,
                  dataIncomes,
                  dataAllIncomes,
                  dataChart
                );
                allData.push(dataAll);
              }
              if (allData.length === companies.length) {
                allData.sort(function(a, b) {
                  return b.allIncomes - a.allIncomes;
                });
                this.setState({
                  data: allData,
                  dataFilter: allData,
                  isLoading: false
                });
              }
            })
        );
      })
      .catch(() => this.setState({ isError: true, isLoading: false }));
  }

  handleClickSort = (e, type) => {
    if (this.state.sort === 0) {
      this.setState({ sort: 1 });
      this.sortArrayUp(this.state.dataFilter, type);
    } else if (this.state.sort === 1) {
      this.setState({ sort: 2 });
      this.sortArrayDown(this.state.dataFilter, type);
    } else if (this.state.sort === 2) {
      this.setState({ sort: 1 });
      this.sortArrayUp(this.state.dataFilter, type);
    }
  };
  sortArrayUp = (array, type) => {
    if (type === "id") {
      array.sort(function(a, b) {
        return a.id - b.id;
      });
      return array;
    } else if (type === "name") {
      array.sort(function(a, b) {
        return a.name.localeCompare(b.name);
      });
      return array;
    } else if (type === "city") {
      array.sort(function(a, b) {
        return a.city.localeCompare(b.city);
      });
      return array;
    } else if (type === "total") {
      array.sort(function(a, b) {
        return a.allIncomes - b.allIncomes;
      });
      return array;
    }
  };

  sortArrayDown = (array, type) => {
    if (type === "id") {
      array.sort(function(a, b) {
        return b.id - a.id;
      });
      return array;
    } else if (type === "name") {
      array.sort(function(a, b) {
        return b.name.localeCompare(a.name);
      });
      return array;
    } else if (type === "city") {
      array.sort(function(a, b) {
        return b.city.localeCompare(a.city);
      });
      return array;
    } else if (type === "total") {
      array.sort(function(a, b) {
        return b.allIncomes - a.allIncomes;
      });
      return array;
    }
  };

  setNameFilter = e => {
    const nameInput = e.target.value;
    const { data } = this.state;

    const dataFilter = data.filter(filter =>
      filter.name.toLowerCase().includes(nameInput.toLowerCase())
    );
    this.setState({
      nameInput,
      dataFilter
    });
    console.log(dataFilter);
  };

  setDateFrom = e => {
    const newDateFrom = e.target.value;
    this.setState({
      newDateFrom: newDateFrom
    });
  };

  setDateTo = e => {
    const newDateTo = e.target.value;
    this.setState({
      newDateTo: newDateTo
    });
  };

  openDetails = (e, data) => {
    this.setState({
      open: true,
      dataOpen: data
    });
  };

  closeDetails = e => {
    this.setState({
      open: false,
      whatIncomes: 0,
      newDateFrom: "yyyy-MM-dd",
      newDateTo: "yyyy-MM-dd"
    });
  };

  filterDateMonths = e => {
    let { dataOpen, newDateFrom, newDateTo } = this.state;

    if (
      (typeof dataOpen === "object") &
      (newDateFrom !== "yyyy-MM-dd") &
      (newDateTo !== "yyyy-MM-dd")
    ) {
      const newIncomes = dataOpen.incomes.filter(
        income =>
          (income.date.substring(0, 10) >= newDateFrom.substring(0, 10)) &
          (income.date.substring(0, 10) <= newDateTo.substring(0, 10))
      );
      const newAllIncomes = newIncomes
        .map(data => parseFloat(data.value))
        .reduce(function(a, b) {
          return a + b;
        }, 0)
        .toFixed(2);
      this.setState({
        newIncomes: newIncomes.length,
        newAllIncomes,
        whatIncomes: 1
      });
    }
  };

  render() {
    return (
      <>
        {this.state.isLoading && <Loading />}
        <SortName
          setNameFilter={this.setNameFilter}
          nameFilter={this.state.nameFilter}
        />
        <Table
          data={this.state.dataFilter}
          openDetails={this.openDetails}
          handleClickSort={this.handleClickSort}
        />
        <Details
          open={this.state.open}
          toggleDetails={this.closeDetails}
          dataOpen={this.state.dataOpen}
          setDateFrom={this.setDateFrom}
          newDateFrom={this.state.newDateFrom}
          setDateTo={this.setDateTo}
          newDateTo={this.state.newDateTo}
          newIncomes={this.state.newIncomes}
          newAllIncomes={this.state.newAllIncomes}
          whatIncomes={this.state.whatIncomes}
          onChangeDate={this.filterDateMonths}
        />
        <BackToTop />
        {this.state.isError && (
          <Typography variant="h5" color="error" align="center">
            Error 404 data not found
          </Typography>
        )}
      </>
    );
  }
}

export default App;
