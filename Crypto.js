// Theme toggle logic
const checkbox = document.getElementById("checkbox");
const body = document.body;
const currTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currTheme);
checkbox.checked = currTheme === 'dark';

checkbox.addEventListener("change", () => {
    const newTheme = checkbox.checked ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    body.setAttribute('data-theme', newTheme);
});

const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

fetch(url)
    .then(response => response.json())
    .then(data => {
        const coinsContainer = document.querySelector('.coins-container');
        coinsContainer.innerHTML = ''; // Clear any existing content

        data.slice(0, 6).forEach(coin => {
            const coinDiv = document.createElement('div');
            coinDiv.classList.add('top-coin');

            const coinImage = document.createElement('img');
            coinImage.src = coin.image;
            coinImage.alt = coin.name;

            const coinInfo = document.createElement('div');
            coinInfo.classList.add('coin-info');

            const coinName = document.createElement('h4');
            coinName.textContent = coin.name;

            const coinPrice = document.createElement('p');
            // Assuming current_price is in USD, converting it to INR
            const priceInINR = coin.current_price * 82; // Approx conversion rate
            coinPrice.textContent = `₹${priceInINR.toLocaleString()}`;

            coinInfo.appendChild(coinName);
            coinInfo.appendChild(coinPrice);

            coinDiv.appendChild(coinImage);
            coinDiv.appendChild(coinInfo);

            coinsContainer.appendChild(coinDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
