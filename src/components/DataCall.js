import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Table2 from "./Table2"


const getDatafromLS = () => {
    const data = localStorage.getItem("items");
    if (data) {
        return JSON.parse(data);
    } else {
        return [];
    }
};




const DataCall = () => {
    const [coinList, setCoinList] = useState([]);
    const [dataHistory, setDataHistory] = useState(getDatafromLS());
    const [open, setOpen] = useState(false);
    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // const [rows, setRows] = useState([]);
    const [formdata, setFormdata] = useState({
        coinname: "",
        holdings: "",
        app: "",
        id: "",
    });

    // USE EFFETS

    useEffect(() => {
        setInterval(() => {
            const fetchData = async () => {
                try {
                    fetch(
                        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
                    )
                        .then((res) => res.json())
                        .then((data) => setCoinList(data));
                } catch (error) {
                    console.log("error", error)
                }
            }

            fetchData()
        }, 10000)
    }, []);


    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("items"));
        if (items) setDataHistory(items);
    }, []);

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(dataHistory));
    }, [dataHistory]);

    console.log(coinList)
    // FUNCTIONS

     const handleSubmit = (e) => {
    e.preventDefault();
    if (coinList && dataHistory.length === 0) {
      coinList.map((coin) => {
        if (formdata.coinname === coin.name) {
          setDataHistory([
            ...dataHistory,
            {
              coinname: coin.name,
              holdings: formdata.holdings,
              app: formdata.app,
              current_price: coin.current_price,
              id: coin.id,
            },
          ]);
        }
      });

      setOpen(false);
      setFormdata({ coinname: "", holdings: "", app: "", id: "" });
    } else if (dataHistory.length > 0) {
      let answer = true;
      answer = dataHistory.every((el) => el.coinname !== formdata.coinname);
      console.log(answer);
      if (answer) {
        coinList.filter((coin) => {
          if (coin.name === formdata.coinname) {
            return setDataHistory([
              ...dataHistory,
              {
                coinname: coin.name,
                holdings: formdata.holdings,
                app: formdata.app,
                current_price: coin.current_price,
                id: coin.id,
              },
            ]);
          }
        });
        setOpen(false);
        console.log(dataHistory);
        setFormdata({ coinname: "", holdings: "", app: "", id: "" });
      } else {
        console.log("already exists");

        setFormdata({ coinname: "", holdings: "", app: "", id: "" });
      }
    } else {
      console.log("error");
      setFormdata({ holdings: "", app: "", id: "" });
    }
  };
  console.log(dataHistory);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (coinList.length > 1) {
        return (
            <div>
                <Table2 data={coinList} history={dataHistory} />
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Coin
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add Coin</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Complete the fields to add a new coin to your portfolio
                        </DialogContentText>
                        <Autocomplete
                            id="combo-box-demo"
                            options={coinList}
                            getOptionLabel={(option) => option.name}
                            sx={{ width: 300 }}
                            onChange={(e, value) =>
                                setFormdata({ ...formdata, coinname: value.name })
                            }
                            name="Coins"
                            label="Coins"
                            type="text"
                            renderInput={(params) => <TextField {...params} label="Coins" />}
                        />
                        <TextField
                            margin="dense"
                            id="holdings"
                            name="holdings"
                            label="Coin Holdings"
                            type="number"
                            fullWidth
                            autoComplete="off"
                            variant="standard"
                            value={formdata.holdings}
                            onChange={(e) =>
                                setFormdata({ ...formdata, holdings: e.target.value })
                            }
                        />
                        <TextField
                            margin="dense"
                            id="app"
                            name="app"
                            label="Average Purchase Price"
                            type="number"
                            fullWidth
                            variant="standard"
                            autoComplete="off"
                            value={formdata.app}
                            onChange={(e) => setFormdata({ ...formdata, app: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>Add Coin</Button>
                    </DialogActions>
                </Dialog>

                {/* <div>
                    {dataHistory &&
                        coinList &&
                        coinList.map((item) => {
                            return dataHistory.map((coin) => {
                                if (item.name === coin.coinname) {
                                    return (
                                        <p>
                                            {coin.coinname} {item.current_price} {coin.holdings}
                                            {coin.app} {item.id}
                                        </p>
                                    );
                                }
                            });
                        })}
                </div> */}

            </div>
        );

    }

};
export default DataCall;
