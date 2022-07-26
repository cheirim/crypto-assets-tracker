import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css';
import { Table } from 'antd';

let data = []


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
        title: 'Average Purchase Price',
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

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const Table2 = (props) => {

    if (props.history.length > 0) {
        data = []
        for (let i = 0; i < props.history.length; i++) {
            let cname = null
            let holdings = 0
            let app = 0
            let id = ""
            let pp = (props.data[i]).map((item) => {
                return (props.history[i]).map((coin) => {
                    if (item.name === coin.coinname) {
                        return item.current_price
                    }
                });
            })
            console.log(pp)
            cname = props.history[i].coinname
            holdings = props.history[i].holdings
            app = props.history[i].app
            id = props.history[i].id
            let totali = holdings * app
            data.push({
                cryptoname: cname,
                holdings: holdings,
                app: app,
                current_price: 0,
                total_investment: totali,
                profit: 0,
            })
        }
        //     useEffect(() => {
        //         console.log("using use effects")
        //         refreshTable()
        //     }, [localStorage.getItem("historicaldata")])
        console.log(data)
    }
    return (
        <Table columns={columns} dataSource={data} onChange={onChange} />
    )
}


export default Table2;
