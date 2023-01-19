import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useState, useEffect } from "react";
import "./style.css";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";

export default function Stocks() {

    const [title, setTitle] = useState();
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const API_KEY = "YOURAPI";

    const columns = [
        {
            field: "symbol",
            sortable: true,
            floatingFilter: true,
            filter: true,
            headerName: "Symbol",
            field: "symbol",
            cellRendererFramework: (params) => (<Link to={`/history/${params.value}`}>{params.value}</Link>)
        },
        {
            headerName: "Company Name",
            field: "name",
            sortable: true,
            floatingFilter: true,
            filter: true,
        },
        {
            headerName: "Sector",
            field: "sector",
            sortable: true,
            floatingFilter: true,
            filter: 'agTextColumnFilter',
        },
    ];

    async function getStock() {
        let res = await fetch(`https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${API_KEY}`);
        let data = await res.json();

        return data.map((stock) => {
            return {
                symbol: stock.symbol,
                name: stock.name,
                sector: stock.sector,
            };
        });
    }

    useEffect(() => {
        document.title = "Stock Prices Portal - Search Stocks List";
        (async () => {
            setIsLoading(true);
            setHasError(false);
            try { setRowData(await getStock()) }
            catch (error) {
                setHasError(true);
            }
            setIsLoading(false);
        })();
    }, []);


    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    const onFilterTextChange = (e) => {
        gridApi.setQuickFilter(e.target.value)
    }

    const list = new Set(rowData.map(items => items.sector))


    return (
        <div className="container">
            <div className="Stocks">
                <div className="search"><SearchIcon /><input type="search" onChange={onFilterTextChange} placeholder="type keywords or select a sector..." list="options" />
                    <datalist id="options">
                        <option value="Communication Services" />
                        <option value="Technology" />
                        <option value="Industrials" />
                        <option value="Healthcare" />
                        <option value="Consumer Cyclical" />
                        <option value="Utilities" />
                        <option value="Financial Services" />
                        <option value="Consumer Defensive" />
                    </datalist>
                </div>
                <div
                    className="ag-theme-balham"
                    style={{
                        height: "500px",
                        width: "100%",
                        margin: "auto",
                    }}
                >
                    {hasError && <p class="error">Sorry, something went wrong. Probably API limit exceeded. <br />Please try again later...</p>}
                    {isLoading ? (
                        <p class="loading">Loading ...</p>
                    ) : (
                        <AgGridReact
                            onGridReady={onGridReady}
                            columnDefs={columns}
                            rowData={rowData}
                            defaultColDef={{ flex: 1 }}
                            pagination={true}
                        />
                    )}
                </div>
            </div>
        </div >
    );
}
