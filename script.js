// API for currency conversion
const api = "https://api.exchangerate-api.com/v4/latest/USD";

// Selecting controls
const amountInput = document.querySelector("#amount");
const convertBtn = document.querySelector(".convert");
const resetBtn = document.querySelector("#resetBtn");
const fromCurrency = document.querySelector("#fromCurrency");
const toCurrency = document.querySelector("#toCurrency");
const finalValue = document.querySelector(".finalValue");
const finalAmount = document.getElementById("finalAmount");

// Event when "convert" button is clicked
convertBtn.addEventListener("click", getResults);

// Event when reset button is clicked
resetBtn.addEventListener("click", clearVal);

// Function to get conversion rates and display results
function getResults() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    // Check for valid input
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    if (!from || !to) {
        alert("Please select both currencies.");
        return;
    }

    // Fetch conversion rates
    fetch(api)
        .then(response => response.json())
        .then(data => displayResults(data, from, to, amount))
        .catch(err => alert("Error fetching currency data: " + err));
}

// Function to display conversion results
function displayResults(data, from, to, amount) {
    const fromRate = data.rates[from];
    const toRate = data.rates[to];

    if (!fromRate || !toRate) {
        alert("Invalid currency code selected.");
        return;
    }

    const convertedAmount = ((toRate / fromRate) * amount).toFixed(2);
    finalValue.textContent = `${convertedAmount} ${to}`;

    // Show the final amount section
    finalAmount.style.display = "block";
}

// Function to reset values
function clearVal() {
    amountInput.value = '';
    fromCurrency.selectedIndex = 0;
    toCurrency.selectedIndex = 0;
    finalValue.textContent = '';
    finalAmount.style.display = "none";
}
