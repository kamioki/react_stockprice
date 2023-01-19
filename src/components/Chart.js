import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useState, useEffect } from "react";
import "./style.css";
import { useParams, Link } from "react-router-dom";
import History from "./History";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Compapny() {

    const [title, setTitle] = useState();
    const params = useParams();
    let symbol = params.symbol;
    const [rowData, setRowData] = useState([]);

    const API_KEY = "YOURAPI";

    async function getCompany() {
        let res = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${API_KEY}`);
        let data = await res.json();
        return data.map((company) => {
            return {
                image: company.image,
                symbol: company.symbol,
                companyName: company.companyName,
                website: company.website,
                description: company.description,
            };
        });
    }

    useEffect(() => {
        document.title = "Stock Prices Portal - Price Hisory and Chart";
        (async () => {
            setRowData(await getCompany());
        })();
    }, []);

    // <Graph />
    //

    return (
        <div className="container">
            <div className="Chart">
                <h1><img src={rowData.map(company => company.image)} /> <a href={rowData.map(company => company.website)} target="_blank">{rowData.map(company => company.companyName)}</a> Price Hisoty Chart</h1>
                <History /><br />
                <div
                    className="ag-theme-balham"
                    style={{
                        height: "150px",
                        width: "90%",
                        margin: "auto",
                    }}
                >

                    <h2 className="comdes">Company Description</h2>

                    <p className="desc">{rowData.map(company => company.description)}</p>

                </div>
            </div>
        </div >

    );
}