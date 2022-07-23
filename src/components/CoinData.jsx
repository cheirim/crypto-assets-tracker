import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { SettingsSystemDaydreamRounded } from "@mui/icons-material";


// getting the values off local storage
const getDatafromLS = () => {
  const data = localStorage.getItem('historicaldata');
  if (data) {
    const localstoragePull = JSON.parse(data)
    return JSON.parse(data);
  }
  else {
    return []
  }
}

// function findPrice(props) {
//   const found2 = coinList.find(obj => {
//     return obj.name == props
//   })
//   console.log(found2.current_price)
//   return found2.current_price

// }


const CoinData = () => {
  const currency = "usd"
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [coinList, setCoinList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [tableData, setTableData] = useState([])
  const [formdata, setFormdata] = useState(
    {
      coinname: '',
      holdings: '',
      app: ''

    }
  )
  const [holdings, setHoldings] = useState(0);
  const [app, setApp] = useState(0);
  const [historicaldata, setHistoricaldata] = useState(getDatafromLS());
  const [rows, setRows] = useState([])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const enteredHoldings = (event) => {

  }

  let namearray = (coinList.map((item) => {
    const { name } = item;
    return (
      name
    )
  }))

  let pricearray = (coinList.map((item) => {
    const { current_price } = item;
    return (
      current_price
    )
  }))


  const handleChange = (evnt) => {
    const newInput = (data) => ({ ...data, [evnt.target.name]: evnt.target.value })
    setFormdata(newInput)
  }

  const handleSubmit = (evnt) => {
    evnt.preventDefault();
    const checkEmptyInput = !Object.values(formdata).every(res => res === "")
    if (checkEmptyInput) {
      const newData = (data) => ([...data, formdata])
      setHistoricaldata(newData);
      const emptyInput = { coinname: '', holdings: '', app: '' }
      setFormdata(emptyInput)
      const found = coinList.find(obj => {
        return obj.name == formdata.coinname
      })
      console.log(found)
      const newData2 = (data) => ([...data, createData(formdata.coinname, formdata.holdings, formdata.app, found.current_price)])
      setRows(newData2)
    }
  }

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem('historicaldata', JSON.stringify(historicaldata));
  }, [historicaldata])


  function handleRow() {
    // for (let i = 0; i < historicaldata.length; i++) {
    //   console.log("I got inside for loop")
    //   rows.push(createData(historicaldata[i].name, historicaldata[i].holdings, historicaldata[i].app, pricearray[i]))
    // }
  }

  console.log(historicaldata)



  // for (let i = 0; i < namearray.length; i++) {
  //   console.log(namearray[i])
  //   if (formdata.some(e => e.name === namearray[i])) {
  //     console.log("i got here")
  //     rows.push(createData(namearray[i], historicaldata[i].holdings, historicaldata[i].app, pricearray[i]))
  //   }
  // }

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
    )
      .then((res) => res.json())
      .then((data) => setCoinList(data));
  }, []);

  //console.log(coinList);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "coin", label: "Coin", minWidth: 170 },
    { id: "holdings", label: "Holdings", minWidth: 100 },
    {
      id: "app",
      label: "Average Purchase Price",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "cprice",
      label: "Current Price",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "totali",
      label: "Total Investment",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "cvalue",
      label: "Current Value",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "profit",
      label: "Profit/Loss",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
  ];

  function createData(coin, holdings, app, cprice) {
    const totali = app * holdings;
    const cvalue = cprice * holdings;
    const profit = cvalue - totali;
    return { coin, holdings, app, cprice, totali, cvalue, profit };
  }

  // coinList.map((coin) => {
  //   createData(coin.name, coin.current_price, 99, 99);
  // });

  // rows = []

  // for (let i = 0; i < namearray.length; i++) {
  //   console.log(namearray[i])
  //   if (formdata.some(e => e.name === namearray[i])) {
  //     console.log("i got here")
  //     rows.push(createData(namearray[i], historicaldata[i].holdings, historicaldata[i].app, pricearray[i]))
  //   }
  // }
  //   // coinList.map((coin) => {
  //   //   createData(coin.name, coin.current_price, 99, 99);
  //   // }),
  //   // createData(c, 22, 10000, 12500),
  //   createData("BTC", 22, 10000, 12500),

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          ADD COIN
        </Button>
        <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit}>
          <DialogTitle>ADD COIN</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="coinname"
              name="coinname"
              label="Coin Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              value={formdata.coinname}
            />
            <TextField
              autoFocus
              margin="dense"
              id="holdings"
              name="holdings"
              label="Coin Holdings"
              type="number"
              fullWidth
              variant="standard"
              value={formdata.holdings}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="app"
              name="app"
              label="Average Purchase Price"
              type="number"
              fullWidth
              variant="standard"
              value={formdata.app}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleSubmit}>Add Coin</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Paper>
  );
};

// return (
//   <div>
//     {coinList.map((item) => (
//       <div key={item.id}>
//         <img
//           src={item.image}
//           style={{ width: "25px", height: "25px" }}
//           alt="logo"
//         />{" "}
//         {item.name} {item.current_price}
//       </div>
//     ))}
//   </div>
// );

export default CoinData;
