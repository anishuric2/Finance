const API_KEY = 'YOUR_API_KEY'; // Replace with your Alpha Vantage API key

async function fetchBalanceSheet(symbol) {
  const url = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    const tableBody = document.querySelector('#balanceSheetTable tbody');
    tableBody.innerHTML = ''; // Clear old data

    if (!data.annualReports) {
      throw new Error("No balance sheet data found or invalid symbol.");
    }

    data.annualReports.forEach(report => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${report.fiscalDateEnding}</td>
        <td>${Number(report.totalAssets).toLocaleString()}</td>
        <td>${Number(report.totalLiabilities).toLocaleString()}</td>
        <td>${Number(report.totalShareholderEquity).toLocaleString()}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error('Error:', err);
    alert("Failed to load balance sheet. Check symbol or try again later.");
  }
}

function searchSymbol() {
  const input = document.getElementById('symbolInput').value.trim().toUpperCase();
  if (input) {
    fetchBalanceSheet(input);
  }
}

// Optional: Load Apple (AAPL) by default
fetchBalanceSheet('AAPL');
