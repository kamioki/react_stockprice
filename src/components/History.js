import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useState, useEffect } from "react";
//import "ag-grid-enterprise";
import "./style.css";
import { useParams } from "react-router-dom";
import Graph from "./Graph";

function History() {

    const params = useParams([]);
    let symbol = params.symbol;
    const [historyData, setHistoryData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(null);

    const API_KEY = "YOURAPI";
    const columns = [
        {
            headerName: "Date",
            field: "date",
            sortable: true,
            filter: 'agNumberColumnFilter'
        },
        {
            headerName: "Close",
            field: "close",
            sortable: true,
            filter: 'agNumberColumnFilter'
        },
        {
            headerName: "High",
            field: "high",
            sortable: true,
            filter: 'agNumberColumnFilter'
        },
        {
            headerName: "Low",
            field: "low",
            sortable: true,
            filter: 'agNumberColumnFilter'
        },
    ];

    async function getHistory() {
        let res = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?timeseries=100&apikey=${API_KEY}`);
        let data = await res.json();
        let historical = await data.historical;
        return historical.map((history) => {
            return {
                date: history.date,
                close: history.close,
                high: history.high,
                low: history.low,
            };
        })
    }
    console.log(historyData)
    useEffect(() => {
        (async () => {
            console.log("asdk")
            setIsLoading(true);
            try { setHistoryData(await getHistory()) }
            catch (error) {
                setHasError(true);
            }
            setIsLoading(false);
        })();
    }, []);

    // useEffect(() => {
    //     fetch(`https://financialmodelingprep.cm/api/v3/historical-price-full/${symbol}?timeseries=100&apikey=${API_KEY}`)
    //         .then(res => res.json())
    //         .then(data => data.historical)
    //         .then(historical =>
    //             historical.map(history => {
    //                 return {
    //                     date: history.date,
    //                     high: history.high,
    //                     low: history.low,
    //                 };
    //             })
    //         )
    //         .then(historyData => setHistoryData(historyData));
    // }, []);

    //console.log(historyData)

    return (

        <div className="History">
            {hasError && <p class="error">Sorry, something went wrong. Probably API limit exceeded. Please try again later...</p>}
            {isLoading ? (
                <p>Loading ...</p>
            ) : (
                <Graph data={historyData} />)}
            <div
                className="ag-theme-balham"
                style={{
                    height: "300px",
                    width: "90%",
                    margin: "auto",
                }}
            ><h2>Price History Data for the Last 100 Days</h2>
                <AgGridReact className="history"
                    columnDefs={columns}
                    rowData={historyData}
                    defaultColDef={{ flex: 1 }}
                />

            </div>
        </div>


    );

}


export default History;

