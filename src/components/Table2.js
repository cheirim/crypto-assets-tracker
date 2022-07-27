import React, { useState, useEffect } from "react";
import 'antd/dist/antd.min.css';
import { Table } from 'antd';
import Hero from "./Hero";

let data = []
let portfolio = 0
let total_profit = 0
let total_24hchange = 0

// const getDatafromLS = () => {
//     const data = localStorage.getItem("historicaldata");
//     if (data) {
//         const localstoragePull = JSON.parse(data);
//         return JSON.parse(data);
//     } else {
//         return [];
//     }
// };

// const lsData = getDatafromLS()
// //console.log(lsData[0].coinname)

// refreshTable()



// function refreshTable() {
//     for (let i = 0; i < lsData.length; i++) {
//         let cname = null
//         let holdings = 0
//         let app = 0
//         let id = ""

//         cname = JSON.stringify(lsData[i].coinnname)
//         // console.log(cname)
//         holdings = lsData[i].holdings
//         app = lsData[i].app
//         id = lsData[i].id
//         let totali = holdings * app
//         data.push({
//             cryptoname: lsData[i]["coinname"],
//             holdings: holdings,
//             app: app,
//             current_price: 0,
//             total_investment: totali,
//             profit: 0,
//         })
//     }
// }
const columns = [
    {
        title: 'Coin Name',
        dataIndex: 'cryptoname',
        sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
        },
    },
    {
        title: 'Holdings',
        dataIndex: 'holdings',
        sorter: {
            compare: (a, b) => a.chinese - b.chinese,
            multiple: 3,
        },
    },
    {
        title: 'Avg Purchase Price',
        dataIndex: 'app',
        sorter: {
            compare: (a, b) => a.math - b.math,
            multiple: 2,
        },
    },
    {
        title: 'Current Price',
        dataIndex: 'current_price',
        sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
        },
    },
    {
        title: 'Total Investment',
        dataIndex: 'total_investment',
        sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
        },
    },
    {
        title: 'Current Value',
        dataIndex: 'current_value',
        sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
        },
    },
    {
        title: 'Profit / Loss',
        dataIndex: 'profit',
        sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
        },
    },
];
// const data = [
//     {
//         key: '1',
//         cryptoname: 'Bitcoin',
//         holdings: 98,
//         app: 60,
//         current_price: 27000,
//         total_investment: 10000,
//         profit: 5000,
//     },
//     {
//         key: '2',
//         cryptoname: 'BNB',
//         holdings: 9,
//         app: 6,
//         current_price: 270,
//         total_investment: 10000,
//         profit: 3000,
//     },
// ];



const Table2 = (props) => {

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    if (props.history.length > 0) {
        data = []
        portfolio = 0
        total_profit = 0
        total_24hchange = 0
        for (let i = 0; i < props.history.length; i++) {
            let cname = null
            let holdings = 0
            let app = 0
            let id = ""
            cname = props.history[i].coinname
            holdings = props.history[i].holdings
            app = props.history[i].app
            id = props.history[i].id
            let totali = holdings * app
            const results = props.data.filter(obj => {
                return obj.name === cname
            });
            console.log(props.history)
            console.log(props.data)
            console.log(results[0].current_price)
            let pricechange_24h = results[0].price_change_24h * holdings
            total_24hchange = total_24hchange + pricechange_24h
            let cprofit = (holdings * results[0].current_price) - totali
            let cvalue = holdings * results[0].current_price
            portfolio = portfolio + cvalue
            total_profit = total_profit + cprofit
            data.push({
                cryptoname: cname,
                holdings: holdings,
                app: app,
                current_price: results[0].current_price,
                total_investment: totali.toFixed(2),
                current_value: cvalue.toFixed(2),
                profit: cprofit.toFixed(2),
            })
        }
        //     useEffect(() => {
        //         console.log("using use effects")
        //         refreshTable()
        //     }, [localStorage.getItem("historicaldata")])
        //console.log(data)
    }
    return (
        <div>
            <Hero data={portfolio} tprofit={total_profit} t24hchange={total_24hchange} />
            <Table columns={columns} dataSource={data} onChange={onChange} />
        </div>
    )
}


export default Table2;
