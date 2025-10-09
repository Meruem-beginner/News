let products = [];
let history = [];

function addProduct() {
    const name = document.getElementById('product-name').value;
    if (!name) return;

    const prices = Array.from({length: 10}, () => Math.floor(Math.random() * 10000) + 1000);
    products.push({ name, prices });

    const minPrice = Math.min(...prices);
    const currentPrice = prices[prices.length - 1];
    history.push({ name, minPrice, currentPrice, show: true });

    updateChart(name, prices);
    updateHistory();
}

function updateChart(name, prices) {
    const ctx = document.getElementById('priceChart').getContext('2d');
    if (window.priceChart) window.priceChart.destroy();
    window.priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: prices.map((_, i) => `Day ${i + 1}`),
            datasets: [{
                label: name,
                data: prices,
                borderColor: 'blue',
                fill: false
            }]
        }
    });
}

function updateHistory() {
    const list = document.getElementById('history-list');
    list.innerHTML = '';
    history.slice(-10).forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name}<br>最安値: ¥${item.minPrice}<br>現在: ¥${item.currentPrice}<br>
            <label><input type="checkbox" checked onchange="toggleDisplay(${index})">表示</label>`;
        list.appendChild(li);
    });
}

function toggleDisplay(index) {
    history[index].show = !history[index].show;
}
