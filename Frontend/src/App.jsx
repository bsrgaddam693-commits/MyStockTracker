
import { useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:8001";

function App() {
  const [activeTab, setActiveTab] = useState("stocks");
  const [stocks, setStocks] = useState([]);
  const [ipos, setIpos] = useState([]);
  const [message, setMessage] = useState("");

  // Load all stocks
  async function loadStocks() {
    try {
      const response = await axios.get(`${API_URL}/api/stocks`);
      setStocks(response.data);
    } catch (error) {
      setMessage("Failed to load stocks. Check the backend.");
    }
  }

  // Load all IPOs
  async function loadIPOs() {
    try {
      const response = await axios.get(`${API_URL}/api/ipos`);
      setIpos(response.data);
    } catch (error) {
      setMessage("Failed to load IPOs. Check the backend.");
    }
  }

  // Add a stock
  async function addStock() {
    const stockName = window.prompt("Enter stock name:");
    if (stockName === null || !stockName.trim()) return;

    const symbol = window.prompt("Enter stock symbol:");
    if (symbol === null || !symbol.trim()) return;

    const exchange = window.prompt("Enter exchange (NSE/BSE):", "NSE");
    if (exchange === null || !exchange.trim()) return;

    const quantityText = window.prompt("Enter quantity:", "1");
    if (quantityText === null) return;

    const priceText = window.prompt("Enter average buy price:", "100");
    if (priceText === null) return;

    const quantity = Number(quantityText);
    const averageBuyPrice = Number(priceText);

    if (
      !Number.isInteger(quantity) ||
      quantity <= 0 ||
      !Number.isFinite(averageBuyPrice) ||
      averageBuyPrice <= 0
    ) {
      setMessage("Enter a valid quantity and buy price.");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/stocks`, {
        stockName: stockName.trim(),
        symbol: symbol.trim().toUpperCase(),
        exchange: exchange.trim().toUpperCase(),
        quantity,
        averageBuyPrice,
      });

      await loadStocks();
      setMessage("Stock added successfully!");
    } catch (error) {
      setMessage("Failed to add stock.");
    }
  }

  // Edit a stock
  async function updateStock(stock) {
    const stockName = window.prompt("Stock name:", stock.stockName);
    if (stockName === null || !stockName.trim()) return;

    const symbol = window.prompt("Stock symbol:", stock.symbol);
    if (symbol === null || !symbol.trim()) return;

    const exchange = window.prompt("Exchange:", stock.exchange);
    if (exchange === null || !exchange.trim()) return;

    const quantityText = window.prompt("Quantity:", stock.quantity);
    if (quantityText === null) return;

    const priceText = window.prompt(
      "Average buy price:",
      stock.averageBuyPrice
    );
    if (priceText === null) return;

    const quantity = Number(quantityText);
    const averageBuyPrice = Number(priceText);

    if (
      !Number.isInteger(quantity) ||
      quantity < 0 ||
      !Number.isFinite(averageBuyPrice) ||
      averageBuyPrice < 0
    ) {
      setMessage("Enter valid stock details.");
      return;
    }

    try {
      await axios.put(`${API_URL}/api/stocks/${stock.id}`, {
        stockName: stockName.trim(),
        symbol: symbol.trim().toUpperCase(),
        exchange: exchange.trim().toUpperCase(),
        quantity,
        averageBuyPrice,
      });

      await loadStocks();
      setMessage("Stock updated successfully!");
    } catch (error) {
      setMessage("Failed to update stock.");
    }
  }

  // Delete a stock
  async function deleteStock(id) {
    if (!window.confirm("Are you sure you want to delete this stock?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/stocks/${id}`);
      await loadStocks();
      setMessage("Stock deleted successfully!");
    } catch (error) {
      setMessage("Failed to delete stock.");
    }
  }

  // Add an IPO
  async function addIPO() {
    const ipoName = window.prompt("Enter IPO name:");
    if (ipoName === null || !ipoName.trim()) return;

    const issuePriceText = window.prompt("Enter issue price:", "150");
    if (issuePriceText === null) return;

    const lotsText = window.prompt("Enter lots applied:", "1");
    if (lotsText === null) return;

    const amountText = window.prompt("Enter application amount:", "15000");
    if (amountText === null) return;

    const allotmentStatus = window.prompt(
      "Allotment status:",
      "Pending"
    );
    if (allotmentStatus === null || !allotmentStatus.trim()) return;

    const refundStatus = window.prompt(
      "Refund status:",
      "Blocked"
    );
    if (refundStatus === null || !refundStatus.trim()) return;

    const listingPriceText = window.prompt(
      "Listing price (enter 0 if unknown):",
      "0"
    );
    if (listingPriceText === null) return;

    const issuePrice = Number(issuePriceText);
    const lotsApplied = Number(lotsText);
    const applicationAmount = Number(amountText);
    const listingPrice = Number(listingPriceText);

    if (
      !Number.isFinite(issuePrice) ||
      issuePrice <= 0 ||
      !Number.isInteger(lotsApplied) ||
      lotsApplied <= 0 ||
      !Number.isFinite(applicationAmount) ||
      applicationAmount < 0 ||
      !Number.isFinite(listingPrice) ||
      listingPrice < 0
    ) {
      setMessage("Enter valid IPO details.");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/ipos`, {
        ipoName: ipoName.trim(),
        issuePrice,
        lotsApplied,
        applicationAmount,
        allotmentStatus: allotmentStatus.trim(),
        refundStatus: refundStatus.trim(),
        listingPrice,
      });

      await loadIPOs();
      setMessage("IPO added successfully!");
    } catch (error) {
      setMessage("Failed to add IPO.");
    }
  }

  // Edit an IPO
  async function updateIPO(ipo) {
    const ipoName = window.prompt("IPO name:", ipo.ipoName);
    if (ipoName === null || !ipoName.trim()) return;

    const issuePriceText = window.prompt(
      "Issue price:",
      ipo.issuePrice
    );
    if (issuePriceText === null) return;

    const lotsText = window.prompt("Lots applied:", ipo.lotsApplied);
    if (lotsText === null) return;

    const amountText = window.prompt(
      "Application amount:",
      ipo.applicationAmount
    );
    if (amountText === null) return;

    const allotmentStatus = window.prompt(
      "Allotment status:",
      ipo.allotmentStatus
    );
    if (allotmentStatus === null || !allotmentStatus.trim()) return;

    const refundStatus = window.prompt(
      "Refund status:",
      ipo.refundStatus
    );
    if (refundStatus === null || !refundStatus.trim()) return;

    const listingPriceText = window.prompt(
      "Listing price:",
      ipo.listingPrice
    );
    if (listingPriceText === null) return;

    const issuePrice = Number(issuePriceText);
    const lotsApplied = Number(lotsText);
    const applicationAmount = Number(amountText);
    const listingPrice = Number(listingPriceText);

    if (
      !Number.isFinite(issuePrice) ||
      issuePrice <= 0 ||
      !Number.isInteger(lotsApplied) ||
      lotsApplied < 0 ||
      !Number.isFinite(applicationAmount) ||
      applicationAmount < 0 ||
      !Number.isFinite(listingPrice) ||
      listingPrice < 0
    ) {
      setMessage("Enter valid IPO details.");
      return;
    }

    try {
      await axios.put(`${API_URL}/api/ipos/${ipo.id}`, {
        ipoName: ipoName.trim(),
        issuePrice,
        lotsApplied,
        applicationAmount,
        allotmentStatus: allotmentStatus.trim(),
        refundStatus: refundStatus.trim(),
        listingPrice,
      });

      await loadIPOs();
      setMessage("IPO updated successfully!");
    } catch (error) {
      setMessage("Failed to update IPO.");
    }
  }

  // Delete an IPO
  async function deleteIPO(id) {
    if (!window.confirm("Are you sure you want to delete this IPO?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/ipos/${id}`);
      await loadIPOs();
      setMessage("IPO deleted successfully!");
    } catch (error) {
      setMessage("Failed to delete IPO.");
    }
  }

  function openStocks() {
    setActiveTab("stocks");
    setMessage("");
    loadStocks();
  }

  function openIPOs() {
    setActiveTab("ipos");
    setMessage("");
    loadIPOs();
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>MyStock Tracker</h1>
          <p>Your personal stocks and IPO dashboard</p>
        </div>
        <span className="status">Portfolio Manager</span>
      </header>

      <nav className="navigation">
        <button
          className={activeTab === "stocks" ? "active" : ""}
          onClick={openStocks}
        >
          My Stocks
        </button>

        <button
          className={activeTab === "ipos" ? "active" : ""}
          onClick={openIPOs}
        >
          IPO Tracker
        </button>
      </nav>

      <main>
        {message && <p className="message">{message}</p>}

        {activeTab === "stocks" && (
          <section className="panel">
            <div className="section-heading">
              <div>
                <h2>My Stocks</h2>
                <p>Manage your stock holdings and buy prices.</p>
              </div>

              <div>
                <button onClick={loadStocks}>Refresh</button>{" "}
                <button onClick={addStock}>+ Add Stock</button>
              </div>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Stock Name</th>
                    <th>Symbol</th>
                    <th>Exchange</th>
                    <th>Quantity</th>
                    <th>Average Buy Price (₹)</th>
                    <th>Investment (₹)</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {stocks.map((stock) => (
                    <tr key={stock.id}>
                      <td>{stock.stockName}</td>
                      <td>{stock.symbol}</td>
                      <td>{stock.exchange}</td>
                      <td>{stock.quantity}</td>
                      <td>
                        {Number(stock.averageBuyPrice).toFixed(2)}
                      </td>
                      <td>
                        {(
                          stock.quantity * stock.averageBuyPrice
                        ).toFixed(2)}
                      </td>
                      <td>
                        <button onClick={() => updateStock(stock)}>
                          Edit
                        </button>{" "}
                        <button onClick={() => deleteStock(stock.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {stocks.length === 0 && (
                    <tr>
                      <td colSpan="7" className="empty">
                        No stocks found. Click Add Stock to begin.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === "ipos" && (
          <section className="panel">
            <div className="section-heading">
              <div>
                <h2>IPO Tracker</h2>
                <p>Manage applications, allotments and refunds.</p>
              </div>

              <div>
                <button onClick={loadIPOs}>Refresh</button>{" "}
                <button onClick={addIPO}>+ Add IPO</button>
              </div>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>IPO Name</th>
                    <th>Issue Price (₹)</th>
                    <th>Lots Applied</th>
                    <th>Application Amount (₹)</th>
                    <th>Allotment</th>
                    <th>Refund</th>
                    <th>Listing Price (₹)</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {ipos.map((ipo) => (
                    <tr key={ipo.id}>
                      <td>{ipo.ipoName}</td>
                      <td>{Number(ipo.issuePrice).toFixed(2)}</td>
                      <td>{ipo.lotsApplied}</td>
                      <td>
                        {Number(ipo.applicationAmount).toFixed(2)}
                      </td>
                      <td>{ipo.allotmentStatus}</td>
                      <td>{ipo.refundStatus}</td>
                      <td>{Number(ipo.listingPrice).toFixed(2)}</td>
                      <td>
                        <button onClick={() => updateIPO(ipo)}>
                          Edit
                        </button>{" "}
                        <button onClick={() => deleteIPO(ipo.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {ipos.length === 0 && (
                    <tr>
                      <td colSpan="8" className="empty">
                        No IPOs found. Click Add IPO to begin.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>

      <footer>
        MyStock Tracker · Personal portfolio management
      </footer>
    </div>
  );
}

export default App;

