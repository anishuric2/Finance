function fetchStockData(symbol) {
    fetch(`/stock?symbol=${symbol}`)
        .then(response => response.json())
        .then(data => {
            updateStockInfo(data);
            fetchStockPrice(symbol);
        })
        .catch(error => console.error('Error:', error));
}

function fetchStockPrice(symbol) {
    fetch(`/price?symbol=${symbol}`)
        .then(response => response.json())
        .then(data => {
            // Handle price data
        })
        .catch(error => console.error('Error:', error));
}
