import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Stockimage from "./images/stock.png";
import { NavLink } from "react-router-dom";

export default function Notfound() {
    return (
        <div className="container">
            <div className="notfound">
                <h1>PAGE NOT FOUND - 404 ERORR!</h1>
                <p>Oops, it seems you hit a wrong URL. <br />Please make sure you select stocks from <NavLink to="/stocks">"Search Stocks"</NavLink> list.<br />
                    <img src={Stockimage} />
                </p>
            </div></div>
    );
}