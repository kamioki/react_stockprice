import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Search from "./images/search.png";
import Chart from "./images/chart.png";
import Menu from "./images/menu.png";
import Stockimage from "./images/stock.png";

export default function Home() {
    return (
        <div className="container">
            <p><img src={Stockimage} /></p>
            <div className="home">
                <h1>How to Use</h1>
                <p>1. First, click 'Search Stocks' menu to view all the available companies' list (NASDAQ 100). <br />
                    <img src={Menu} /></p>
                <p> 2. Then, click a company symbol to check the price history. You can also search companies by keywords or using filters.<br />
                    <img src={Search} /></p>
                <p>                3. Price history and the company information that you selected will be shown. Enjoy!<br />
                    <img src={Chart} /></p>
            </div>
        </div>
    );
}
